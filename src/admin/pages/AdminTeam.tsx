import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import AdminTable from "../components/AdminTable";
import { Button, Icon } from "../../components/common/navigation";
import { supabase } from "../../services/supabase";
type TeamMember = {
  id: string;
  name: string;
  role: string;
  status: string;
  display_order: number;
  photo_url: string | null;
};

export default function AdminTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
  async function loadTeamMembers() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("team_members")
      .select("id, name, role, status, display_order, photo_url")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Failed to load team members:", fetchError);
      setError("Unable to load team members.");
    } else {
      setTeamMembers(data ?? []);
    }

    setLoading(false);
  }

  void loadTeamMembers();
}, []);

async function deleteTeamMember(rowIndex: number) {
  const member = teamMembers[rowIndex];

  if (!member) return;

  const confirmed = window.confirm(
    `Are you sure you want to delete ${member.name}? This action cannot be undone.`
  );

  if (!confirmed) return;

  setError("");

  try {
    const { data, error: deleteError } = await supabase
      .from("team_members")
      .delete()
      .eq("id", member.id)
      .select("id");

    if (deleteError) throw deleteError;

    if (!data || data.length === 0) {
      throw new Error("Team member was not deleted.");
    }

    // Remove the deleted member from the admin table.
    setTeamMembers((current) =>
      current.filter((item) => item.id !== member.id)
    );

    // Clean up the profile photo belonging to this bucket.
    if (member.photo_url) {
      const { data: urlData } = supabase.storage
        .from("team-photos")
        .getPublicUrl("");

      const bucketBaseUrl =
        urlData.publicUrl.replace(/\/$/, "") + "/";

      if (member.photo_url.startsWith(bucketBaseUrl)) {
        const photoPath = decodeURIComponent(
          member.photo_url.slice(bucketBaseUrl.length).split("?")[0]
        );

        if (photoPath.startsWith("profiles/")) {
          const { error: cleanupError } = await supabase.storage
            .from("team-photos")
            .remove([photoPath]);

          if (cleanupError) {
            console.error("Photo cleanup failed:", cleanupError);
            setError(
              "Team member deleted, but the profile photo could not be removed from Storage."
            );
          }
        }
      }
    }
  } catch (deleteError) {
    console.error("Failed to delete team member:", deleteError);
    setError("Unable to delete team member. Please try again.");
  }
}

const rows = teamMembers.map((member) => [
  member.name,
  member.role,
  member.status.charAt(0).toUpperCase() +
    member.status.slice(1),
]);

  return (
    <AdminLayout page="team">
      <div className="admin-content">
        <div className="page-action">
          <p>3 active team members</p>

          <Button to="/admin/team/new" variant="dark">
            <Icon name="plus" /> Add team member
          </Button>
        </div>
{error && (
  <p
    role="alert"
    style={{
      color: "#c0392b",
      fontSize: "14px",
      marginBottom: "16px",
    }}
  >
    {error}
  </p>
)}
        <AdminTable
  title="Team members"
  rows={rows}
  actionLabel="Edit"
  onRowAction={(rowIndex) => {
    const member = teamMembers[rowIndex];

    if (member) {
      navigate(`/admin/team/${member.id}/edit`);
    }
  }}
  secondaryActionLabel="Delete"
  onSecondaryAction={(rowIndex) => {
    void deleteTeamMember(rowIndex);
  }}
/>
      </div>
    </AdminLayout>
  );
}