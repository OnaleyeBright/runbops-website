import { useEffect, useState } from "react";
import CaseCard, {
  type CaseCardItem,
} from "../components/case-studies/CaseCard";
import FinalCTA from "../components/common/FinalCTA";
import InnerHero from "../components/common/InnerHero";
import PageShell from "../components/layout/PageShell";
import { supabase } from "../services/supabase";

export default function CaseStudies() {
  const [filter, setFilter] = useState("All");
  const [cases, setCases] = useState<CaseCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCaseStudies() {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("case_studies")
        .select(
          "slug, title, industry, service, short_description, cover_image"
        )
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error(
          "Failed to load case studies:",
          fetchError
        );

        setError(
          "Unable to load case studies at the moment."
        );
        setLoading(false);
        return;
      }

      setCases(data ?? []);
      setLoading(false);
    }

    loadCaseStudies();
  }, []);

  const filteredCases = cases.filter(
    (item) =>
      filter === "All" ||
      item.service.includes(filter)
  );

  return (
    <PageShell>
      <InnerHero
        eyebrow="Selected work"
        title={
          <>
            Real systems.{" "}
            <span className="marker-circle">Real</span>{" "}
            business impact.
          </>
        }
        copy="See how thoughtful operations and the right technology turn complexity into progress."
      />

      <section className="section case-list">
        <div className="filter-row">
          {["All", "CRM", "ERP", "AI", "Marketing"].map(
            (item) => (
              <button
                className={
                  filter === item ? "active" : ""
                }
                onClick={() => setFilter(item)}
                key={item}
              >
                {item}
              </button>
            )
          )}
        </div>

        {loading && (
          <div className="empty">
            <h3>Loading our work...</h3>
            <p>Please wait a moment.</p>
          </div>
        )}

        {!loading && error && (
          <div className="empty">
            <h3>Something went wrong.</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          filteredCases.length > 0 && (
            <div className="case-grid">
              {filteredCases.map((item) => (
                <CaseCard
                  item={item}
                  key={item.slug}
                />
              ))}
            </div>
          )}

        {!loading &&
          !error &&
          filteredCases.length === 0 && (
            <div className="empty">
              <h3>No matching work yet.</h3>
              <p>
                New projects will appear here as they're
                published.
              </p>
            </div>
          )}
      </section>

      <FinalCTA />
    </PageShell>
  );
}