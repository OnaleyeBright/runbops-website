import { useEffect, useState } from "react";
import Eyebrow from "../components/common/Eyebrow";
import FinalCTA from "../components/common/FinalCTA";
import { Icon, Link } from "../components/common/navigation";
import PageShell from "../components/layout/PageShell";
import { supabase } from "../services/supabase";

type CaseStudyDetail = {
  id: string;
  slug: string;
  title: string;
  client_name: string | null;
  industry: string;
  service: string;
  short_description: string;
  challenge: string | null;
  objective: string | null;
  solution: string | null;
  implementation: string | null;
  cover_image: string | null;
  gallery: string[] | null;
  tools: unknown;
  results: {
  value: string;
  label: string;
}[] | null;
  testimonial: string | null;
  testimonial_author: string | null;
};

export default function CaseDetail({
  slug,
}: {
  slug: string;
}) {
  const [item, setItem] = useState<CaseStudyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadCaseStudy() {
      setLoading(true);
      setError("");
      setItem(null);
      setLightboxImage(null);

      const { data, error: fetchError } = await supabase
        .from("case_studies")
        .select(
          "id, slug, title, client_name, industry, service, short_description, challenge, objective, solution, implementation, cover_image, gallery, tools, results, testimonial, testimonial_author"
        )
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (!active) return;

      if (fetchError) {
        console.error("Failed to load case study:", fetchError);
        setError("Unable to load this case study.");
      } else if (!data) {
        setError("Case study not found.");
      } else {
        setItem({
          ...data,
          gallery: Array.isArray(data.gallery)
            ? data.gallery.filter(
                (image): image is string =>
                  typeof image === "string"
              )
            : [],
        });
      }

      setLoading(false);
    }

    loadCaseStudy();

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <PageShell>
        <section className="section">
          <h2>Loading case study...</h2>
        </section>
      </PageShell>
    );
  }

  if (error || !item) {
    return (
      <PageShell>
        <section className="section">
          <h1>{error || "Case study not found."}</h1>
          <p>
            This case study may not exist or may not be published.
          </p>
          <Link to="/case-studies">
            ← Back to Case Studies
          </Link>
        </section>
      </PageShell>
    );
  }

  const galleryImages = item.gallery ?? [];

  const projectTools: string[] = Array.isArray(item.tools)
  ? item.tools.filter(
      (tool): tool is string => typeof tool === "string"
    )
  : [];

  const projectResults = Array.isArray(item.results)
  ? item.results.filter(
      (result): result is { value: string; label: string } =>
        typeof result === "object" &&
        result !== null &&
        typeof result.value === "string" &&
        typeof result.label === "string"
    )
  : [];

  const sections = [
    {
      id: "The-challenge",
      label: "The challenge",
      eyebrow: "01 / The challenge",
      content: item.challenge,
    },
    {
      id: "The-objective",
      label: "The objective",
      eyebrow: "02 / The objective",
      content: item.objective,
    },
    {
      id: "Our-solution",
      label: "Our solution",
      eyebrow: "03 / Our solution",
      content: item.solution,
    },
    {
      id: "Implementation",
      label: "Implementation",
      eyebrow: "04 / Implementation",
      content: item.implementation,
    },
  ].filter((section) => section.content?.trim());

  return (
    <PageShell>
      <section className="case-detail-hero bg-yellow">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          {" / "}
          <Link to="/case-studies">Case Studies</Link>
          {" / "}
          <span>{item.title}</span>
        </div>

        <div className="case-detail-title">
          <div>
            <span>
              {item.industry} · {item.service}
            </span>

            <h1>{item.title}</h1>
            <p>{item.short_description}</p>
          </div>

          {item.client_name && (
            <strong>{item.client_name}</strong>
          )}
        </div>

        {item.cover_image && (
          <img
            src={item.cover_image}
            alt={`${item.title} project`}
          />
        )}
      </section>

      <section className="case-narrative">
        <aside>
          <span>Project overview</span>

          {sections.map((section) => (
            <a href={`#${section.id}`} key={section.id}>
              {section.label}
            </a>
          ))}
          {projectTools.length > 0 && (
  <a href="#Tools-technologies">
    Tools & Technologies
  </a>
)}
{projectResults.length > 0 && (
  <a href="#project-results">
    Project Results
  </a>
)}

{item.testimonial?.trim() && (
  <a href="#client-testimonial">
    Client Testimonial
  </a>
)}

          {galleryImages.length > 0 && (
            <a href="#Project-gallery">Project gallery</a>
          )}
        </aside>

        <div>
          {projectTools.length > 0 && (
  <article id="Tools-technologies">
    <Eyebrow>Tools & Technologies</Eyebrow>

    <h2>Technology behind the solution</h2>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        marginTop: "24px",
      }}
    >
      {projectTools.map((tool) => (
        <span
          key={tool}
          style={{
            padding: "12px 20px",
            border: "1px solid #ddd",
            borderRadius: "30px",
            fontWeight: 500,
          }}
          >
  {tool}
</span>
))}
</div>
</article>
)}     
          {projectResults.length > 0 && (
  <article id="project-results">
    <Eyebrow>Project Results</Eyebrow>

    <h2>Measurable impact</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        marginTop: "24px",
      }}
    >
      {projectResults.map((result, index) => (
        <div
          key={index}
          style={{
            padding: "28px 22px",
            background: "#f5f5f0",
            border: "1px solid #e8e8e0",
            borderRadius: "16px",
          }}
        >
          <strong
            style={{
              display: "block",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "12px",
              color: "#222",
            }}
          >
            {result.value}
          </strong>

          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#555",
              margin: 0,
            }}
          >
            {result.label}
          </p>
        </div>
      ))}
    </div>
  </article>
)}
          {sections.map((section) => (
            <article id={section.id} key={section.id}>
              <Eyebrow>{section.eyebrow}</Eyebrow>

              <h2>{section.label}</h2>

              <p style={{ whiteSpace: "pre-line" }}>
                {section.content}
              </p>
            </article>
          ))}
          {item.testimonial?.trim() && (
  <article id="client-testimonial">
    <div
      style={{
        background: "#f5f5f0",
        borderRadius: "20px",
        padding: "clamp(24px, 5vw, 48px)",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "24px",
        }}
      >
        Client Testimonial
      </p>

      <blockquote
        style={{
          margin: 0,
          fontSize: "clamp(22px, 3vw, 34px)",
          lineHeight: 1.4,
          letterSpacing: "-0.03em",
          color: "#222",
        }}
      >
        “{item.testimonial}”
      </blockquote>

      {item.testimonial_author && (
        <p
          style={{
            marginTop: "24px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          — {item.testimonial_author}
        </p>
      )}
    </div>
  </article>
)}

          {galleryImages.length > 0 && (
            <article id="Project-gallery">
              <Eyebrow>05 / Project gallery</Eyebrow>

              <h2>Behind the project</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                }}
              >
                {galleryImages.map((imageUrl, index) => (
                  <button
                    type="button"
                    className="gallery-image"
                    key={`${imageUrl}-${index}`}
                    onClick={() => setLightboxImage(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Project gallery image ${index + 1}`}
                    />
                    <span>View image ↗</span>
                  </button>
                ))}
              </div>
            </article>
          )}
        </div>
      </section>

      {lightboxImage && (
        <div
          className="lightbox"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxImage(null)}
          >
            <Icon name="close" />
          </button>

          <img
            src={lightboxImage}
            alt="Expanded project gallery"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      <FinalCTA />
    </PageShell>
  );
}