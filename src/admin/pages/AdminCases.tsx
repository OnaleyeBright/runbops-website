import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import AdminTable from "../components/AdminTable";
import { Button, Icon } from "../../components/common/navigation";
import { supabase } from "../../services/supabase";

type CaseStudy = {
  id: string;
  title: string;
  industry: string;
  service: string;
  status: string;
  cover_image: string | null;
  gallery: string[] | null;
};

export default function AdminCases() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCaseStudies() {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("case_studies")
        .select(
  "id, title, industry, service, status, cover_image, gallery"
)
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error("Failed to load case studies:", fetchError);
        setError("Unable to load case studies.");
        setLoading(false);
        return;
      }

      setCaseStudies(data ?? []);
      setLoading(false);
    }

    loadCaseStudies();
  }, []);
  function getStoragePath(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);

    const bucketPath =
      "/storage/v1/object/public/case-study-images/";

    const supabaseOrigin = new URL(
      import.meta.env.VITE_SUPABASE_URL
    ).origin;

    if (url.origin !== supabaseOrigin) {
      return null;
    }

    if (!url.pathname.startsWith(bucketPath)) {
      return null;
    }

    const filePath = decodeURIComponent(
      url.pathname.slice(bucketPath.length)
    );

    if (
      !filePath ||
      !/^(covers|gallery)\/[^/]+$/.test(filePath) ||
      filePath.includes("..")
    ) {
      return null;
    }

    return filePath;
  } catch {
    return null;
  }
}

async function handleDeleteCaseStudy(caseStudy: CaseStudy) {
  if (deletingId) return;

  const confirmed = window.confirm(
    `Are you sure you want to delete "${caseStudy.title}"?\n\nThis action cannot be undone.`
  );

  if (!confirmed) return;

  setDeletingId(caseStudy.id);
  setError("");

  try {
    const { data, error: deleteError } = await supabase
      .from("case_studies")
      .delete()
      .eq("id", caseStudy.id)
      .select("id");

    if (deleteError) {
      throw deleteError;
    }

    if (!data || data.length === 0) {
      throw new Error(
        "The case study could not be deleted. Check your database permissions."
      );
    }

    setCaseStudies((current) =>
      current.filter((item) => item.id !== caseStudy.id)
    );
    // Clean up uploaded images after successful database deletion.
const imageUrls = [
  caseStudy.cover_image,
  ...(caseStudy.gallery ?? []),
].filter((url): url is string => typeof url === "string");

const storagePaths = [
  ...new Set(
    imageUrls
      .map((url) => getStoragePath(url))
      .filter((path): path is string => path !== null)
  ),
];

if (storagePaths.length > 0) {
  const { error: storageError } = await supabase.storage
    .from("case-study-images")
    .remove(storagePaths);

  if (storageError) {
    console.error(
      "Case study deleted, but image cleanup failed:",
      storageError
    );
  }
}
  } catch (deleteError) {
    console.error("Failed to delete case study:", deleteError);
    setError("Unable to delete this case study. Please try again.");
  } finally {
    setDeletingId(null);
  }
}
  const rows = caseStudies.map((caseStudy) => [
    caseStudy.title,
    caseStudy.industry,
    caseStudy.service,
    caseStudy.status.charAt(0).toUpperCase() +
      caseStudy.status.slice(1),
  ]);

  return (
    <AdminLayout page="case-studies">
      <div className="admin-content">
        <div className="page-action">
          <p>Manage the work shown on the public website.</p>

          <Button to="/admin/case-studies/new" variant="dark">
            <Icon name="plus" /> Add case study
          </Button>
        </div>

        <div className="admin-filters">
          <button className="active">All</button>
          <button>Published</button>
          <button>Draft</button>
          <button>CRM</button>
          <button>ERP</button>
        </div>

        {loading && <p>Loading case studies...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <AdminTable
  title="All case studies"
  rows={rows}
  actionLabel="Edit"
  onRowAction={(rowIndex) => {
    const caseStudy = caseStudies[rowIndex];

    if (caseStudy) {
      navigate(`/admin/case-studies/${caseStudy.id}/edit`);
    }
  }}
  secondaryActionLabel="Delete"
  onSecondaryAction={(rowIndex) => {
  const caseStudy = caseStudies[rowIndex];

  if (caseStudy && !deletingId) {
    void handleDeleteCaseStudy(caseStudy);
  }
}}
/>
        )}
      </div>
    </AdminLayout>
  );
}