import { Button } from "./navigation";
import Eyebrow from "./Eyebrow";

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="cta-star">✦</div>

      <Eyebrow>Let's make it work better</Eyebrow>

      <h2>
        Your business can
        <br />
        <span>run smarter.</span>
      </h2>

      <p>
        Let's build the systems, automations, and technology your business
        needs to operate and grow.
      </p>

      <div>
        <Button to="/contact" variant="yellow">
          Book a consultation
        </Button>

        <Button to="/contact" variant="light">
          Contact Runbops
        </Button>
      </div>
    </section>
  );
}