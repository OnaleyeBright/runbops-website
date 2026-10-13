import {
  Button,
  Link,
  Logo,
} from "../common/navigation";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-cta">
          <div className="footer-cta-title">
            <div className="footer-eyebrow">
              <span>✦</span> Let's work together
            </div>

            <h2>
              Let's build a business
              <br />
              that runs better.
            </h2>
          </div>

          <div className="footer-cta-action">
            <span className="footer-mint-star">✦</span>

            <p>
              Bring us the bottleneck, the bold idea, or the system that no
              longer fits. We'll help you find a better way forward.
            </p>

            <Button to="/contact" variant="yellow">
              Start a project
            </Button>

            <svg
              className="footer-drawn-arrow"
              viewBox="0 0 150 90"
              aria-hidden="true"
            >
              <path d="M8 13c34 4 67 18 76 42 7 19-9 27-27 16" />
              <path d="m62 60-8 12 14 3" />
            </svg>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-navigation">
          <div className="footer-brand">
            <Logo />

            <p>
              We build the systems
              <br />
              that run your business.
            </p>
          </div>

          <div className="footer-column">
            <strong>Services</strong>

            <Link to="/services/crm">CRM Solutions</Link>
            <Link to="/services/erp">ERP Solutions</Link>
            <Link to="/services/ai-agents">AI Agent Deployment</Link>
            <Link to="/services/marketing">
              Marketing & Automation
            </Link>
          </div>

          <div className="footer-column">
            <strong>Company</strong>

            <Link to="/about">About</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/team">Team</Link>
            <Link to="/contact">Contact</Link>
          </div>

          
<div className="footer-column">
  <strong>Connect</strong>

  <a
    href="https://youtube.com/@runbops"
    target="_blank"
    rel="noopener noreferrer"
  >
    YouTube
  </a>

  <a
    href="https://instagram.com/runbopsofficial"
    target="_blank"
    rel="noopener noreferrer"
  >
    Instagram
  </a>

  <a
    href="https://x.com/runbopsofficial"
    target="_blank"
    rel="noopener noreferrer"
  >
    X / Twitter
  </a>

  <a href="mailto:hello@runbops.com">
    hello@runbops.com
  </a>
</div>

        </div>

        <div className="footer-divider" />

        <div
          className="footer-wordmark"
          aria-label="Runbops"
        >
          RUNBOPS
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Runbops. All rights reserved.
          </span>

          <span>
            Developed by{" "}
            
<a
  className="developer-credit"
  href="https://instagram.com/onaleyebright"
  target="_blank"
  rel="noopener noreferrer"
>
  Onaleye Bright <i>↗</i>
</a>

          </span>

          <span>
            <a href="#privacy">Privacy Policy</a>
            <b>·</b>
            <a href="#terms">Terms of Service</a>
          </span>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Back to top <i>↑</i>
          </button>
        </div>

      </div>
    </footer>
  );
}