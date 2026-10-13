import InnerHero from "../components/common/InnerHero";
import { Button } from "../components/common/navigation";
import PageShell from "../components/layout/PageShell";
import ServiceCard from "../components/services/ServiceCard";
import { serviceData } from "../data/services";

export default function ServicesOverview() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="Capabilities"
        title={
          <>
            Technology solutions built around{" "}
            <span className="marker-underline">your operations.</span>
          </>
        }
        copy="Four connected practices. One accountable implementation partner."
      />

      <section className="section">
        <div className="services-grid large">
          {serviceData.map((service) => (
            <ServiceCard
              service={service}
              key={service.key}
            />
          ))}
        </div>
      </section>

      <section className="service-callout">
        <span>Not sure where to start?</span>

        <h2>
          We'll map the opportunity before we recommend the tools.
        </h2>

        <Button to="/contact" variant="yellow">
          Book an operations review
        </Button>
      </section>
    </PageShell>
  );
}