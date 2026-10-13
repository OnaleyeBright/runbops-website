import { Icon, Link } from "../common/navigation";

export type CaseCardItem = {
  slug: string;
  title: string;
  industry: string;
  service: string;
  short_description: string;
  cover_image: string | null;
  result?: string;
  color?: string;
};

export default function CaseCard({
  item,
}: {
  item: CaseCardItem;
}) {
  return (
    <Link
      to={`/case-studies/${item.slug}`}
      className={`case-card case-${item.color || "yellow"}`}
    >
      <div className="case-image">
        {item.cover_image ? (
          <img
            src={item.cover_image}
            alt={`${item.title} case study`}
          />
        ) : (
          <div
            className="case-image-placeholder"
            aria-label="No cover image available"
          />
        )}
      </div>

      <div className="case-content">
        <div className="case-meta">
          <span>{item.industry}</span>
          <span>{item.service}</span>
        </div>

        <h3>{item.title}</h3>

        <p>{item.short_description}</p>

        <div className="case-result">
          {item.result && <strong>{item.result}</strong>}

          <span className="circle-arrow">
            <Icon name="arrow" />
          </span>
        </div>
      </div>
    </Link>
  );
}