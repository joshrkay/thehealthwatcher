// Single source of truth for the homepage's SEO metadata and structured data.
// Consumed at runtime by the <SEO> component in App.jsx and at build time by
// scripts/prerender-home.mjs, which bakes these tags into dist/index.html so
// the homepage is fully crawlable without executing JavaScript.

export const serviceAreas = [
  "Michigan-based partners",
  "Metro Detroit",
  "Southeast Michigan",
  "Senior living communities",
  "Patient homes",
  "Facility-based care settings",
];

export const faqs = [
  {
    question: "What does The Health Watchers do?",
    answer:
      "The Health Watchers is a population health medical care partner that supports high-needs patients through in-home medical visits, telemedicine, senior living medical support, care gap closure, and coordinated clinical workflows.",
  },
  {
    question: "Who does The Health Watchers serve?",
    answer:
      "The Health Watchers partners with population health organizations, physician groups, skilled nursing facilities, assisted living communities, independent living communities, continuing care retirement communities, and organizations caring for complex patient populations.",
  },
  {
    question: "Do medical professionals visit patients at home?",
    answer:
      "Where appropriate and available, medical professionals can support in-home or onsite visits for patients in their home, senior living community, or facility setting. Services are coordinated based on patient need, provider oversight, licensure, availability, and applicable regulatory requirements.",
  },
  {
    question: "Does The Health Watchers provide telemedicine?",
    answer:
      "Yes. The Health Watchers can support virtual medical visits and telemedicine follow-up to help patients, families, facilities, and care teams receive timely clinical guidance between in-person encounters.",
  },
  {
    question: "Where is The Health Watchers located?",
    answer:
      "The Health Watchers works with partners serving patients in home-based, senior living, and community-based care settings across Michigan and partner-defined service areas.",
  },
];

export const homeMeta = {
  title: "The Health Watchers | Population Health In-Home Medical Care",
  description:
    "The Health Watchers provides population health in-home medical visits, telemedicine support, senior living medical care, care gap closure, and clinical coordination for high-needs patients.",
  canonical: "https://thehealthwatchers.com/",
  robots: "index, follow, max-image-preview:large",
  keywords:
    "population health medical care, in-home medical visits, home-based medical care, telemedicine support, senior living medical support, care gap closure, high-risk patient care, Michigan healthcare, Metro Detroit in-home medical care",
  ogSiteName: "The Health Watchers",
  twitterCard: "summary_large_image",
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "The Health Watchers",
  url: "https://thehealthwatchers.com",
  telephone: "+1-248-716-5130",
  email: "skay@thehealthwatchers.com",
  description:
    "The Health Watchers provides population health medical care, in-home medical visits, telemedicine support, senior living medical support, care gap closure, and coordinated clinical workflows for high-needs patients.",
  areaServed: serviceAreas,
  medicalSpecialty: ["PrimaryCare", "Geriatric", "CommunityHealth"],
  knowsAbout: [
    "population health",
    "in-home medical care",
    "telemedicine",
    "senior living medical support",
    "care gap closure",
    "high-risk patient support",
    "home-based care coordination",
  ],
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Population health in-home medical care",
  provider: {
    "@type": "MedicalOrganization",
    name: "The Health Watchers",
    url: "https://thehealthwatchers.com",
  },
  serviceType:
    "In-home medical visits, telemedicine, care gap closure, and senior living medical support",
  areaServed: serviceAreas,
  audience: [
    "Population health organizations",
    "Physician groups",
    "Skilled nursing facilities",
    "Assisted living communities",
    "Independent living communities",
    "Senior care operators",
  ],
  description:
    "The Health Watchers helps population health organizations, physician groups, and senior care operators deliver medical support where patients live through in-home visits, virtual care, care gap closure, and clinical coordination.",
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

// Head metadata, keyed by a stable selector, so both the runtime component and
// the prerender step emit exactly the same tags.
export const homeMetaTags = [
  { selector: 'meta[name="description"]', attrs: { name: "description", content: homeMeta.description } },
  { selector: 'meta[name="robots"]', attrs: { name: "robots", content: homeMeta.robots } },
  { selector: 'meta[name="keywords"]', attrs: { name: "keywords", content: homeMeta.keywords } },
  { selector: 'meta[property="og:title"]', attrs: { property: "og:title", content: homeMeta.title } },
  { selector: 'meta[property="og:description"]', attrs: { property: "og:description", content: homeMeta.description } },
  { selector: 'meta[property="og:type"]', attrs: { property: "og:type", content: "website" } },
  { selector: 'meta[property="og:url"]', attrs: { property: "og:url", content: homeMeta.canonical } },
  { selector: 'meta[property="og:site_name"]', attrs: { property: "og:site_name", content: homeMeta.ogSiteName } },
  { selector: 'meta[name="twitter:card"]', attrs: { name: "twitter:card", content: homeMeta.twitterCard } },
  { selector: 'meta[name="twitter:title"]', attrs: { name: "twitter:title", content: homeMeta.title } },
  { selector: 'meta[name="twitter:description"]', attrs: { name: "twitter:description", content: homeMeta.description } },
];

export const homeLinkTags = [
  { selector: 'link[rel="canonical"]', attrs: { rel: "canonical", href: homeMeta.canonical } },
];

export const homeJsonLd = [
  { id: "health-watchers-organization-schema", data: organizationSchema },
  { id: "health-watchers-service-schema", data: serviceSchema },
  { id: "health-watchers-faq-schema", data: faqSchema },
];
