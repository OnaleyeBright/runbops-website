
import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Button } from "../../components/common/navigation";
import { supabase } from "../../services/supabase";

type Lead = {
  id: string;
  name: string;
  company: string | null;
  service: string;
  budget: string | null;
  status: string;
  created_at: string;
};

type DashboardStats = {
  totalCases: number;
  publishedCases: number;
  activeTeam: number;
  newLeads: number;
};

export default function AdminOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCases: 0,
    publishedCases: 0,
    activeTeam: 0,
    newLeads: 0,
  });

  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const [
          totalCasesResult,
          publishedCasesResult,
          teamResult,
          newLeadsResult,
          recentLeadsResult,
        ] = await Promise.all([
          supabase
            .from("case_studies")
            .select("id", { count: "exact", head: true }),

          supabase
            .from("case_studies")
            .select("id", { count: "exact", head: true })
            .eq("status", "published"),

          supabase
            .from("team_members")
            .select("id", { count: "exact", head: true })
            .eq("status", "active"),

          supabase
            .from("contact_leads")
            .select("id", { count: "exact", head: true })
            .eq("status", "New"),

          supabase
            .from("contact_leads")
            .select(
              "id, name, company, service, budget, status, created_at"
            )
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

        const results = [
          totalCasesResult,
          publishedCasesResult,
          teamResult,
          newLeadsResult,
          recentLeadsResult,
        ];

        const failedResult = results.find(
          (result) => result.error
        );

        if (failedResult?.error) {
          throw failedResult.error;
        }

        if (!mounted) return;

        setStats({
          totalCases: totalCasesResult.count ?? 0,
          publishedCases: publishedCasesResult.count ?? 0,
          activeTeam: teamResult.count ?? 0,
          newLeads: newLeadsResult.count ?? 0,
        });

        setRecentLeads(recentLeadsResult.data ?? []);
      } catch (err) {
        console.error("Dashboard loading error:", err);

        if (mounted) {
          setError("Unable to load dashboard data.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const statItems = [
    {
      label: "Total case studies",
      value: stats.totalCases,
      description: "All case studies",
    },
    {
      label: "Published",
      value: stats.publishedCases,
      description: "Visible on website",
    },
    {
      label: "Team members",
      value: stats.activeTeam,
      description: "Active members",
    },
    {
      label: "New leads",
      value: stats.newLeads,
      description: "Awaiting follow-up",
    },
  ];

  return (
    <AdminLayout page="overview">
      <div className="admin-content">
        {error && (
          <p role="alert" style={{ marginBottom: 20 }}>
            {error}
          </p>
        )}

        <div className="stat-grid">
          {statItems.map((item, index) => (
            <div
              className={`stat stat-${index}`}
              key={item.label}
            >
              <span>{item.label}</span>

              <strong>
                {loading || error ? "—" : item.value}
              </strong>

              <small>{item.description}</small>
            </div>
          ))}
        </div>

        <div className="admin-grid">
          <div className="data-card">
            <div className="data-head">
              <h2>Recent leads</h2>
            </div>

            <div className="data-table">
              {loading ? (
                <p style={{ padding: 24 }}>
                  Loading recent leads...
                </p>
              ) : error ? (
                <p style={{ padding: 24 }}>
                  Recent leads are unavailable.
                </p>
              ) : recentLeads.length === 0 ? (
                <p style={{ padding: 24 }}>
                  No leads received yet.
                </p>
              ) : (
                recentLeads.map((lead) => (
                  <div
  className="data-row"
  key={lead.id}
  style={{
    display: "grid",
    gridTemplateColumns:
      "1.2fr 1.1fr 1fr 0.9fr 0.8fr 60px",
    alignItems: "center",
    gap: "12px",
  }}
>
                    <span>{lead.name}</span>

                    <span>{lead.company || "—"}</span>

                    <span>{lead.service}</span>

                    <span>{lead.budget || "—"}</span>

                    <span
                      className={`status status-${lead.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {lead.status}
                    </span>

                    <a
  href="/admin/leads"
  aria-label={`View lead from ${lead.name}`}
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "32px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#1c1c1a",
    textDecoration: "none",
  }}
>
  View
</a>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick actions</h2>

            <Button
              to="/admin/case-studies/new"
              variant="dark"
            >
              Add case study
            </Button>

            <Button
              to="/admin/team/new"
              variant="outline"
            >
              Add team member
            </Button>

            <Button
              to="/admin/leads"
              variant="outline"
            >
              View all leads
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
