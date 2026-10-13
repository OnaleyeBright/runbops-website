const defaultTechnologies = [
  "Zoho",
  "HubSpot",
  "Pipedrive",
  "Odoo",
  "OpenAI",
  "Klaviyo",
  "Mailchimp",
  "Make",
];

export default function LogoMarquee({
  items = defaultTechnologies,
}: {
  items?: string[];
}) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}