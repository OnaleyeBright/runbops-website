import Eyebrow from "../components/common/Eyebrow";
import FinalCTA from "../components/common/FinalCTA";
import SectionHeading from "../components/common/SectionHeading";
import { Button, Icon, Link } from "../components/common/navigation";
import PageShell from "../components/layout/PageShell";
import LogoMarquee from "../components/services/LogoMarquee";
import OperationsVisual from "../components/services/OperationsVisual";
import { serviceData, serviceDetails } from "../data/services";

export default function ServiceDetail({
  type,
}: {
  type: string;
}) {
  const data = serviceDetails[type] || serviceDetails.crm;

  const service = serviceData.find(
    (item) => item.key === type
  );

  return (
    <PageShell>
      <section className={`service-hero bg-${data.color}`}>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          {" / "}
          <Link to="/services">Services</Link>
          {" / "}
          <span>{service?.title}</span>
        </div>

        <div className="service-hero-grid">
          <div>
            <Eyebrow>
              Runbops / {service?.title}
            </Eyebrow>

            <h1>{data.title}</h1>

            <p>{data.description}</p>

            <Button to="/contact" variant="dark">
              Discuss your project
            </Button>
          </div>

          <OperationsVisual />
        </div>
      </section>

      <section className="section capabilities">
        <SectionHeading
          eyebrow="What we deliver"
          title="A complete, practical implementation."
        />

        <div className="capability-grid">
          {data.capabilities.map((item, i) => (
            <div key={item}>
              <span>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{item}</h3>
              <Icon name="arrow" />
            </div>
          ))}
        </div>
      </section>

      <section className="tools-section">
        <SectionHeading
          eyebrow="Technology partners"
          title="Platforms we work with."
        />

        <LogoMarquee items={data.tools} />
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="The process"
          title="Clear steps. No black box."
        />

        <div className="compact-process">
          {data.process.map((item, i) => (
            <div key={item}>
              <span>{i + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
    </PageShell>
  );
}