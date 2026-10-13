import { photos } from "./photos";

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  service: string;
  result: string;
  copy: string;
  image: string;
  color: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "healthcare-crm",
    title: "A healthier sales system",
    industry: "Healthcare",
    service: "CRM + Automation",
    result: "60% less manual follow-up",
    copy: "Centralized 5,000+ customer records and made every follow-up visible.",
    image: photos.workshop,
    color: "yellow",
  },
  {
    slug: "retail-operations",
    title: "From stock-outs to clarity",
    industry: "Retail",
    service: "ERP + Data",
    result: "3× faster reporting",
    copy: "Connected inventory, purchasing, and finance across five locations.",
    image: photos.strategy,
    color: "mint",
  },
  {
    slug: "b2b-lead-engine",
    title: "An always-on lead engine",
    industry: "Professional services",
    service: "AI + Marketing",
    result: "35% faster response",
    copy: "Built a qualification agent that routes every enquiry to the right person.",
    image: photos.meeting,
    color: "lavender",
  },
];