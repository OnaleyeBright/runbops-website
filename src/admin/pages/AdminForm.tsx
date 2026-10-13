import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import {
  Button,
  Icon,
} from "../../components/common/navigation";
import { supabase } from "../../services/supabase";

type AdminFormProps = {
  type: "case" | "team";
};

type CaseFormData = {
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  service: string;
  short_description: string;
  challenge: string;
  objective: string;
  solution: string;
  implementation: string;
  seo_title: string;
  seo_description: string;
  cover_image: string;
  gallery: string[];
  tools: string[];
  results: {
  value: string;
  label: string;
}[];
testimonial: string;
testimonial_author: string;
};

type TeamFormData = {
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin_url: string;
  status: "active" | "inactive";
  display_order: number;
};

const initialCaseForm: CaseFormData = {
  title: "",
  slug: "",
  client_name: "",
  industry: "",
  service: "CRM",
  short_description: "",
  challenge: "",
  objective: "",
  solution: "",
  implementation: "",
  seo_title: "",
  seo_description: "",
  cover_image: "",
  gallery: [],
  tools: [],
  results: [],
  testimonial: "",
testimonial_author: "",
};

const initialTeamForm: TeamFormData = {
  name: "",
  role: "",
  bio: "",
  photo_url: "",
  linkedin_url: "",
  status: "active",
  display_order: 0,
};

export default function AdminForm({ type }: AdminFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isEditing = type === "case" && Boolean(id);
  const isEditingTeam = type === "team" && Boolean(id);

  const [caseForm, setCaseForm] = useState<CaseFormData>(initialCaseForm);

  const [teamForm, setTeamForm] = useState<TeamFormData>(initialTeamForm);
  const [teamPhotoFile, setTeamPhotoFile] = useState<File | null>(null);
  const [teamPhotoPreview, setTeamPhotoPreview] = useState("");
  const [teamPhotoError, setTeamPhotoError] = useState("");

  useEffect(() => {
  if (!isEditingTeam || !id) return;

  let active = true;

  async function loadTeamMember() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("team_members")
      .select(
        "name, role, bio, photo_url, linkedin_url, status, display_order"
      )
      .eq("id", id)
      .maybeSingle();

    if (!active) return;

    if (fetchError || !data) {
      console.error("Failed to load team member:", fetchError);
      setError("Unable to load this team member.");
    } else {
      setTeamForm({
        name: data.name ?? "",
        role: data.role ?? "",
        bio: data.bio ?? "",
        photo_url: data.photo_url ?? "",
        linkedin_url: data.linkedin_url ?? "",
        status: data.status === "inactive" ? "inactive" : "active",
        display_order: data.display_order ?? 0,
      });
    }

    setLoading(false);
  }

  void loadTeamMember();

  return () => {
    active = false;
  };
}, [id, isEditingTeam]);
  const [toolInput, setToolInput] = useState("");

  const [resultValue, setResultValue] = useState("");
  const [resultLabel, setResultLabel] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [galleryImagesToDelete, setGalleryImagesToDelete] =
  useState<string[]>([]);
  const teamFields = [
    "Full name",
    "Job title",
    "Short bio",
    "Full bio",
    "Email",
    "LinkedIn",
    "Display order",
  ];

  useEffect(() => {
  if (!isEditing || !id) {
    return;
  }

  async function loadCaseStudy() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
  .from("case_studies")
  .select(
  "title, slug, client_name, industry, service, short_description, challenge, objective, solution, implementation, seo_title, seo_description, cover_image, gallery, tools, results, testimonial, testimonial_author"
)
  .eq("id", id)
  .single();

    if (fetchError || !data) {
      console.error(
        "Failed to load case study:",
        fetchError
      );

      setError("Unable to load this case study.");
      setLoading(false);
      return;
    }

    setCaseForm({
      title: data.title ?? "",
      slug: data.slug ?? "",
      client_name: data.client_name ?? "",
      industry: data.industry ?? "",
      service: data.service ?? "CRM",
      short_description: data.short_description ?? "",
      challenge: data.challenge ?? "",
      objective: data.objective ?? "",
      solution: data.solution ?? "",
      implementation: data.implementation ?? "",
      seo_title: data.seo_title ?? "",
      seo_description: data.seo_description ?? "",
      cover_image: data.cover_image ?? "",
      gallery: Array.isArray(data.gallery)
  ? data.gallery.filter(
      (item): item is string => typeof item === "string"
    )
  : [],
  tools: Array.isArray(data.tools)
  ? data.tools.filter(
      (item): item is string => typeof item === "string"
    )
  : [],
  results: Array.isArray(data.results)
  ? data.results.filter(
      (result): result is { value: string; label: string } =>
        typeof result === "object" &&
        result !== null &&
        !Array.isArray(result) &&
        typeof result.value === "string" &&
        typeof result.label === "string"
    )
  : [],
  testimonial: data.testimonial ?? "",
testimonial_author: data.testimonial_author ?? "",
    });

    setLoading(false);
  }

  loadCaseStudy();
}, [id, isEditing]);

  function handleCaseChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setCaseForm((current) => ({
      ...current,
      [name]: value,
    }));
  }
async function handleCoverImageUpload(
  event: ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  setError("");

  if (!file.type.startsWith("image/")) {
    setError("Please select a valid image file.");
    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError("Cover image must be 5MB or smaller.");
    event.target.value = "";
    return;
  }

  setUploadingImage(true);

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const filePath = `covers/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("case-study-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Image upload failed:", uploadError);
    setError("Unable to upload the cover image.");
    setUploadingImage(false);
    return;
  }

  const { data } = supabase.storage
    .from("case-study-images")
    .getPublicUrl(filePath);

  setCaseForm((current) => ({
    ...current,
    cover_image: data.publicUrl,
  }));

  setUploadingImage(false);
}

async function handleGalleryUpload(
  event: ChangeEvent<HTMLInputElement>
) {
  const files = Array.from(event.target.files ?? []);

  if (files.length === 0) {
    return;
  }

  setError("");

  const invalidFile = files.find(
    (file) => !file.type.startsWith("image/")
  );

  if (invalidFile) {
    setError("Please select image files only.");
    event.target.value = "";
    return;
  }

  const oversizedFile = files.find(
    (file) => file.size > 5 * 1024 * 1024
  );

  if (oversizedFile) {
    setError("Each gallery image must be 5MB or smaller.");
    event.target.value = "";
    return;
  }

  setUploadingGallery(true);

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const extension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${crypto.randomUUID()}.${extension}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("case-study-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error(
        "Gallery image upload failed:",
        uploadError
      );

      setError(
        "One or more gallery images could not be uploaded."
      );

      setUploadingGallery(false);
      event.target.value = "";
      return;
    }

    const { data } = supabase.storage
      .from("case-study-images")
      .getPublicUrl(filePath);

    uploadedUrls.push(data.publicUrl);
  }

  setCaseForm((current) => ({
    ...current,
    gallery: [...current.gallery, ...uploadedUrls],
  }));

  setUploadingGallery(false);
  event.target.value = "";
}

function handleRemoveGalleryImage(
  imageUrl: string,
  index: number
) {
  setCaseForm((current) => ({
    ...current,
    gallery: current.gallery.filter(
      (_, imageIndex) => imageIndex !== index
    ),
  }));

  setGalleryImagesToDelete((current) => [
    ...current,
    imageUrl,
  ]);
}
function handleAddTool() {
  const newTool = toolInput.trim();

  if (!newTool) return;

  const alreadyExists = caseForm.tools.some(
    (tool) => tool.toLowerCase() === newTool.toLowerCase()
  );

  if (alreadyExists) {
    setToolInput("");
    return;
  }

  setCaseForm((current) => ({
    ...current,
    tools: [...current.tools, newTool],
  }));

  setToolInput("");
}

function handleRemoveTool(toolToRemove: string) {
  setCaseForm((current) => ({
    ...current,
    tools: current.tools.filter(
      (tool) => tool !== toolToRemove
    ),
  }));
}
function handleAddResult() {
  const value = resultValue.trim();
  const label = resultLabel.trim();

  if (!value || !label) {
    return;
  }

  setCaseForm((current) => ({
    ...current,
    results: [
      ...current.results,
      { value, label },
    ],
  }));

  setResultValue("");
  setResultLabel("");
}

function handleRemoveResult(indexToRemove: number) {
  setCaseForm((current) => ({
    ...current,
    results: current.results.filter(
      (_, index) => index !== indexToRemove
    ),
  }));
}
function getStoragePathFromUrl(imageUrl: string) {
  const marker = "/case-study-images/";

  const markerIndex = imageUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  return decodeURIComponent(
    imageUrl.slice(markerIndex + marker.length)
  );
}

  async function saveCaseStudy(status: "draft" | "published") {
    setError("");

    if (
      !caseForm.title.trim() ||
      !caseForm.slug.trim() ||
      !caseForm.industry.trim() ||
      !caseForm.service.trim() ||
      !caseForm.short_description.trim()
    ) {
      setError(
        "Please complete the title, slug, industry, service, and short description."
      );
      return;
    }

    setSaving(true);

    const caseStudyData = {
  title: caseForm.title.trim(),
  slug: caseForm.slug.trim().toLowerCase(),
  client_name: caseForm.client_name.trim() || null,
  industry: caseForm.industry.trim(),
  service: caseForm.service,
  short_description: caseForm.short_description.trim(),
  challenge: caseForm.challenge.trim() || null,
  objective: caseForm.objective.trim() || null,
  solution: caseForm.solution.trim() || null,
  implementation: caseForm.implementation.trim() || null,
  seo_title: caseForm.seo_title.trim() || null,
  seo_description: caseForm.seo_description.trim() || null,
  cover_image: caseForm.cover_image || null,
  gallery: caseForm.gallery,
  tools: caseForm.tools,
  results: caseForm.results,
  testimonial: caseForm.testimonial.trim() || null,
  testimonial_author: caseForm.testimonial_author.trim() || null,
  status,
  updated_at: new Date().toISOString(),
};

let saveError = null;

if (isEditing && id) {
  const { error: updateError } = await supabase
    .from("case_studies")
    .update(caseStudyData)
    .eq("id", id);

  saveError = updateError;
} else {
  const { error: insertError } = await supabase
    .from("case_studies")
    .insert(caseStudyData);

  saveError = insertError;
}

setSaving(false);

if (saveError) {
  console.error("Failed to save case study:", saveError);

  if (saveError.code === "23505") {
    setError(
      "That slug is already being used. Please choose another slug."
    );
    return;
  }

  setError(
    isEditing
      ? "Unable to update the case study. Please try again."
      : "Unable to save the case study. Please try again."
  );

  return;
}

// Delete gallery images that were removed from the case study
if (galleryImagesToDelete.length > 0) {
  const storagePaths = galleryImagesToDelete
    .map(getStoragePathFromUrl)
    .filter((path): path is string => path !== null);

  if (storagePaths.length > 0) {
    const { error: deleteError } = await supabase.storage
      .from("case-study-images")
      .remove(storagePaths);

    if (deleteError) {
      console.error(
        "Failed to delete removed gallery images:",
        deleteError
      );
    }
  }

  setGalleryImagesToDelete([]);
}

navigate("/admin/case-studies");
}
function handleTeamPhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];

  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    setTeamPhotoError("Please select a JPG, PNG, or WebP image.");
    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setTeamPhotoError("Profile photo must be smaller than 5MB.");
    event.target.value = "";
    return;
  }

  setTeamPhotoError("");
  setTeamPhotoFile(file);

  const reader = new FileReader();

  reader.onload = () => {
    setTeamPhotoPreview(String(reader.result ?? ""));
  };

  reader.readAsDataURL(file);
}

async function saveTeamMember(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (saving) return;

  setError("");

  if (!teamForm.name.trim() || !teamForm.role.trim()) {
    setError("Please enter the team member's name and role.");
    return;
  }

  if (
    !Number.isInteger(teamForm.display_order) ||
    teamForm.display_order < 0
  ) {
    setError("Display order must be a non-negative whole number.");
    return;
  }

  setSaving(true);

  try {
    const previousPhotoUrl = teamForm.photo_url;
    let photoUrl = teamForm.photo_url;

if (teamPhotoFile) {
  const fileExtension = teamPhotoFile.name
    .split(".")
    .pop()
    ?.toLowerCase();

  const allowedExtensions = ["jpg", "jpeg", "png", "webp"];

  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    throw new Error("Unsupported profile photo extension.");
  }

  const filePath = `profiles/${crypto.randomUUID()}.${fileExtension}`;

  const { error: uploadError } = await supabase.storage
    .from("team-photos")
    .upload(filePath, teamPhotoFile, {
      contentType: teamPhotoFile.type,
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: publicUrlData } = supabase.storage
    .from("team-photos")
    .getPublicUrl(filePath);

  photoUrl = publicUrlData.publicUrl;
}
    const teamMemberData = {
  name: teamForm.name.trim(),
  role: teamForm.role.trim(),
  bio: teamForm.bio.trim() || null,
  photo_url: photoUrl || null,
  linkedin_url: teamForm.linkedin_url.trim() || null,
  status: teamForm.status,
  display_order: teamForm.display_order,
  updated_at: new Date().toISOString(),
};

if (isEditingTeam && !id) {
  throw new Error("Team member ID is missing.");
}

const { data, error: saveError } = isEditingTeam
  ? await supabase
      .from("team_members")
      .update(teamMemberData)
      .eq("id", id!)
      .select("id")
  : await supabase
      .from("team_members")
      .insert(teamMemberData)
      .select("id");

if (saveError) {
  throw saveError;
}

if (!data || data.length === 0) {
  throw new Error("No team member record was saved.");
}

// Delete the previous profile photo only after the database save succeeds.
if (
  teamPhotoFile &&
  previousPhotoUrl &&
  previousPhotoUrl !== photoUrl
) {
  const { data: oldPhotoData } = supabase.storage
    .from("team-photos")
    .getPublicUrl("");

  const bucketBaseUrl = oldPhotoData.publicUrl.replace(/\/$/, "") + "/";

  if (previousPhotoUrl.startsWith(bucketBaseUrl)) {
    const oldPhotoPath = decodeURIComponent(
      previousPhotoUrl.slice(bucketBaseUrl.length).split("?")[0]
    );

    if (oldPhotoPath.startsWith("profiles/")) {
      const { error: cleanupError } = await supabase.storage
        .from("team-photos")
        .remove([oldPhotoPath]);

      if (cleanupError) {
        console.error(
          "Previous team photo cleanup failed:",
          cleanupError
        );
      }
    }
  }
}
    navigate("/admin/team");
  } catch (saveError) {
    console.error("Failed to save team member:", saveError);
    setError("Unable to save the team member. Please try again.");
  } finally {
    setSaving(false);
  }
}

  function preventSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  if (type === "team") {
    return (
      <AdminLayout page="team">
        <div className="admin-content">
          <div className="page-action">
            <p>← Back to team</p>

            <div>
  <button
    type="submit"
    form="team-member-form"
    className="btn btn-dark"
    disabled={saving}
  >
    {saving
  ? "Saving..."
  : isEditingTeam
    ? "Update Team Member"
    : "Save Team Member"}
  </button>
</div>
          </div>

          <div className="cms-grid">
            <form
  id="team-member-form"
  className="cms-form"
  onSubmit={saveTeamMember}
>
              <h2>Team member</h2>
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

              <label>
  Full Name *
  <input
    type="text"
    value={teamForm.name}
    onChange={(event) =>
      setTeamForm((current) => ({
        ...current,
        name: event.target.value,
      }))
    }
    placeholder="e.g. Sarah Johnson"
    required
  />
</label>

<label>
  Job Title / Role *
  <input
    type="text"
    value={teamForm.role}
    onChange={(event) =>
      setTeamForm((current) => ({
        ...current,
        role: event.target.value,
      }))
    }
    placeholder="e.g. Head of Operations"
    required
  />
</label>

<label>
  Biography
  <textarea
    value={teamForm.bio}
    onChange={(event) =>
      setTeamForm((current) => ({
        ...current,
        bio: event.target.value,
      }))
    }
    placeholder="Write a short professional biography..."
    rows={5}
  />
</label>

<label>
  LinkedIn Profile URL
  <input
    type="url"
    value={teamForm.linkedin_url}
    onChange={(event) =>
      setTeamForm((current) => ({
        ...current,
        linkedin_url: event.target.value,
      }))
    }
    placeholder="https://www.linkedin.com/in/username"
  />
</label>

<label>
  Display Order
  <input
    type="number"
    min={0}
    step={1}
    value={teamForm.display_order}
    onChange={(event) =>
      setTeamForm((current) => ({
        ...current,
        display_order: Number(event.target.value),
      }))
    }
  />
</label>
            </form>

            <aside className="cms-side">
              <h2>Media</h2>

              <div className="uploader">
  {teamPhotoPreview || teamForm.photo_url ? (
    <img
      src={teamPhotoPreview || teamForm.photo_url}
      alt="Team member profile preview"
      style={{
        width: "120px",
        height: "120px",
        objectFit: "cover",
        borderRadius: "50%",
        marginBottom: "12px",
      }}
    />
  ) : (
    <Icon name="upload" size={30} />
  )}

  <b>Upload profile photo</b>

  <input
    type="file"
    accept="image/jpeg,image/png,image/webp"
    onChange={handleTeamPhotoChange}
    style={{ maxWidth: "100%" }}
  />

  <span>JPG, PNG or WebP, maximum 5MB</span>

  {teamPhotoFile && (
    <p style={{ fontSize: "13px" }}>
      Selected: {teamPhotoFile.name}
    </p>
  )}

  {teamPhotoError && (
    <p
      role="alert"
      style={{
        color: "#c0392b",
        fontSize: "13px",
      }}
    >
      {teamPhotoError}
    </p>
  )}
</div>

              <label>
  Status
  <select
    value={teamForm.status}
    onChange={(event) =>
      setTeamForm((current) => ({
        ...current,
        status: event.target.value as "active" | "inactive",
      }))
    }
  >
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
</label>
            </aside>
          </div>
        </div>
      </AdminLayout>
    );
  }

if (loading) {
  return (
    <AdminLayout page="case-studies">
      <div className="admin-content">
        <p>Loading case study...</p>
      </div>
    </AdminLayout>
  );
}
  return (
    <AdminLayout page="case-studies">
      <div className="admin-content">
        <div className="page-action">
          <p>← Back to case studies</p>

          <div>
            <Button
              variant="outline"
              disabled={saving}
              onClick={() => saveCaseStudy("draft")}
            >
              {saving ? "Saving..." : "Save draft"}
            </Button>

            <Button
              variant="dark"
              disabled={saving}
              onClick={() => saveCaseStudy("published")}
            >
              {saving ? "Saving..." : "Publish"}
            </Button>
          </div>
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="cms-grid">
          <form className="cms-form" onSubmit={preventSubmit}>
            <h2>
  {isEditing ? "Edit project" : "Project details"}
</h2>

            <label>
              Project title
              <input
                name="title"
                value={caseForm.title}
                onChange={handleCaseChange}
                placeholder="Enter project title"
                required
              />
            </label>

            <label>
              Slug
              <input
                name="slug"
                value={caseForm.slug}
                onChange={handleCaseChange}
                placeholder="healthcare-crm"
                required
              />
            </label>

            <label>
              Client name
              <input
                name="client_name"
                value={caseForm.client_name}
                onChange={handleCaseChange}
                placeholder="Enter client name"
              />
            </label>

            <label>
              Industry
              <input
                name="industry"
                value={caseForm.industry}
                onChange={handleCaseChange}
                placeholder="e.g. Healthcare"
                required
              />
            </label>

            <label>
              Short description
              <input
                name="short_description"
                value={caseForm.short_description}
                onChange={handleCaseChange}
                placeholder="Brief project summary"
                required
              />
            </label>

            <label>
              Full challenge
              <input
                name="challenge"
                value={caseForm.challenge}
                onChange={handleCaseChange}
                placeholder="Describe the challenge"
              />
            </label>

            <label>
              Objective
              <input
                name="objective"
                value={caseForm.objective}
                onChange={handleCaseChange}
                placeholder="Describe the objective"
              />
            </label>

            <label>
              Solution
              <input
                name="solution"
                value={caseForm.solution}
                onChange={handleCaseChange}
                placeholder="Describe the solution"
              />
            </label>

            <label>
              Implementation
              <input
                name="implementation"
                value={caseForm.implementation}
                onChange={handleCaseChange}
                placeholder="Describe the implementation"
              />
            </label>
<div className="cms-field">
  <label htmlFor="case-tool-input">
    Tools & Technologies
  </label>

  <div
    style={{
      display: "flex",
      gap: "10px",
      marginTop: "8px",
    }}
  >
    <input
      id="case-tool-input"
      type="text"
      placeholder="e.g. HubSpot, Zoho CRM, Zapier"
      value={toolInput}
      onChange={(event) => setToolInput(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handleAddTool();
        }
      }}
      style={{ flex: 1, minWidth: 0 }}
    />

    <button
      type="button"
      onClick={handleAddTool}
    >
      Add Tool
    </button>
  </div>

  {caseForm.tools.length > 0 && (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginTop: "12px",
      }}
    >
      {caseForm.tools.map((tool) => (
        <div
          key={tool}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            borderRadius: "20px",
            background: "#f2f2f2",
            color: "#222",
          }}
        >
          <span>{tool}</span>

          <button
            type="button"
            onClick={() => handleRemoveTool(tool)}
            aria-label={`Remove ${tool}`}
            style={{ cursor: "pointer" }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )}
</div>
<div className="cms-field">
  <label>Project Results</label>

  <p style={{ marginTop: "6px", fontSize: "13px", color: "#666" }}>
    Add measurable outcomes achieved through this project.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: "10px",
      marginTop: "12px",
    }}
  >
    <input
      type="text"
      placeholder="e.g. 60%"
      value={resultValue}
      onChange={(event) => setResultValue(event.target.value)}
    />

    <input
      type="text"
      placeholder="e.g. Less manual work"
      value={resultLabel}
      onChange={(event) => setResultLabel(event.target.value)}
    />
  </div>

  <button
    type="button"
    onClick={handleAddResult}
    style={{
      marginTop: "12px",
      padding: "10px 18px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    + Add Result
  </button>

  {caseForm.results.length > 0 && (
    <div
      style={{
        display: "grid",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      {caseForm.results.map((result, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "14px",
            border: "1px solid #e5e5e5",
            borderRadius: "10px",
          }}
        >
          <div>
            <strong style={{ display: "block", fontSize: "20px" }}>
              {result.value}
            </strong>

            <span style={{ color: "#666", fontSize: "13px" }}>
              {result.label}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleRemoveResult(index)}
            style={{
              cursor: "pointer",
              color: "#b42318",
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}
</div>
<div className="cms-field">
  <h3>Client Testimonial</h3>

  <p
    style={{
      marginTop: "6px",
      fontSize: "13px",
      color: "#666",
    }}
  >
    Add feedback from the client about this project.
  </p>

  <label htmlFor="case-testimonial">
    Client Feedback
  </label>

  <textarea
    id="case-testimonial"
    value={caseForm.testimonial}
    onChange={(event) =>
      setCaseForm((current) => ({
        ...current,
        testimonial: event.target.value,
      }))
    }
    placeholder="Enter the client's feedback..."
    rows={5}
    style={{
      width: "100%",
      padding: "12px",
      marginTop: "8px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      resize: "vertical",
    }}
  />

  <label
    htmlFor="case-testimonial-author"
    style={{
      display: "block",
      marginTop: "18px",
    }}
  >
    Testimonial Author
  </label>

  <input
    id="case-testimonial-author"
    type="text"
    value={caseForm.testimonial_author}
    onChange={(event) =>
      setCaseForm((current) => ({
        ...current,
        testimonial_author: event.target.value,
      }))
    }
    placeholder="e.g. Jane Smith, CEO at Example Company"
    style={{
      width: "100%",
      marginTop: "8px",
    }}
  />
</div>
            <label>
              SEO title
              <input
                name="seo_title"
                value={caseForm.seo_title}
                onChange={handleCaseChange}
                placeholder="Enter SEO title"
              />
            </label>

            <label>
              SEO description
              <input
                name="seo_description"
                value={caseForm.seo_description}
                onChange={handleCaseChange}
                placeholder="Enter SEO description"
              />
            </label>
          </form>

          <aside className="cms-side">
            <h2>Media</h2>

            <label className="uploader">
  {caseForm.cover_image ? (
    <img
      src={caseForm.cover_image}
      alt="Case study cover preview"
      style={{
        width: "100%",
        maxHeight: "220px",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
  ) : (
    <Icon name="upload" size={30} />
  )}

  <b>
    {uploadingImage
      ? "Uploading..."
      : caseForm.cover_image
        ? "Change cover image"
        : "Upload cover image"}
  </b>

  <span>PNG, JPG or WebP — maximum 5MB</span>

  <input
    type="file"
    accept="image/png,image/jpeg,image/webp"
    onChange={handleCoverImageUpload}
    disabled={uploadingImage}
    style={{ display: "none" }}
  />
</label>

<div className="gallery-uploader">
  <h3>Project gallery</h3>

  <label className="uploader">
    <Icon name="upload" size={26} />

    <b>
      {uploadingGallery
        ? "Uploading..."
        : "Upload gallery images"}
    </b>

    <span>
      Select multiple PNG, JPG or WebP images — maximum 5MB each
    </span>

    <input
      type="file"
      accept="image/png,image/jpeg,image/webp"
      multiple
      onChange={handleGalleryUpload}
      disabled={uploadingGallery}
      style={{ display: "none" }}
    />
  </label>

  {caseForm.gallery.length > 0 && (
    <div
      className="gallery-preview-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
        marginTop: "14px",
      }}
    >
      {caseForm.gallery.map((imageUrl, index) => (
        <div
          key={`${imageUrl}-${index}`}
          style={{
            position: "relative",
          }}
        >
          <img
            src={imageUrl}
            alt={`Gallery preview ${index + 1}`}
            style={{
              width: "100%",
              height: "110px",
              objectFit: "cover",
              borderRadius: "8px",
              display: "block",
            }}
          />

          <button
            type="button"
            onClick={() =>
  handleRemoveGalleryImage(imageUrl, index)
}
            style={{
              marginTop: "6px",
              width: "100%",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}
</div>

            <label>
              Service
              <select
                name="service"
                value={caseForm.service}
                onChange={handleCaseChange}
              >
                <option value="CRM">CRM</option>
                <option value="ERP">ERP</option>
                <option value="AI">AI</option>
                <option value="Marketing">Marketing</option>
              </select>
            </label>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}