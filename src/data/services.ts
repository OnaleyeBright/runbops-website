export type Service = {
  key: string;
  number: string;
  title: string;
  short: string;
  copy: string;
  tools: string;
};

export const serviceData: Service[] = [
  {
    key: "crm",
    number: "01",
    title: "CRM Solutions",
    short: "Customer systems",
    copy: "Build a CRM your team will actually use. We design, integrate, and automate it around your sales process.",
    tools: "Zoho · HubSpot · Pipedrive",
  },
  {
    key: "erp",
    number: "02",
    title: "ERP Solutions",
    short: "Connected operations",
    copy: "Connect finance, inventory, sales, and operations through one scalable source of truth.",
    tools: "Odoo · NetSuite · Dynamics",
  },
  {
    key: "ai-agents",
    number: "03",
    title: "AI Agent Deployment",
    short: "Intelligent automation",
    copy: "Deploy useful AI agents that support customers, qualify leads, and help your team move faster.",
    tools: "OpenAI · Claude · n8n",
  },
  {
    key: "marketing",
    number: "04",
    title: "Marketing & Automation",
    short: "Measurable growth",
    copy: "Turn leads into customers with automated journeys, better data, and intelligent workflows.",
    tools: "Klaviyo · Mailchimp · Make",
  },
];
export type ServiceDetail = {
  title: string;
  description: string;
  color: string;
  capabilities: string[];
  process: string[];
  tools: string[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  crm: {
    title: "Turn your CRM into your business growth engine.",
    description:
      "We design, implement, migrate, customize, and automate CRM systems around the way your business actually works.",
    color: "yellow",
    capabilities: [
      "CRM strategy",
      "Setup & implementation",
      "Data migration",
      "Sales pipeline design",
      "Workflow automation",
      "Lead management",
      "Customer segmentation",
      "Reporting & dashboards",
      "Third-party integrations",
    ],
    process: [
      "Discovery",
      "Data architecture",
      "Configuration",
      "Migration",
      "Automation",
      "Testing",
      "Training",
      "Optimization",
    ],
    tools: ["Zoho One", "Zoho CRM", "HubSpot", "Pipedrive", "GoHighLevel"],
  },

  erp: {
    title: "Connect your operations in one intelligent system.",
    description:
      "Bring finance, inventory, sales, procurement, and delivery together with ERP that scales as you grow.",
    color: "mint",
    capabilities: [
      "Inventory management",
      "Finance",
      "Sales",
      "Procurement",
      "Operations",
      "Customer management",
      "Reporting",
      "Workflow automation",
      "System integration",
    ],
    process: [
      "Process audit",
      "Architecture",
      "Configuration",
      "Migration",
      "Integration",
      "Testing",
      "Training",
      "Support",
    ],
    tools: ["Odoo", "Zoho", "Oracle NetSuite", "SAP", "Microsoft Dynamics"],
  },

  "ai-agents": {
    title: "Put AI to work inside your business.",
    description:
      "Deploy AI agents that answer questions, qualify leads, support customers, automate workflows, and assist your team.",
    color: "lavender",
    capabilities: [
      "Customer support agents",
      "Lead qualification",
      "Knowledge assistants",
      "Sales assistants",
      "AI chatbots",
      "Document processing",
      "Workflow agents",
      "AI-integrated CRM",
      "Custom AI workflows",
    ],
    process: [
      "Use case mapping",
      "Knowledge design",
      "Agent build",
      "Tool connection",
      "Guardrails",
      "Testing",
      "Deployment",
      "Iteration",
    ],
    tools: ["OpenAI", "Claude", "Gemini", "n8n", "Make", "Zapier"],
  },

  marketing: {
    title: "Turn attention into measurable growth.",
    description:
      "Create connected, data-led journeys that nurture demand and turn more of the right leads into customers.",
    color: "pink",
    capabilities: [
      "Marketing automation",
      "Email marketing",
      "Lead nurturing",
      "Customer journeys",
      "Campaign management",
      "CRM integration",
      "Segmentation",
      "Analytics",
      "Conversion optimization",
    ],
    process: [
      "Audience",
      "Journey design",
      "Data setup",
      "Campaign build",
      "Automation",
      "Launch",
      "Measurement",
      "Iteration",
    ],
    tools: [
      "HubSpot",
      "Mailchimp",
      "Klaviyo",
      "Brevo",
      "Google Analytics",
      "Meta",
    ],
  },
};