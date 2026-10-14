import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import Eyebrow from "../../components/common/Eyebrow";
import { Button, Icon } from "../../components/common/navigation";
import { supabase } from "../../services/supabase";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string;
  budget: string | null;
  timeline: string | null;
  message: string;
  contact_methods: string[];
  status: string;
  internal_notes: string;
};

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [leadStatus, setLeadStatus] = useState("New");
  const [internalNotes, setInternalNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadLeads() {
      const { data, error: fetchError } = await supabase
        .from("contact_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (fetchError) {
        console.error("Failed to load leads:", fetchError);
        setError("Unable to load leads. Please try again.");
      } else {
        setLeads(data ?? []);
      }

      setLoading(false);
    }

    void loadLeads();

    return () => {
      active = false;
    };
  }, []);

  
function exportLeadsCSV() {
  if (leads.length === 0) return;

  const headers = [
    "Name",
    "Email",
    "Company",
    "Phone",
    "Service",
    "Budget",
    "Timeline",
    "Project Description",
    "Preferred Contact Methods",
    "Status",
    "Internal Notes",
    "Submission Date",
  ];

  function csvCell(value: unknown): string {
    let text = String(value ?? "");

    // Prevent spreadsheet applications from interpreting
    // user-submitted text as executable formulas.
    if (/^[\s\uFEFF]*[=+\-@]/.test(text)) {
      text = "'" + text;
    }

    return `"${text.replace(/"/g, '""')}"`;
  }

  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.company,
    lead.phone,
    lead.service,
    lead.budget,
    lead.timeline,
    lead.message,
    lead.contact_methods?.join(", "),
    lead.status,
    lead.internal_notes,
    lead.created_at,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");

  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `runbops-leads-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

async function saveLeadStatus() {
  if (!selected || saving) return;

  setSaving(true);
  setSaveError("");

  try {
    const { data, error: updateError } = await supabase
  .from("contact_leads")
  .update({
    status: leadStatus,
    internal_notes: internalNotes,
  })
  .eq("id", selected.id)
  .select("id, status, internal_notes")
  .single();

    if (updateError) {
      throw updateError;
    }

    if (!data) {
      throw new Error("Lead update was not confirmed.");
    }

    setLeads((previous) =>
  previous.map((lead) =>
    lead.id === selected.id
      ? {
          ...lead,
          status: data.status,
          internal_notes: data.internal_notes,
        }
      : lead
  )
);

setSelected((previous) =>
  previous?.id === selected.id
    ? {
        ...previous,
        status: data.status,
        internal_notes: data.internal_notes,
      }
    : previous
);

    setSelected(null);
  } catch (error) {
    console.error("Failed to update lead status:", error);
    setSaveError(
      "Unable to save the lead status. Please try again."
    );
  } finally {
    setSaving(false);
  }
}

  const newLeadCount = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  return (
    <AdminLayout page="leads">
      <div className="admin-content">
        <div className="page-action">
          <p>Contact requests submitted through the website.</p>
          <span className="new-leads">
            {newLeadCount} new
          </span>
        </div>

        <div className="data-card">
          
<div className="data-head">
  <h2>Incoming leads</h2>

  <Button
    variant="dark"
    onClick={exportLeadsCSV}
    disabled={loading || !!error || leads.length === 0}
  >
    Export CSV
  </Button>
</div>


          <div className="data-table">
            {loading ? (
              <p>Loading leads...</p>
            ) : error ? (
              <p role="alert">{error}</p>
            ) : leads.length === 0 ? (
              <p>No leads received yet.</p>
            ) : (
              leads.map((lead) => (
                <button
                  className="lead-row"
                  key={lead.id}
                  onClick={() => {
  setSelected(lead);
  setLeadStatus(lead.status);
  setInternalNotes(lead.internal_notes ?? "");
  setSaveError("");
}}
                >
                  <span>{lead.name}</span>

                  <span>{lead.company || "Individual"}</span>

                  <span>{lead.service}</span>

                  <span>{lead.budget || "Not specified"}</span>

                  <span
                    className={`status status-${lead.status.toLowerCase()}`}
                  >
                    {lead.status}
                  </span>

                  <span>→</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {selected && (
        <div className="lead-drawer">
          <button
  className="lead-drawer-close"
  onClick={() => setSelected(null)}
  aria-label="Close lead details"
>
  <Icon name="close" />
</button>

          <Eyebrow>Lead profile</Eyebrow>

          <h2>{selected.name}</h2>
          <p>{selected.company || "Individual client"}</p>

          <div className="lead-info">
            <span>
              EMAIL
              <b>{selected.email}</b>
            </span>

            <span>
              PHONE
              <b>{selected.phone || "Not provided"}</b>
            </span>

            <span>
              SERVICE
              <b>{selected.service}</b>
            </span>

            <span>
              BUDGET
              <b>{selected.budget || "Not specified"}</b>
            </span>

            <span>
              TIMELINE
              <b>{selected.timeline || "Not specified"}</b>
            </span>

            <span>
              PREFERRED CONTACT
              <b>
                {selected.contact_methods?.join(", ") ||
                  "Not specified"}
              </b>
            </span>

            <span>
  STATUS
  <select
    value={leadStatus}
    onChange={(e) => setLeadStatus(e.target.value)}
    disabled={saving}
  >
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Qualified">Qualified</option>
    <option value="Proposal">Proposal</option>
    <option value="Won">Won</option>
    <option value="Lost">Lost</option>
  </select>
</span>
          </div>

          <div className="lead-info">
            <span>
              PROJECT DESCRIPTION
              <b>{selected.message}</b>
            </span>
          </div>
          <div className="lead-notes">
  <label htmlFor="lead-internal-notes">
    INTERNAL NOTES
  </label>

  <textarea
    id="lead-internal-notes"
    rows={5}
    value={internalNotes}
    onChange={(e) => setInternalNotes(e.target.value)}
    placeholder="Record meeting outcomes, follow-ups, and important client details..."
    disabled={saving}
  />
</div>
          {saveError && (
  <p role="alert" style={{ color: "#b42318" }}>
    {saveError}
  </p>
)}

<div className="lead-save-action">
  <Button
    variant="dark"
    onClick={() => void saveLeadStatus()}
    disabled={
  saving ||
  (
    leadStatus === selected.status &&
    internalNotes === (selected.internal_notes ?? "")
  )
}
  >
    {saving ? "Saving..." : "Save update"}
  </Button>
</div>
        </div>
      )}
    </AdminLayout>
  );
}