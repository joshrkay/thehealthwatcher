/**
 * Static SEO page generator for The Health Watchers.
 *
 * Produces fully server-rendered, crawlable HTML pages under public/ so search
 * engines see complete content without executing JavaScript. Two page families
 * are generated:
 *
 *   1. GEO-targeted service-area pages for communities across Metro Detroit
 *      (/service-areas/<city>/) plus a hub index (/service-areas/).
 *   2. Service explanation pages (/services/<service>/) plus a hub index
 *      (/services/).
 *
 * It also emits robots.txt and sitemap.xml. Run with: npm run seo
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");

const SITE = {
  name: "The Health Watchers",
  domain: "https://thehealthwatchers.com",
  phoneDisplay: "248-716-5130",
  phoneHref: "tel:2487165130",
  email: "skay@thehealthwatchers.com",
  theme: "#0F4C5C",
};

// --------------------------------------------------------------------------
// Data
// --------------------------------------------------------------------------

const services = [
  {
    slug: "in-home-medical-visits",
    title: "In-Home Medical Visits",
    short: "Medical visits delivered where patients live",
    metaDescription:
      "In-home medical visits from The Health Watchers bring medical professionals to high-needs patients at home, helping population health partners support people who struggle to reach office-based care.",
    keywords:
      "in-home medical visits, home-based medical care, house call medical visits, in-home physician support, home medical care Michigan",
    intro:
      "In-home medical visits bring clinical care directly to the patient's residence, helping partners support high-needs individuals who may struggle to access traditional office-based care.",
    what:
      "Our in-home medical visit model lets medical professionals see patients where they actually live — at home, in an apartment, or in a family member's residence. For patients managing multiple chronic conditions, mobility limitations, transportation barriers, or cognitive challenges, the trip to a clinic is often the single biggest obstacle to consistent care. Bringing the visit to them removes that obstacle and creates a more accurate picture of the patient's day-to-day reality.",
    who:
      "We support population health organizations, physician groups, ACOs, MSOs, and senior care operators who are accountable for patients that the clinic model has trouble reaching. If your panel includes homebound members, recently discharged patients, or individuals who repeatedly miss appointments, in-home visits help you re-engage them on their terms.",
    how: [
      "We help identify which patients on your panel are the best fit for an in-home visit based on risk, recent utilization, and access barriers.",
      "We coordinate scheduling, outreach, and documentation expectations so each visit fits cleanly into your existing workflow.",
      "A medical professional conducts the visit in the home, assessing the patient, the environment, medications, and care gaps.",
      "Findings, follow-up needs, and any escalations are routed back to your care team with clear documentation.",
    ],
    benefits: [
      "Re-engage patients who repeatedly miss office appointments",
      "Capture a more complete picture of the home environment and medication reality",
      "Reduce avoidable emergency department visits and readmissions",
      "Support care gap closure and documentation in one encounter",
    ],
    faqs: [
      [
        "What happens during an in-home medical visit?",
        "A medical professional assesses the patient in their home — reviewing conditions, medications, the home environment, and any open care gaps — then routes findings and follow-up needs back to the partner's care team with documentation.",
      ],
      [
        "Who is a good candidate for in-home visits?",
        "Patients with chronic conditions, mobility limitations, transportation barriers, recent hospital discharges, or a pattern of missed appointments are often strong candidates. We help partners identify the right members from their panel.",
      ],
      [
        "How do in-home visits fit with our existing care team?",
        "In-home visits are designed to extend, not replace, your care team. We align on eligibility, documentation, communication, and escalation rules so visit findings flow back into your workflow.",
      ],
    ],
  },
  {
    slug: "telemedicine-support",
    title: "Telemedicine Support",
    short: "Virtual visits and follow-up between in-person care",
    metaDescription:
      "Telemedicine support from The Health Watchers gives patients, families, facilities, and care teams timely virtual medical guidance and follow-up between in-person encounters.",
    keywords:
      "telemedicine support, virtual medical visits, telehealth follow-up, remote patient support, virtual care Michigan",
    intro:
      "Telemedicine support provides virtual medical visits and follow-up that help patients, families, facilities, and care teams get timely clinical guidance between in-person encounters.",
    what:
      "Telemedicine closes the gap between scheduled in-person visits. When a patient's condition changes, a question comes up, or a facility needs guidance, a virtual visit can provide a timely clinical touchpoint without waiting days for the next appointment. For high-needs populations, that responsiveness can be the difference between a small adjustment and an avoidable escalation.",
    who:
      "Telemedicine support helps physician groups, population health teams, senior living operators, families, and facility staff who need a faster way to reach a medical professional between routine appointments. It is especially valuable for patients in settings where on-site clinical coverage is limited.",
    how: [
      "We coordinate virtual visit access for patients, families, and facility teams based on your program design.",
      "A medical professional connects with the patient or care partner to assess the situation and recommend a next step.",
      "When an in-person visit, escalation, or care gap closure is needed, we help route it appropriately.",
      "Visit activity and follow-up are documented and shared back with your care team.",
    ],
    benefits: [
      "Timely clinical guidance between in-person encounters",
      "Faster response when a patient's status changes",
      "Reduced unnecessary trips and avoidable escalations",
      "A virtual touchpoint for families and facility staff",
    ],
    faqs: [
      [
        "When is telemedicine the right option?",
        "Telemedicine is well suited to follow-up, triage of new symptoms, medication questions, and check-ins between in-person visits. When an in-person assessment is needed, we help coordinate the appropriate next step.",
      ],
      [
        "Can families and facility staff participate in virtual visits?",
        "Yes. Telemedicine support is designed to include families, caregivers, and facility teams so the people closest to the patient can take part in the conversation and the plan.",
      ],
      [
        "Does telemedicine replace in-home visits?",
        "No. Telemedicine and in-home visits work together. Virtual care handles timely follow-up and triage, while in-home visits provide hands-on assessment when it is needed.",
      ],
    ],
  },
  {
    slug: "population-health-coverage",
    title: "Population Health Coverage",
    short: "A clinical operating model for high-risk populations",
    metaDescription:
      "Population health coverage from The Health Watchers is a clinical operating model for organizations managing high-risk, underserved, and hard-to-reach populations across home, facility, and community settings.",
    keywords:
      "population health coverage, population health management, high-risk patient management, value-based care support, population health Michigan",
    intro:
      "Population health coverage is a clinical operating model for organizations managing high-risk, underserved, and hard-to-reach populations across home, facility, and community-based settings.",
    what:
      "Managing a population is different from managing a single visit. It requires consistent identification of who needs attention, repeatable workflows for outreach and follow-up, and visibility across the whole panel. Our population health model combines in-home visits, telemedicine, care gap closure, and reporting into one coordinated approach so partners can act proactively instead of reactively.",
    who:
      "This model is built for ACOs, MSOs, population health organizations, and physician groups accountable for outcomes, quality measures, and total cost of care across a defined population — particularly those with a high concentration of complex, underserved, or hard-to-reach members.",
    how: [
      "Identify the right patients using risk, utilization, and access signals.",
      "Build a repeatable care workflow covering eligibility, documentation, communication, and escalation.",
      "Engage and monitor patients through in-home visits, telemedicine, and outreach.",
      "Coordinate and escalate when patient needs change, with the right documentation.",
      "Report on activity, care gaps, trends, and opportunities to refine the program.",
    ],
    benefits: [
      "One coordinated model across home, facility, and community settings",
      "Proactive identification of patients who need attention",
      "Support for quality measures and care gap closure at scale",
      "Visibility into activity, risk, and program performance",
    ],
    faqs: [
      [
        "What is a population health operating model?",
        "It is a repeatable system for managing the health of a defined group of patients — identifying who needs care, delivering it consistently across settings, and measuring results — rather than reacting one visit at a time.",
      ],
      [
        "How does this support value-based care?",
        "By engaging high-risk members proactively, closing care gaps, and reducing avoidable escalations, population health coverage supports quality measures and total-cost-of-care goals central to value-based arrangements.",
      ],
      [
        "Can the model scale across a large panel?",
        "Yes. The combination of repeatable workflows, technology-enabled visibility, and a coordinated care team is designed to support populations rather than individual encounters.",
      ],
    ],
  },
  {
    slug: "care-gap-closure",
    title: "Care Gap Closure",
    short: "Find gaps and route the right next step",
    metaDescription:
      "Care gap closure from The Health Watchers helps partners identify patients who need follow-up, route the right next step, and close gaps before they become avoidable escalations.",
    keywords:
      "care gap closure, closing care gaps, quality measure gaps, HEDIS gap closure support, care gaps Michigan",
    intro:
      "Care gap closure supports identifying patients who need follow-up, routing the right next step, and helping partners close gaps before they become avoidable escalations.",
    what:
      "A care gap is any recommended service, screening, follow-up, or check-in that a patient is missing. Left open, gaps quietly compound — a missed follow-up becomes a worsening condition, which becomes an emergency visit. Care gap closure is the disciplined work of surfacing those gaps, prioritizing them, and making sure each one gets the right next step.",
    who:
      "Care gap closure helps physician groups, ACOs, MSOs, and population health teams accountable for quality measures and outcomes. It is especially valuable for partners managing large panels where gaps are easy to lose track of without a dedicated process.",
    how: [
      "We help surface open care gaps and follow-up needs across your population.",
      "Gaps are prioritized based on patient risk and clinical urgency.",
      "We route each gap to the right next step — an in-home visit, a virtual visit, outreach, or coordination with your team.",
      "Closure activity and documentation are reported back so progress is visible.",
    ],
    benefits: [
      "Surface follow-up needs before they escalate",
      "Prioritize gaps by patient risk and urgency",
      "Support quality measure performance",
      "Clear documentation of closure activity",
    ],
    faqs: [
      [
        "What counts as a care gap?",
        "A care gap is any recommended screening, follow-up, medication review, or check-in a patient is missing. Closing it means delivering or coordinating the appropriate next step.",
      ],
      [
        "How are care gaps prioritized?",
        "Gaps are prioritized by patient risk and clinical urgency so the most consequential follow-ups are addressed first, rather than treating every gap as equal.",
      ],
      [
        "How does care gap closure connect to visits?",
        "Once a gap is identified, we route it to the right channel — an in-home visit, a telemedicine visit, outreach, or coordination with your care team — and document the outcome.",
      ],
    ],
  },
  {
    slug: "senior-living-medical-support",
    title: "Senior Living Medical Support",
    short: "Clinical support for senior living and post-acute settings",
    metaDescription:
      "Senior living medical support from The Health Watchers provides in-facility visits, virtual follow-up, family communication, and provider coordination for senior living and post-acute communities.",
    keywords:
      "senior living medical support, assisted living medical care, skilled nursing clinical support, post-acute care coordination, senior care Michigan",
    intro:
      "Senior living medical support provides clinical support for senior living and post-acute settings, including in-facility visits, virtual follow-up, family communication, and provider coordination.",
    what:
      "Senior living and post-acute communities care for residents whose needs can change quickly, often without on-site clinical coverage around the clock. Our senior living medical support model brings in-facility visits and virtual follow-up to these settings, helping staff respond sooner, keep families informed, and coordinate with providers so residents get timely attention.",
    who:
      "This model supports skilled nursing facilities, assisted living communities, independent living communities, and continuing care retirement communities that want a more responsive way to support residents between physician visits.",
    how: [
      "We coordinate in-facility visits and virtual follow-up based on the community's needs.",
      "Medical professionals assess residents, support follow-up, and help determine the next step.",
      "Families are kept informed and included in the care conversation.",
      "Findings and escalations are coordinated with the resident's providers and the facility team.",
    ],
    benefits: [
      "A more responsive option between physician visits",
      "In-facility visits and virtual follow-up in one model",
      "Clearer communication with residents' families",
      "Coordination with providers and facility staff",
    ],
    faqs: [
      [
        "Which senior living settings do you support?",
        "We support skilled nursing facilities, assisted living communities, independent living communities, and continuing care retirement communities, with services tailored to each setting.",
      ],
      [
        "How does this help facility staff?",
        "By adding in-facility visits and virtual follow-up, the model gives staff a faster way to reach a medical professional, keep families informed, and coordinate with providers when a resident's status changes.",
      ],
      [
        "Are families included in the care process?",
        "Yes. Keeping families informed and included in the care conversation is a core part of senior living medical support.",
      ],
    ],
  },
  {
    slug: "program-visibility-reporting",
    title: "Program Visibility & Reporting",
    short: "Clear reporting on visits, gaps, and performance",
    metaDescription:
      "Program visibility and reporting from The Health Watchers gives partners clear reporting on visit activity, patient needs, care gaps, escalations, and program performance across their population.",
    keywords:
      "healthcare program reporting, population health reporting, care program analytics, care gap reporting, program visibility Michigan",
    intro:
      "Program visibility and reporting provides clear reporting that helps partners understand visit activity, patient needs, care gaps, escalations, and program performance across their population.",
    what:
      "A care program is only as strong as a partner's ability to see how it is performing. Our reporting turns visit activity, outreach, care gaps, and escalations into a clear picture of what is happening across the population — so partners can spot trends, identify what is working, and refine the program over time.",
    who:
      "Program visibility and reporting supports population health leaders, physician group administrators, and senior care operators who need to understand performance, demonstrate results, and make decisions based on real activity data.",
    how: [
      "We capture visit activity, outreach, care gaps, and escalations as the program runs.",
      "Activity is organized into clear reporting partners can actually use.",
      "Trends and opportunities are surfaced so the program can be refined.",
      "Reporting cadence is aligned with how your organization makes decisions.",
    ],
    benefits: [
      "A clear view of visit and outreach activity",
      "Visibility into care gaps, risk, and escalations",
      "Trends that inform program refinement",
      "Reporting aligned with your decision-making cadence",
    ],
    faqs: [
      [
        "What does the reporting cover?",
        "Reporting covers visit activity, outreach, care gaps, escalations, and overall program performance across the population, organized so partners can act on it.",
      ],
      [
        "How often is reporting provided?",
        "Reporting cadence is aligned with how your organization makes decisions, so the information arrives when it is most useful.",
      ],
      [
        "Can reporting help us improve the program?",
        "Yes. Surfacing trends and opportunities is a core purpose of the reporting — it is designed to help partners refine the program over time.",
      ],
    ],
  },
];

const locations = [
  {
    slug: "detroit",
    city: "Detroit",
    county: "Wayne County",
    lat: 42.3314,
    lng: -83.0458,
    nearby: ["dearborn", "southfield", "warren", "royal-oak"],
    blurb:
      "Detroit's neighborhoods include many older adults and high-needs residents who face real barriers to consistent, office-based medical care.",
  },
  {
    slug: "troy",
    city: "Troy",
    county: "Oakland County",
    lat: 42.6056,
    lng: -83.1499,
    nearby: ["royal-oak", "sterling-heights", "southfield", "warren"],
    blurb:
      "Troy and the surrounding Oakland County communities are home to a growing senior population and a number of senior living settings.",
  },
  {
    slug: "royal-oak",
    city: "Royal Oak",
    county: "Oakland County",
    lat: 42.4895,
    lng: -83.1446,
    nearby: ["troy", "southfield", "warren", "detroit"],
    blurb:
      "Royal Oak sits at the center of southern Oakland County, close to major hospitals and a dense mix of residential care settings.",
  },
  {
    slug: "southfield",
    city: "Southfield",
    county: "Oakland County",
    lat: 42.4734,
    lng: -83.2219,
    nearby: ["detroit", "royal-oak", "farmington-hills", "troy"],
    blurb:
      "Southfield's central location in Metro Detroit makes it a practical base for reaching high-needs patients across Oakland and Wayne counties.",
  },
  {
    slug: "dearborn",
    city: "Dearborn",
    county: "Wayne County",
    lat: 42.3223,
    lng: -83.1763,
    nearby: ["detroit", "southfield", "warren", "royal-oak"],
    blurb:
      "Dearborn and western Wayne County include diverse, multigenerational communities where in-home and virtual care can close real access gaps.",
  },
  {
    slug: "warren",
    city: "Warren",
    county: "Macomb County",
    lat: 42.4933,
    lng: -83.0277,
    nearby: ["sterling-heights", "troy", "royal-oak", "detroit"],
    blurb:
      "Warren is Macomb County's largest city, with a substantial older population and many residents managing chronic conditions at home.",
  },
  {
    slug: "sterling-heights",
    city: "Sterling Heights",
    county: "Macomb County",
    lat: 42.5803,
    lng: -83.0302,
    nearby: ["warren", "troy", "royal-oak", "detroit"],
    blurb:
      "Sterling Heights and northern Macomb County have a growing senior population that benefits from medical care delivered closer to home.",
  },
  {
    slug: "farmington-hills",
    city: "Farmington Hills",
    county: "Oakland County",
    lat: 42.4989,
    lng: -83.3677,
    nearby: ["southfield", "novi", "west-bloomfield", "troy"],
    blurb:
      "Farmington Hills is one of Oakland County's largest communities, with established senior living settings and a sizable homebound population.",
  },
  {
    slug: "novi",
    city: "Novi",
    county: "Oakland County",
    lat: 42.4806,
    lng: -83.4755,
    nearby: ["farmington-hills", "west-bloomfield", "southfield", "troy"],
    blurb:
      "Novi and western Oakland County have expanded rapidly, including senior living communities that benefit from responsive medical support.",
  },
  {
    slug: "west-bloomfield",
    city: "West Bloomfield",
    county: "Oakland County",
    lat: 42.5689,
    lng: -83.3835,
    nearby: ["farmington-hills", "novi", "southfield", "troy"],
    blurb:
      "West Bloomfield and the surrounding lakes-area communities include many older adults who prefer to receive care in the comfort of home.",
  },
];

const cityBySlug = Object.fromEntries(locations.map((l) => [l.slug, l]));
const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

// --------------------------------------------------------------------------
// HTML helpers
// --------------------------------------------------------------------------

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const jsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

const CSS = `
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#0f172a;background:#fff;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
*{box-sizing:border-box;}
body{margin:0;min-height:100vh;line-height:1.6;}
a{color:#0f4c5c;}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px;}
header.site{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(226,232,240,.7);}
header.site .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:12px;padding-bottom:12px;}
header.site img{height:56px;width:auto;}
.nav{display:flex;align-items:center;gap:22px;}
.nav a{font-size:14px;font-weight:600;color:#334155;text-decoration:none;}
.nav a:hover{color:#0f4c5c;}
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;background:#0f4c5c;color:#fff;font-weight:700;font-size:14px;padding:12px 20px;text-decoration:none;border:none;cursor:pointer;}
.btn:hover{background:#123f4b;}
.btn.ghost{background:#fff;color:#0f172a;border:1px solid #cbd5e1;}
.hero{background:#f7faf9;border-bottom:1px solid #e2e8f0;}
.hero .wrap{padding:64px 20px 56px;}
.eyebrow{margin:0 0 14px;color:#0f766e;font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;}
h1{margin:0;font-size:clamp(34px,5vw,56px);line-height:1.05;letter-spacing:-.04em;color:#020617;max-width:18ch;}
.lede{margin:22px 0 0;font-size:clamp(17px,2vw,20px);color:#475569;max-width:60ch;}
.cta-row{margin-top:30px;display:flex;flex-wrap:wrap;gap:12px;}
.crumbs{font-size:13px;color:#64748b;padding:16px 0;}
.crumbs a{color:#0f766e;text-decoration:none;}
section{padding:48px 0;}
section h2{font-size:clamp(26px,3.2vw,38px);letter-spacing:-.035em;margin:0 0 16px;color:#0f172a;}
section h3{font-size:20px;letter-spacing:-.02em;margin:0 0 10px;color:#0f172a;}
section p{color:#475569;font-size:17px;}
.grid{display:grid;gap:18px;}
@media(min-width:720px){.grid.cols-2{grid-template-columns:repeat(2,1fr);}.grid.cols-3{grid-template-columns:repeat(3,1fr);}}
.card{border:1px solid #e2e8f0;border-radius:24px;background:#fff;padding:26px;box-shadow:0 1px 2px rgba(15,23,42,.04);}
.card p{font-size:15px;margin:8px 0 0;}
ul.checks{list-style:none;margin:0;padding:0;display:grid;gap:12px;}
ul.checks li{display:flex;gap:12px;align-items:flex-start;color:#334155;font-size:16px;}
ul.checks li::before{content:"✓";color:#0f766e;font-weight:800;flex:0 0 auto;}
ol.steps{margin:0;padding:0;list-style:none;counter-reset:step;display:grid;gap:14px;}
ol.steps li{counter-increment:step;border:1px solid #e2e8f0;border-radius:18px;padding:18px 18px 18px 60px;position:relative;background:#fff;color:#334155;font-size:16px;}
ol.steps li::before{content:counter(step,decimal-leading-zero);position:absolute;left:18px;top:18px;color:#0f766e;font-weight:800;letter-spacing:.08em;}
.linkgrid{display:grid;gap:10px;grid-template-columns:1fr;}
@media(min-width:560px){.linkgrid{grid-template-columns:repeat(2,1fr);}}
@media(min-width:860px){.linkgrid{grid-template-columns:repeat(3,1fr);}}
.linkgrid a{display:block;border:1px solid #e2e8f0;border-radius:16px;padding:14px 16px;background:#f8fafc;text-decoration:none;color:#0f172a;font-weight:600;font-size:15px;}
.linkgrid a:hover{border-color:#94a3b8;background:#fff;}
.band{background:#0f4c5c;color:#fff;border-radius:28px;padding:40px;text-align:center;}
.band h2{color:#fff;}
.band p{color:rgba(255,255,255,.82);max-width:55ch;margin:12px auto 0;}
.band .cta-row{justify-content:center;}
.faq{border:1px solid #e2e8f0;border-radius:20px;background:#fff;padding:22px;}
.faq+.faq{margin-top:14px;}
.faq h3{margin:0 0 8px;font-size:18px;}
.faq p{margin:0;font-size:15px;}
.alt{background:#f7faf9;}
footer.site{background:#020617;color:#fff;padding:44px 0;margin-top:24px;}
footer.site .logo{display:inline-block;background:#fff;border-radius:16px;padding:10px;}
footer.site .logo img{height:54px;}
footer.site .flinks{display:flex;flex-wrap:wrap;gap:16px;margin-top:18px;}
footer.site .flinks a{color:#cbd5e1;font-size:14px;text-decoration:none;}
footer.site .flinks a:hover{color:#fff;}
footer.site .disc{border-top:1px solid rgba(255,255,255,.1);margin-top:26px;padding-top:18px;font-size:12px;color:#64748b;}
.hide-sm{display:none;}
@media(min-width:880px){.hide-sm{display:flex;}}
`;

function layout({
  title,
  description,
  canonicalPath,
  keywords,
  jsonLdBlocks = [],
  hero,
  body,
}) {
  const canonical = `${SITE.domain}${canonicalPath}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="${SITE.theme}" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
${keywords ? `<meta name="keywords" content="${esc(keywords)}" />` : ""}
<link rel="canonical" href="${canonical}" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/favicon.svg" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${canonical}" />
<meta property="og:site_name" content="${SITE.name}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<style>${CSS}</style>
${jsonLdBlocks.map(jsonLd).join("\n")}
</head>
<body>
<header class="site">
  <div class="wrap">
    <a href="/" aria-label="${SITE.name} home"><img src="/logo.svg" alt="${SITE.name}" /></a>
    <nav class="nav hide-sm" aria-label="Primary">
      <a href="/services/">Services</a>
      <a href="/service-areas/">Service Areas</a>
      <a href="/#care-model">Care Model</a>
      <a href="/#contact">Contact</a>
    </nav>
    <a class="btn" href="${SITE.phoneHref}">${SITE.phoneDisplay}</a>
  </div>
</header>
${hero}
<main>
${body}
</main>
<footer class="site">
  <div class="wrap">
    <span class="logo"><img src="/logo.svg" alt="${SITE.name}" /></span>
    <div class="flinks">
      <a href="/">Home</a>
      <a href="/services/">Services</a>
      <a href="/service-areas/">Service Areas</a>
      <a href="/#care-model">Care Model</a>
      <a href="/#about">About</a>
      <a href="/#contact">Contact</a>
      <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a>
    </div>
    <div class="disc">© ${new Date().getFullYear()} ${SITE.name}. All rights reserved. This website is for informational purposes only and should not be used for medical emergencies. Availability of in-home, onsite, and telemedicine services depends on partner program design, clinician availability, licensure, patient need, and applicable regulatory requirements.</div>
  </div>
</footer>
</body>
</html>`;
}

function hero({ eyebrow, h1, lede }) {
  return `<section class="hero"><div class="wrap">
  <p class="eyebrow">${esc(eyebrow)}</p>
  <h1>${esc(h1)}</h1>
  <p class="lede">${esc(lede)}</p>
  <div class="cta-row">
    <a class="btn" href="/#contact">Partner With Us</a>
    <a class="btn ghost" href="${SITE.phoneHref}">Call ${SITE.phoneDisplay}</a>
  </div>
</div></section>`;
}

function crumbs(items) {
  return `<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb">${items
    .map((it, i) =>
      it.href
        ? `<a href="${it.href}">${esc(it.label)}</a>${
            i < items.length - 1 ? " / " : ""
          }`
        : esc(it.label),
    )
    .join("")}</nav></div>`;
}

function faqSection(faqs) {
  return `<section class="alt"><div class="wrap">
  <h2>Frequently asked questions</h2>
  ${faqs
    .map(
      ([q, a]) =>
        `<div class="faq"><h3>${esc(q)}</h3><p>${esc(a)}</p></div>`,
    )
    .join("\n")}
</div></section>`;
}

function ctaBand(text) {
  return `<section><div class="wrap"><div class="band">
  <h2>Let's build a more proactive care model.</h2>
  <p>${esc(text)}</p>
  <div class="cta-row">
    <a class="btn ghost" href="/#contact">Partner With Us</a>
    <a class="btn" href="${SITE.phoneHref}" style="background:#fff;color:#0f4c5c;">Call ${SITE.phoneDisplay}</a>
  </div>
</div></div></section>`;
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: `${SITE.domain}${it.href}`,
    })),
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// --------------------------------------------------------------------------
// Page builders
// --------------------------------------------------------------------------

function buildServicePage(s) {
  const path = `/services/${s.slug}/`;
  const title = `${s.title} | ${SITE.name}`;
  const crumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/" },
    { label: s.title, href: path },
  ];

  const relatedServices = services.filter((x) => x.slug !== s.slug);

  const body = `
${crumbs(crumbItems)}
<section><div class="wrap">
  <div class="grid cols-2">
    <div>
      <h2>What it is</h2>
      <p>${esc(s.what)}</p>
    </div>
    <div>
      <h2>Who it helps</h2>
      <p>${esc(s.who)}</p>
    </div>
  </div>
</div></section>

<section class="alt"><div class="wrap">
  <h2>How it works</h2>
  <ol class="steps">${s.how.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>
</div></section>

<section><div class="wrap">
  <h2>Benefits for partners</h2>
  <ul class="checks">${s.benefits.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
</div></section>

${faqSection(s.faqs)}

<section><div class="wrap">
  <h2>Explore related services</h2>
  <div class="linkgrid">
    ${relatedServices
      .map((x) => `<a href="/services/${x.slug}/">${esc(x.title)}</a>`)
      .join("")}
  </div>
  <h2 style="margin-top:40px;">Where we work</h2>
  <p>${esc(s.title)} is available to partners across Metro Detroit and Southeast Michigan.</p>
  <div class="linkgrid">
    ${locations
      .map(
        (l) =>
          `<a href="/service-areas/${l.slug}/">${esc(l.city)}, MI</a>`,
      )
      .join("")}
  </div>
</div></section>

${ctaBand(
  `Tell us about your organization and the population you support, and we can help think through a ${s.title.toLowerCase()} model for your setting.`,
)}
`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.short,
    description: s.metaDescription,
    provider: {
      "@type": "MedicalOrganization",
      name: SITE.name,
      url: SITE.domain,
      telephone: "+1-248-716-5130",
    },
    areaServed: locations.map((l) => `${l.city}, MI`),
    url: `${SITE.domain}${path}`,
  };

  return {
    path,
    html: layout({
      title,
      description: s.metaDescription,
      canonicalPath: path,
      keywords: s.keywords,
      jsonLdBlocks: [
        breadcrumbSchema(crumbItems),
        serviceSchema,
        faqSchema(s.faqs),
      ],
      hero: hero({
        eyebrow: "Services",
        h1: s.title,
        lede: s.intro,
      }),
      body,
    }),
  };
}

function buildLocationPage(l) {
  const path = `/service-areas/${l.slug}/`;
  const title = `In-Home & Population Health Medical Care in ${l.city}, MI | ${SITE.name}`;
  const description = `Population health in-home medical care, telemedicine, senior living medical support, and care gap closure for high-needs patients in ${l.city}, ${l.county} and the surrounding Metro Detroit area.`;
  const keywords = `in-home medical care ${l.city} MI, population health ${l.city}, telemedicine ${l.city} Michigan, senior living medical support ${l.city}, home-based care ${l.county}, care gap closure Metro Detroit`;
  const crumbItems = [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: "/service-areas/" },
    { label: `${l.city}, MI`, href: path },
  ];

  const localFaqs = [
    [
      `Do you provide in-home medical care in ${l.city}, MI?`,
      `Yes. The Health Watchers partners with population health organizations, physician groups, and senior care operators to support high-needs patients in ${l.city} and the surrounding ${l.county} area through in-home medical visits, telemedicine, and senior living medical support. Availability depends on partner program design, clinician availability, licensure, patient need, and applicable regulatory requirements.`,
    ],
    [
      `What services are available to ${l.city} patients?`,
      `Partners serving ${l.city} can draw on in-home medical visits, telemedicine support, population health coverage, care gap closure, senior living medical support, and program visibility and reporting.`,
    ],
    [
      `Which areas near ${l.city} do you serve?`,
      `In addition to ${l.city}, The Health Watchers supports partners across Metro Detroit and Southeast Michigan, including ${l.nearby
        .map((n) => cityBySlug[n].city)
        .join(", ")}.`,
    ],
  ];

  const body = `
${crumbs(crumbItems)}
<section><div class="wrap">
  <h2>Medical care delivered where ${l.city} patients live</h2>
  <p>${esc(l.blurb)} The Health Watchers helps partners bring medical professionals, virtual care, care gap closure, and clinical coordination directly into the patient's home environment across ${l.city} and ${l.county}.</p>
  <p>For patients managing chronic conditions, mobility limitations, or transportation barriers, the trip to a clinic is often the biggest obstacle to consistent care. By delivering care at home and through telemedicine, we help ${l.city}-area partners re-engage high-needs patients and act before small problems become avoidable escalations.</p>
</div></section>

<section class="alt"><div class="wrap">
  <h2>Services available in ${l.city}</h2>
  <div class="grid cols-3">
    ${services
      .map(
        (s) =>
          `<div class="card"><h3>${esc(s.title)}</h3><p>${esc(
            s.intro,
          )}</p><p><a href="/services/${s.slug}/">Learn more →</a></p></div>`,
      )
      .join("")}
  </div>
</div></section>

<section><div class="wrap">
  <h2>Who we partner with in ${l.county}</h2>
  <ul class="checks">
    <li>Skilled nursing facilities and post-acute settings</li>
    <li>Assisted living and independent living communities</li>
    <li>Continuing care retirement communities</li>
    <li>Physician groups and primary care practices</li>
    <li>ACOs, MSOs, and population health organizations</li>
  </ul>
</div></section>

${faqSection(localFaqs)}

<section><div class="wrap">
  <h2>Nearby communities we serve</h2>
  <div class="linkgrid">
    ${locations
      .filter((x) => x.slug !== l.slug)
      .map((x) => `<a href="/service-areas/${x.slug}/">${esc(x.city)}, MI</a>`)
      .join("")}
  </div>
</div></section>

${ctaBand(
  `Tell us about your organization and the patients you support in ${l.city} and ${l.county}, and we can help design an in-home, telemedicine, or senior living medical care program for your setting.`,
)}
`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `${SITE.name} — ${l.city}, MI`,
    url: `${SITE.domain}${path}`,
    telephone: "+1-248-716-5130",
    email: SITE.email,
    description,
    areaServed: [
      { "@type": "City", name: `${l.city}, Michigan` },
      { "@type": "AdministrativeArea", name: l.county },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: l.city,
      addressRegion: "MI",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: l.lat,
      longitude: l.lng,
    },
    medicalSpecialty: ["PrimaryCare", "Geriatric", "CommunityHealth"],
  };

  return {
    path,
    html: layout({
      title,
      description,
      canonicalPath: path,
      keywords,
      jsonLdBlocks: [
        breadcrumbSchema(crumbItems),
        localBusinessSchema,
        faqSchema(localFaqs),
      ],
      hero: hero({
        eyebrow: `${l.county} · Metro Detroit`,
        h1: `Population health medical care in ${l.city}, MI`,
        lede: `In-home medical visits, telemedicine, senior living medical support, and care gap closure for high-needs patients across ${l.city} and ${l.county}.`,
      }),
      body,
    }),
  };
}

function buildServicesHub() {
  const path = `/services/`;
  const crumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: path },
  ];
  const body = `
${crumbs(crumbItems)}
<section><div class="wrap">
  <h2>How The Health Watchers supports partners</h2>
  <p>We help population health organizations, physician groups, and senior care operators deliver medical support where patients live — through in-home visits, virtual care, care gap closure, and clinical coordination. Explore each service below.</p>
  <div class="grid cols-2" style="margin-top:24px;">
    ${services
      .map(
        (s) =>
          `<div class="card"><h3>${esc(s.title)}</h3><p>${esc(
            s.intro,
          )}</p><p><a href="/services/${s.slug}/">Learn more about ${esc(
            s.title,
          )} →</a></p></div>`,
      )
      .join("")}
  </div>
</div></section>
<section class="alt"><div class="wrap">
  <h2>Available across Metro Detroit</h2>
  <p>Our services are available to partners throughout Southeast Michigan.</p>
  <div class="linkgrid">
    ${locations
      .map((l) => `<a href="/service-areas/${l.slug}/">${esc(l.city)}, MI</a>`)
      .join("")}
  </div>
</div></section>
${ctaBand(
  "Tell us about your organization and the population you support, and we can help think through the right mix of services for your setting.",
)}
`;
  return {
    path,
    html: layout({
      title: `Services | ${SITE.name}`,
      description:
        "Explore The Health Watchers services: in-home medical visits, telemedicine support, population health coverage, care gap closure, senior living medical support, and program reporting.",
      canonicalPath: path,
      keywords:
        "population health services, in-home medical visits, telemedicine support, care gap closure, senior living medical support, program reporting",
      jsonLdBlocks: [breadcrumbSchema(crumbItems)],
      hero: hero({
        eyebrow: "Services",
        h1: "Population health medical care services",
        lede: "A coordinated set of services that bring medical care to patients where they live — at home, virtually, and in senior living settings.",
      }),
      body,
    }),
  };
}

function buildServiceAreasHub() {
  const path = `/service-areas/`;
  const crumbItems = [
    { label: "Home", href: "/" },
    { label: "Service Areas", href: path },
  ];
  const body = `
${crumbs(crumbItems)}
<section><div class="wrap">
  <h2>Serving communities across Metro Detroit & Southeast Michigan</h2>
  <p>The Health Watchers partners with population health organizations, physician groups, and senior care operators to deliver in-home medical visits, telemedicine, senior living medical support, and care gap closure across Wayne, Oakland, and Macomb counties. Explore the communities we serve.</p>
  <div class="grid cols-3" style="margin-top:24px;">
    ${locations
      .map(
        (l) =>
          `<div class="card"><h3>${esc(l.city)}, MI</h3><p>${esc(
            l.county,
          )}</p><p>${esc(l.blurb)}</p><p><a href="/service-areas/${
            l.slug
          }/">Care in ${esc(l.city)} →</a></p></div>`,
      )
      .join("")}
  </div>
</div></section>
<section class="alt"><div class="wrap">
  <h2>Explore our services</h2>
  <div class="linkgrid">
    ${services
      .map((s) => `<a href="/services/${s.slug}/">${esc(s.title)}</a>`)
      .join("")}
  </div>
</div></section>
${ctaBand(
  "Tell us where your patients are and the population you support, and we can help design a care program for your service area.",
)}
`;
  return {
    path,
    html: layout({
      title: `Service Areas Across Metro Detroit | ${SITE.name}`,
      description:
        "The Health Watchers serves communities across Metro Detroit and Southeast Michigan — including Detroit, Troy, Royal Oak, Southfield, Dearborn, Warren, Sterling Heights, Farmington Hills, Novi, and West Bloomfield.",
      canonicalPath: path,
      keywords:
        "Metro Detroit in-home medical care, Southeast Michigan population health, Wayne County, Oakland County, Macomb County senior care, Detroit area home-based care",
      jsonLdBlocks: [breadcrumbSchema(crumbItems)],
      hero: hero({
        eyebrow: "Service Areas",
        h1: "Medical care across Metro Detroit",
        lede: "Population health in-home medical care, telemedicine, and senior living medical support for communities across Wayne, Oakland, and Macomb counties.",
      }),
      body,
    }),
  };
}

// --------------------------------------------------------------------------
// Sitemap & robots
// --------------------------------------------------------------------------

function buildSitemap(paths) {
  const urls = ["/", ...paths]
    .map(
      (p) =>
        `  <url><loc>${SITE.domain}${p}</loc><changefreq>monthly</changefreq><priority>${
          p === "/" ? "1.0" : "0.8"
        }</priority></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE.domain}/sitemap.xml
`;
}

// --------------------------------------------------------------------------
// Write
// --------------------------------------------------------------------------

async function writePage(path, html) {
  const outDir = join(PUBLIC_DIR, path);
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "index.html"), html, "utf8");
}

async function main() {
  const pages = [
    buildServicesHub(),
    buildServiceAreasHub(),
    ...services.map(buildServicePage),
    ...locations.map(buildLocationPage),
  ];

  for (const page of pages) {
    await writePage(page.path, page.html);
  }

  const allPaths = pages.map((p) => p.path);
  await writeFile(join(PUBLIC_DIR, "sitemap.xml"), buildSitemap(allPaths), "utf8");
  await writeFile(join(PUBLIC_DIR, "robots.txt"), buildRobots(), "utf8");

  console.log(`Generated ${pages.length} pages + sitemap.xml + robots.txt`);
  allPaths.forEach((p) => console.log(`  ${p}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
