import { useEffect, useState } from "react";
import FinalCTA from "../components/common/FinalCTA";
import InnerHero from "../components/common/InnerHero";
import PageShell from "../components/layout/PageShell";
import TeamCard from "../components/team/TeamCard";
import type { TeamMember } from "../components/team/TeamCard";
import { supabase } from "../services/supabase";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTeamMembers() {
      const { data, error: fetchError } = await supabase
        .from("team_members")
        .select(
          "id, name, role, bio, photo_url, linkedin_url, display_order"
        )
        .eq("status", "active")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (!active) return;

      if (fetchError) {
        console.error("Failed to load public team:", fetchError);
        setError("Unable to load our team right now.");
      } else {
        setTeamMembers(data ?? []);
      }

      setLoading(false);
    }

    void loadTeamMembers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <PageShell>
      <InnerHero
        eyebrow="The team"
        title={
          <>
            The people behind{" "}
            <span className="marker-underline">
              better operations.
            </span>
          </>
        }
        copy="Strategists, builders, and curious problem-solvers who care about how work really gets done."
      />

      <section className="section team-grid">
        {loading ? (
          <p>Loading our team...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : teamMembers.length === 0 ? (
          <p>Our team profiles are coming soon.</p>
        ) : (
          teamMembers.map((member, index) => (
            <TeamCard
              member={member}
              index={index}
              key={member.id}
            />
          ))
        )}
      </section>

      <section className="team-note">
        <h2>
          Small, senior teams.
          <br />
          Close collaboration.
        </h2>

        <p>
          Every engagement is led by people who understand both business
          operations and technical delivery.
        </p>
      </section>

      <FinalCTA />
    </PageShell>
  );
}