import { useState, type FormEvent } from "react";
import Eyebrow from "../components/common/Eyebrow";
import { Button, Icon } from "../components/common/navigation";
import PageShell from "../components/layout/PageShell";
import { supabase } from "../services/supabase";
export default function Contact() {
  const [state, setState] =
    useState<"idle" | "loading" | "success">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (state === "loading") return;

  setState("loading");

  const form = e.currentTarget;
  const formData = new FormData(form);

  
  // Basic honeypot spam detection
  const honeypot = String(
    formData.get("website_url") ?? ""
  ).trim();

  if (honeypot) {
    // Avoid sending suspicious submissions to Supabase.
    setState("success");
    return;
  }


  const contactMethods = formData
    .getAll("contactMethod")
    .map(String);

  const lead = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    service: String(formData.get("service") ?? "").trim(),
    budget: String(formData.get("budget") ?? "").trim(),
    timeline: String(formData.get("timeline") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    contact_methods: contactMethods,
  };

  try {
    const { error } = await supabase
      .from("contact_leads")
      .insert(lead);

    if (error) {
      console.error("Contact form submission failed:", error);
      throw error;
    }

    setState("success");
  } catch {
    setState("idle");
    window.alert(
      "Your request could not be sent. Please try again."
    );
  }
}

  return (
    <PageShell>
      <section className="contact-page">
        <div className="contact-intro">
          <Eyebrow>Start a project</Eyebrow>

          <h1>
            Let's improve how your business{" "}
            <span className="marker-circle">runs.</span>
          </h1>

          <p>
            Tell us what isn't working, what you're trying to improve,
            or where you want to grow.
          </p>

          <div className="contact-details">
            <div>
              <span>EMAIL</span>
              <a href="mailto:hello@runbops.com">
                hello@runbops.com
              </a>
            </div>

            <div>
              <span>RESPONSE TIME</span>
              <p>Within one business day</p>
            </div>

            <div>
              <span>AVAILABILITY</span>
              <p>Projects starting this quarter</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrap">
          {state === "success" ? (
            <div className="success-state">
              <span>
                <Icon name="check" size={34} />
              </span>

              <h2>Thanks for reaching out.</h2>

              <p>
                We've received your request and will get back to you
                shortly.
              </p>

              <Button
                onClick={() => setState("idle")}
                variant="outline"
              >
                Send another request
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="contact-form">
              
  {/* Honeypot field for basic spam detection */}
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      left: "-9999px",
      width: "1px",
      height: "1px",
      overflow: "hidden",
    }}
  >
    <label htmlFor="website_url">
      Leave this field empty
    </label>
    <input
      id="website_url"
      name="website_url"
      type="text"
      tabIndex={-1}
      autoComplete="off"
    />
  </div>

              <div className="form-heading">
                <span>PROJECT REQUEST</span>
                <p>Fields marked * are required</p>
              </div>

              <label>
  Full name *
  <input
    required
    name="name"
    minLength={2}
    maxLength={150}
    placeholder="Your name"
  />
</label>

              
<label>
  Business email *
  <input
    required
    name="email"
    type="email"
    minLength={5}
    maxLength={254}
    placeholder="you@company.com"
  />
</label>


              <div className="form-pair">
                
<label>
  Company name
  <input
    name="company"
    maxLength={150}
    placeholder="Company"
  />
</label>


                
<label>
  Phone number
  <input
    name="phone"
    type="tel"
    maxLength={40}
    placeholder="+234 000 000 0000"
  />
</label>

              </div>

              <label>
                Service needed *
                <select
                  required
                  name="service"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>CRM Solutions</option>
                  <option>ERP Solutions</option>
                  <option>AI Agent Deployment</option>
                  <option>Marketing & Automation</option>
                  <option>Multiple services</option>
                  <option>Not sure yet</option>
                </select>
              </label>

              <div className="form-pair">
                <label>
                  Budget range
                  <select name="budget" defaultValue="">
                    <option value="">Select budget</option>
                    <option>$5k – $15k</option>
                    <option>$15k – $30k</option>
                    <option>$30k+</option>
                  </select>
                </label>

                <label>
                  Timeline
                  <select name="timeline" defaultValue="">
                    <option value="">Select timeline</option>
                    <option>Within 1 month</option>
                    <option>1–3 months</option>
                    <option>3–6 months</option>
                  </select>
                </label>
              </div>

              
<label>
  Tell us about your project *
  <textarea
    required
    name="message"
    rows={5}
    minLength={10}
    maxLength={5000}
    placeholder="What would you like to improve?"
  />
</label>


              <fieldset>
                <legend>Preferred contact method</legend>

                <label>
                  <input
                    type="checkbox"
                    name="contactMethod"
                    value="email"
                    defaultChecked
                  />
                  Email
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="contactMethod"
                    value="phone"
                  />
                  Phone
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="contactMethod"
                    value="whatsapp"
                  />
                  WhatsApp
                </label>
              </fieldset>

              <Button
                type="submit"
                variant="dark"
              >
                {state === "loading"
                  ? "Sending request..."
                  : "Send project request"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}