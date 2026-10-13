import type { Service } from "../../data/services";
import { Icon, Link } from "../common/navigation";

export default function ServiceCard({
  service,
}: {
  service: Service;
}) {
  const icon =
    service.key === "crm"
      ? "crm"
      : service.key === "erp"
        ? "erp"
        : service.key === "ai-agents"
          ? "ai"
          : "growth";

  return (
    <article className={`service-card service-${service.key}`}>
      <div className="service-top">
        <span>{service.number}</span>

        <div className="service-icon">
          <Icon name={icon} size={28} />
        </div>
      </div>

      <p className="service-short">{service.short}</p>

      <h3>{service.title}</h3>

      <p>{service.copy}</p>

      <small>{service.tools}</small>

      <Link
        to={`/services/${service.key}`}
        className="text-link"
      >
        Explore service
        <Icon name="arrow" size={17} />
      </Link>
    </article>
  );
}