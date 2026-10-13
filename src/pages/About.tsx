import Eyebrow from "../components/common/Eyebrow";
import FinalCTA from "../components/common/FinalCTA";
import InnerHero from "../components/common/InnerHero";
import SectionHeading from "../components/common/SectionHeading";
import PageShell from "../components/layout/PageShell";
import { photos } from "../data/photos";

export default function About() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="About Runbops"
        title={
          <>
            We make businesses{" "}
            <span className="marker-circle">easier</span> to run.
          </>
        }
        copy="We combine operational strategy with hands-on technology implementation, creating systems people actually want to use."
        image={photos.team}
      />

      <section className="editorial-story">
        <span className="big-number">01</span>

        <div>
          <Eyebrow>Why we exist</Eyebrow>
          <h2>
            Technology should simplify operations—not complicate them.
          </h2>
        </div>

        <div>
          <p>
            Too many businesses are held back by systems that don't speak to
            each other. Teams compensate with spreadsheets, manual handoffs,
            and heroic effort.
          </p>

          <p>
            Runbops started with a simple belief: technology only creates value
            when it improves the way people work. So we begin with the
            business, not the software.
          </p>
        </div>
      </section>

      <section className="values-section">
        <SectionHeading
          eyebrow="How we think"
          title="Built on practical principles."
        />

        <div className="values-grid">
          {[
            "Business-first thinking",
            "Automation-first execution",
            "Scalable architecture",
            "Long-term partnerships",
            "Measurable improvement",
          ].map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              <h3>{x}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="photo-band">
        <img
          src={photos.workshop}
          alt="A collaborative strategy workshop"
        />

        <div>
          <Eyebrow>Our mission</Eyebrow>
          <h2>
            Make powerful operations accessible to every ambitious business.
          </h2>
          <p>
            From first workshop to ongoing optimization, we work alongside
            your team—not from a distant black box.
          </p>
        </div>
      </section>

      <FinalCTA />
    </PageShell>
  );
}