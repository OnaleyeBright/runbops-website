import CaseCard from "../components/case-studies/CaseCard";
import Eyebrow from "../components/common/Eyebrow";
import FinalCTA from "../components/common/FinalCTA";
import SectionHeading from "../components/common/SectionHeading";
import { Button, Icon } from "../components/common/navigation";
import PageShell from "../components/layout/PageShell";
import LogoMarquee from "../components/services/LogoMarquee";
import OperationsVisual from "../components/services/OperationsVisual";
import ServiceCard from "../components/services/ServiceCard";
import { cases } from "../data/caseStudies";
import { photos } from "../data/photos";
import { serviceData } from "../data/services";

export default function Home() {
  return (
    <PageShell>
      <section className="hero">
        <div className="hero-copy">
          <Eyebrow>Business operations · Automation · Growth</Eyebrow>

          <h1>
            We build the systems that{" "}
            <span className="marker-circle">run</span> your business.
          </h1>

          <p>
            Runbops streamlines operations, automates repetitive work, and
            accelerates growth through CRM, ERP, AI, and marketing solutions.
          </p>

          <div className="hero-actions">
            <Button to="/contact" variant="dark">
              Book a consultation
            </Button>

            <Button to="/services" variant="outline">
              Explore our services
            </Button>
          </div>

          <div className="hero-proof">
            <div className="avatars">
              <img src={photos.team} alt="" />
              <span>+30</span>
            </div>

            <p>
              <b>Systems delivered</b>
              <br />
              for ambitious businesses
            </p>
          </div>
        </div>

        <OperationsVisual />
      </section>

      <section className="tech-strip">
        <p>Powering better operations with leading technology</p>
        <LogoMarquee />
      </section>

      <section className="section services-section">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Technology that makes your business{" "}
              <span className="marker-underline">easier to run.</span>
            </>
          }
        />

        <div className="services-grid">
          {serviceData.map((service) => (
            <ServiceCard
              key={service.key}
              service={service}
            />
          ))}
        </div>
      </section>

      <section className="problem-section">
        <div className="problem-copy">
          <Eyebrow>The operational gap</Eyebrow>

          <h2>
            Your business shouldn't depend on disconnected tools and manual
            work.
          </h2>

          <p>
            When data lives everywhere, nobody sees the full picture. We turn
            fragmented tools into one well-run operation.
          </p>

          <ul>
            {[
              "Customer data scattered across platforms",
              "Leads falling through the cracks",
              "Slow, repetitive internal processes",
              "No clear view of business performance",
            ].map((item) => (
              <li key={item}>
                <span>
                  <Icon name="close" size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flow-panel">
          <div className="flow-title">
            <span>Runbops connects the pieces.</span>
            <small>LIVE WORKFLOW</small>
          </div>

          {[
            "Lead generated",
            "CRM",
            "AI qualification",
            "Sales pipeline",
            "ERP / Operations",
            "Reporting",
          ].map((item, index) => (
            <div className="flow-step" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{item}</b>
              {index < 5 && <i>↓</i>}
            </div>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <SectionHeading
          eyebrow="Our approach"
          title="From messy operations to scalable systems."
          copy="Business-first thinking, technology that fits, and a partner who stays for the optimization."
        />

        <div className="timeline">
          {[
            [
              "01",
              "Discover",
              "We understand your processes, tools, bottlenecks, and goals.",
            ],
            [
              "02",
              "Design",
              "We map the systems, integrations, and workflows you really need.",
            ],
            [
              "03",
              "Implement",
              "We configure, migrate, automate, test, and train your team.",
            ],
            [
              "04",
              "Optimize",
              "We monitor performance and keep improving the operation.",
            ],
          ].map(([number, title, copy]) => (
            <div className="timeline-step" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section work-section">
        <div className="section-split">
          <SectionHeading
            eyebrow="Our work"
            title="Systems we've helped transform."
          />

          <Button to="/case-studies" variant="outline">
            View all work
          </Button>
        </div>

        <div className="case-grid">
          {cases.map((item) => (
            <CaseCard
              item={item}
              key={item.slug}
            />
          ))}
        </div>
      </section>

      <section className="metrics-section">
        {[
          ["50+", "Workflows automated"],
          ["30+", "Business systems implemented"],
          ["10+", "Technology platforms"],
          ["1,000+", "Manual hours eliminated"],
        ].map(([number, label]) => (
          <div className="metric" key={label}>
            <strong>{number}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="testimonial-section">
        <div className="testimonial-image">
          <img
            src={photos.meeting}
            alt="Team discussing an operations project"
          />

          <span className="image-label">
            A partnership, not a handoff.
          </span>
        </div>

        <div className="quote">
          <span className="quote-mark">“</span>

          <blockquote>
            Runbops didn't just install software. They understood how our teams
            work, then built a system that made sense to everyone.
          </blockquote>

          <div className="quote-person">
            <span>AM</span>

            <p>
              <b>Amelia Morgan</b>
              <br />
              COO, North & Alder
            </p>
          </div>

          <div className="quote-nav">
            <button aria-label="Previous">←</button>
            <button aria-label="Next">→</button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </PageShell>
  );
}