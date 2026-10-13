import { Icon } from "../common/navigation";

export default function OperationsVisual() {
  return (
    <div className="operations-wrap">
      <div className="scribble-note">
        One connected
        <br />
        operation <span>↘</span>
      </div>

      <div className="operations-card">
        <div className="ops-header">
          <span>RUNBOPS / SYSTEM MAP</span>
          <span className="live-dot">LIVE</span>
        </div>

        <div className="ops-core">
          <div className="core-orbit">
            <span>R</span>
          </div>
          <p>Runbops Core</p>
          <small>All systems synchronized</small>
        </div>

        <div className="system-node node-crm">
          <Icon name="crm" />
          <span>
            <b>CRM</b>
            <small>Customers</small>
          </span>
        </div>

        <div className="system-node node-erp">
          <Icon name="erp" />
          <span>
            <b>ERP</b>
            <small>Operations</small>
          </span>
        </div>

        <div className="system-node node-ai">
          <Icon name="ai" />
          <span>
            <b>AI</b>
            <small>Intelligence</small>
          </span>
        </div>

        <div className="system-node node-growth">
          <Icon name="growth" />
          <span>
            <b>Marketing</b>
            <small>Growth</small>
          </span>
        </div>

        <svg
          className="connections"
          viewBox="0 0 600 480"
          preserveAspectRatio="none"
        >
          <path d="M295 235 C210 160 170 140 104 120" />
          <path d="M305 230 C400 150 440 140 504 112" />
          <path d="M290 250 C220 325 175 340 110 365" />
          <path d="M310 250 C395 325 445 340 510 365" />
        </svg>

        <div className="ops-stat">
          <span>Automations today</span>
          <b>1,248</b>
          <i>+18%</i>
        </div>
      </div>

      <div className="shape-star">✦</div>
    </div>
  );
}