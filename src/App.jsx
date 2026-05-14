import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  LineChart,
  Menu,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "Care Model", href: "#care-model" },
  { label: "Technology", href: "#technology" },
];

const aboutNavItems = [
  { label: "About", href: "#about" },
  { label: "Clinical Team", href: "#clinical-team" },
  { label: "Service Area", href: "#service-area" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Stethoscope,
    title: "In-Home Medical Visits",
    description:
      "Medical professionals can visit patients where they live, helping partners support high-needs individuals who may struggle to access traditional office-based care.",
  },
  {
    icon: PhoneCall,
    title: "Telemedicine Support",
    description:
      "Virtual medical visits and follow-up support that help patients, families, facilities, and care teams get timely clinical guidance between in-person encounters.",
  },
  {
    icon: Users,
    title: "Population Health Coverage",
    description:
      "A clinical operating model for organizations managing high-risk, underserved, and hard-to-reach populations across home, facility, and community-based settings.",
  },
  {
    icon: ClipboardCheck,
    title: "Care Gap Closure",
    description:
      "Support identifying patients who need follow-up, routing the right next step, and helping partners close gaps before they become avoidable escalations.",
  },
  {
    icon: Building2,
    title: "Senior Living Medical Support",
    description:
      "Clinical support for senior living and post-acute settings, including in-facility visits, virtual follow-up, family communication, and provider coordination.",
  },
  {
    icon: BarChart3,
    title: "Program Visibility & Reporting",
    description:
      "Clear reporting that helps partners understand visit activity, patient needs, care gaps, escalations, and program performance across their population.",
  },
];

const audiences = [
  "Skilled Nursing Facilities",
  "Assisted Living Communities",
  "Independent Living Communities",
  "Continuing Care Retirement Communities",
  "Physician Groups",
  "ACOs, MSOs & Population Health Organizations",
];

const modelSteps = [
  [
    "01",
    "Identify the right patients",
    "We help partners identify patients and residents who may benefit from in-home medical visits, telemedicine follow-up, care gap closure, or more structured clinical support.",
  ],
  [
    "02",
    "Build the care workflow",
    "We align eligibility, documentation expectations, communication rules, escalation thresholds, and reporting cadence.",
  ],
  [
    "03",
    "Engage and monitor",
    "Our team supports patient outreach, medical visit coordination, virtual follow-up, care gap closure, and care-team communication.",
  ],
  [
    "04",
    "Coordinate and escalate",
    "When patient needs change, we help route the right information to the right person with the right documentation.",
  ],
  [
    "05",
    "Report and improve",
    "Partners get visibility into activity, care gaps, trends, and opportunities to refine the program over time.",
  ],
];

const technologyItems = [
  "Visit coordination workflows",
  "Care team communication",
  "Documentation support",
  "Risk and gap visibility",
  "Program performance reporting",
  "Operational workflow improvement",
];

const serviceAreas = [
  "Michigan-based partners",
  "Metro Detroit",
  "Southeast Michigan",
  "Senior living communities",
  "Patient homes",
  "Facility-based care settings",
];

const images = {
  hero:
    "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1400&q=80",
  homeVisit:
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1400&q=80",
  clinicalTeam:
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80",
  seniorLiving:
    "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1400&q=80",
};

const faqs = [
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

const organizationSchema = {
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

const serviceSchema = {
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

const faqSchema = {
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

function SEO() {
  useEffect(() => {
    const title = "The Health Watchers | Population Health In-Home Medical Care";
    const description =
      "The Health Watchers provides population health in-home medical visits, telemedicine support, senior living medical care, care gap closure, and clinical coordination for high-needs patients.";
    const canonical = "https://thehealthwatchers.com/";

    document.title = title;

    const upsertMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    };

    const upsertLink = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("link");
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    };

    const upsertJsonLd = (id, data) => {
      let element = document.getElementById(id);
      if (!element) {
        element = document.createElement("script");
        element.id = id;
        element.type = "application/ld+json";
        document.head.appendChild(element);
      }
      element.textContent = JSON.stringify(data);
    };

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index, follow, max-image-preview:large",
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content:
        "population health medical care, in-home medical visits, home-based medical care, telemedicine support, senior living medical support, care gap closure, high-risk patient care, Michigan healthcare, Metro Detroit in-home medical care",
    });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: "The Health Watchers",
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonical });

    upsertJsonLd("health-watchers-organization-schema", organizationSchema);
    upsertJsonLd("health-watchers-service-schema", serviceSchema);
    upsertJsonLd("health-watchers-faq-schema", faqSchema);
  }, []);

  return null;
}

function Logo({ variant = "header" }) {
  const sizeClass = variant === "footer" ? "h-16 w-auto" : "h-14 w-auto sm:h-16";

  return (
    <a href="#top" className="flex min-w-0 items-center" aria-label="The Health Watchers home">
      <img src="/logo.svg" alt="The Health Watchers" className={sizeClass} />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-[#0F4C5C]">
                {item.label}
              </a>
            ))}

            <div className="group relative">
              <a href="#about" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-[#0F4C5C]">
                About
                <span className="text-slate-400 transition group-hover:rotate-180">⌄</span>
              </a>
              <div className="invisible absolute right-0 top-full z-50 mt-3 w-56 translate-y-2 rounded-3xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl shadow-slate-200/70 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {aboutNavItems.map((item) => (
                  <a key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#0F4C5C]">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:2487165130" className="text-sm font-semibold text-slate-700 transition hover:text-[#0F4C5C]">
              248-716-5130
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[#0F4C5C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123F4B]">
              Partner With Us
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
            Menu
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/55 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button type="button" className="absolute inset-0 h-full w-full cursor-default" aria-label="Close navigation menu backdrop" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 z-10 flex h-screen max-h-screen w-full max-w-[22rem] flex-col overflow-y-auto overscroll-contain bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex shrink-0 items-center justify-between gap-4">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 shadow-sm"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 grid shrink-0 gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50">
                  {item.label}
                </a>
              ))}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <a href="#about" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-base font-semibold text-slate-950">
                  About
                </a>
                <div className="mt-1 grid gap-1">
                  {aboutNavItems
                    .filter((item) => item.label !== "About")
                    .map((item) => (
                      <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-[#0F4C5C]">
                        {item.label}
                      </a>
                    ))}
                </div>
              </div>
            </nav>

            <a href="#contact" onClick={() => setOpen(false)} className="mt-6 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#0F4C5C] px-5 py-3 text-sm font-semibold text-white shadow-sm">
              Build a Care Program
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function SectionEyebrow({ children }) {
  return <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-[#0F766E] uppercase">{children}</p>;
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#F7FAF9]">
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#CFE7E2]/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-[#B9D8D2] bg-white/80 px-4 py-2 text-sm font-medium text-[#0F4C5C] shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Population health medical care at home
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-slate-950 md:text-6xl lg:text-7xl">
            Population health medical care delivered where patients live.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
            The Health Watchers is a population health in-home medical care provider helping organizations support patients where they live. We partner with population health organizations, physician groups, and senior care operators to deliver medical care in the home, through telemedicine, and in senior living settings for patients who need more support than the traditional clinic model can provide.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F4C5C] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123F4B]">
              Partner With Us
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400">
              Explore Our Model
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2.2rem] border border-white bg-white p-3 shadow-xl shadow-slate-200/70">
            <img src={images.hero} alt="Medical professional speaking with a patient during a home-based care visit" className="h-[300px] w-full rounded-[1.7rem] object-cover md:h-[390px]" />
            <div className="mt-4 rounded-[1.7rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Population Health Panel</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-950">In-home care dashboard</h2>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Active</div>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  { name: "In-home visits", value: "18 scheduled", status: "This week" },
                  { name: "Telemedicine follow-ups", value: "26 completed", status: "On track" },
                  { name: "High-risk patients", value: "7 flagged", status: "Review today" },
                ].map((row) => (
                  <div key={row.name} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-950">{row.name}</div>
                        <div className="mt-1 text-sm text-slate-500">{row.status}</div>
                      </div>
                      <div className="text-sm font-semibold text-[#0F4C5C]">{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-3xl bg-[#0F4C5C] p-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
                    <LineChart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70">Program visibility</p>
                    <p className="text-lg font-semibold tracking-[-0.03em]">In-home visits, virtual care, follow-up, and escalation support in one coordinated model.</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F4F1] text-[#0F4C5C]">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">Medical care at home</p>
                    <p className="text-sm text-slate-500">Patients, providers, plans, facilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-5 sm:grid-cols-3 lg:grid-cols-6 lg:px-8">
        {["In-Home Visits", "Telemedicine", "Population Health", "Care Gap Closure", "Home-Based Care", "Care Coordination"].map((item) => (
          <div key={item} className="flex items-center justify-center px-3 py-3 text-center text-sm font-semibold text-slate-600">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Services</SectionEyebrow>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">A medical care model for patients who need support beyond the clinic.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            We help population health partners, physician groups, and senior care organizations bring medical professionals, virtual care, care gap closure, escalation support, and reporting directly into the patient’s home environment.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F4F1] text-[#0F4C5C] transition group-hover:bg-[#0F4C5C] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClinicalTeam() {
  const careOptions = [
    [PhoneCall, "Telemedicine support", "Medical professionals can connect virtually with patients, residents, facility teams, and care partners to help assess needs, support follow-up, and determine the appropriate next step."],
    [Stethoscope, "In-house or onsite visits", "Where appropriate and available, our clinical team can support in-person visits in the home, facility, or senior living setting to bring care closer to the patient."],
    [Users, "Coordinated care team model", "Physicians, advanced practice providers, nurses, care coordinators, and patient engagement specialists work together to support proactive care management workflows."],
  ];

  return (
    <section id="clinical-team" className="bg-[#F7FAF9] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionEyebrow>Clinical Team</SectionEyebrow>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">Medical professionals available virtually and in the home.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The Health Watchers helps partners extend clinical reach by connecting patients with medical professionals through in-home visits and telemedicine. This gives population health teams, physicians, senior living operators, families, and facilities a more responsive way to support high-needs patients between routine appointments.
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-500">
              Services are coordinated based on patient need, partner workflow, provider oversight, licensure, availability, and applicable regulatory requirements.
            </p>
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-lg shadow-slate-200/70">
              <img src={images.homeVisit} alt="Clinician supporting an older adult patient in a home care setting" className="h-72 w-full rounded-[1.5rem] object-cover" />
            </div>
          </div>
          <div className="grid gap-5 self-center">
            {careOptions.map(([Icon, title, description]) => (
              <div key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F4F1] text-[#0F4C5C]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoWeServe() {
  return (
    <section id="who-we-serve" className="bg-[#F7FAF9] py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <div className="mb-8 overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-lg shadow-slate-200/70">
            <img src={images.seniorLiving} alt="Healthcare team supporting patients in a senior living or community-based care setting" className="h-64 w-full rounded-[1.5rem] object-cover" />
          </div>
          <SectionEyebrow>Who We Serve</SectionEyebrow>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">Built for organizations caring for complex patients.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Our programs are designed for settings where communication, documentation, follow-through, and timely escalation matter.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {audiences.map((audience) => (
            <div key={audience} className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F4F1] text-[#0F4C5C]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-950">{audience}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Care management support designed around patient complexity, staff realities, and partner workflows.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CareModel() {
  return (
    <section id="care-model" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>Our Care Model</SectionEyebrow>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">People, process, and technology working together.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Proactive care requires more than software and more than staffing alone. It takes repeatable workflows, timely data, trained people, and clear communication.
          </p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {modelSteps.map(([number, title, description]) => (
            <div key={number} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-8 text-sm font-semibold tracking-[0.16em] text-[#0F766E]">{number}</div>
              <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="technology" className="bg-slate-950 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-[#83D2C6] uppercase">Technology & Insights</p>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] md:text-5xl">Technology that supports the care team, not the other way around.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Our technology-enabled model helps organize patient information, visit activity, outreach, documentation, escalations, and program reporting so care teams can act with more clarity.
          </p>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {technologyItems.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <CheckCircle2 className="h-5 w-5 text-[#83D2C6]" />
                <span className="text-sm font-medium text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
          <div className="rounded-[1.5rem] bg-white p-5 text-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Weekly Snapshot</p>
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em]">In-home medical activity</h3>
              </div>
              <Building2 className="h-6 w-6 text-[#0F4C5C]" />
            </div>
            <div className="mt-6 space-y-4">
              {[
                ["Completed visits", "86%"],
                ["Virtual follow-ups", "72%"],
                ["Care gaps addressed", "64%"],
                ["Documentation completion", "91%"],
              ].map(([label, width]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{label}</span>
                    <span className="font-semibold text-slate-950">{width}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-[#0F4C5C]" style={{ width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-[#F7FAF9] py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-[#0F4C5C] text-white shadow-xl shadow-slate-200/70">
          <img src={images.clinicalTeam} alt="Healthcare professionals collaborating on patient care" className="h-72 w-full object-cover opacity-95" />
          <div className="p-8 lg:p-10">
            <SectionEyebrow> </SectionEyebrow>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] md:text-5xl">Built to help healthcare teams care beyond the visit.</h2>
            <p className="mt-6 text-lg leading-8 text-white/80">
              The Health Watchers supports patients with complex needs who often require more consistent, accessible medical attention than the traditional clinic model is built to provide.
            </p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">Mission</h3>
            <p className="mt-3 leading-7 text-slate-600">To help healthcare partners deliver more proactive, coordinated, and compassionate care for patients who need consistent support.</p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">Vision</h3>
            <p className="mt-3 leading-7 text-slate-600">A healthcare model where high-needs patients can receive medical support at home, virtually, and in senior living settings before care gaps become crises.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Patient-Centered", "Clinically Grounded", "Operationally Practical", "Compliance-Aware"].map((value) => (
              <div key={value} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-800 shadow-sm">
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Compliance() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F4F1] text-[#0F4C5C]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.18em] text-[#0F766E] uppercase">Compliance & Privacy</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Trust is foundational.</h2>
              </div>
            </div>
            <div>
              <p className="text-lg leading-8 text-slate-600">
                The Health Watchers operates in care settings where privacy, documentation, billing integrity, and regulatory alignment matter. Our programs are designed to support responsible communication, careful documentation, and HIPAA-aligned workflows.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Privacy-focused", "Documentation-aware", "Partner-aligned"].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceAreaAndFAQ() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div id="service-area">
          <SectionEyebrow>Service Area</SectionEyebrow>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">Local presence. Flexible care delivery.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The Health Watchers supports care programs across home-based, senior living, and community-based settings. Our model is designed for partners that need reliable medical coverage, virtual follow-up, care gap closure, and visibility across high-needs patient populations.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {serviceAreas.map((area) => (
              <div key={area} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="h-5 w-5 text-[#0F4C5C]" />
                {area}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-500">
            Availability of in-home, onsite, and telemedicine services depends on partner program design, clinician availability, licensure, patient need, and applicable regulatory requirements.
          </p>
        </div>
        <div id="faq" className="scroll-mt-24">
          <SectionEyebrow>Helpful Answers</SectionEyebrow>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">Common questions about The Health Watchers.</h2>
          <div className="mt-8 grid gap-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-[#F7FAF9] py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <SectionEyebrow>Partner With Us</SectionEyebrow>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-5xl">Let’s build a more proactive care model for your patients.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Tell us about your organization and the population you support. Our team can help think through an in-home medical care, telemedicine, senior living support, or care gap closure model for your setting.
          </p>
          <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">The Health Watchers</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              <a className="font-semibold text-[#0F4C5C]" href="tel:2487165130">248-716-5130</a><br />
              <a className="font-semibold text-[#0F4C5C]" href="mailto:skay@thehealthwatchers.com">skay@thehealthwatchers.com</a>
            </p>
          </div>
        </div>
        <form className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 lg:p-8" aria-label="Partnership inquiry form">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2"><span className="text-sm font-semibold text-slate-700">First name</span><input name="first-name" autoComplete="given-name" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#0F4C5C]" /></label>
            <label className="grid gap-2"><span className="text-sm font-semibold text-slate-700">Last name</span><input name="last-name" autoComplete="family-name" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#0F4C5C]" /></label>
            <label className="grid gap-2 sm:col-span-2"><span className="text-sm font-semibold text-slate-700">Organization name</span><input name="organization" autoComplete="organization" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#0F4C5C]" /></label>
            <label className="grid gap-2"><span className="text-sm font-semibold text-slate-700">Email</span><input name="email" type="email" autoComplete="email" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#0F4C5C]" /></label>
            <label className="grid gap-2"><span className="text-sm font-semibold text-slate-700">Phone</span><input name="phone" type="tel" autoComplete="tel" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#0F4C5C]" /></label>
            <label className="grid gap-2 sm:col-span-2"><span className="text-sm font-semibold text-slate-700">Organization type</span><select name="organization-type" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#0F4C5C]"><option>Select one</option><option>Skilled Nursing Facility</option><option>Assisted Living Community</option><option>Independent Living Community</option><option>Continuing Care Retirement Community</option><option>Physician Group</option><option>ACO / MSO / Population Health</option><option>Other</option></select></label>
            <label className="grid gap-2 sm:col-span-2"><span className="text-sm font-semibold text-slate-700">How can we help?</span><textarea name="message" rows={5} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0F4C5C]" /></label>
          </div>
          <button type="button" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F4C5C] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123F4B]">
            Submit Inquiry
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            By submitting this form, you agree to be contacted about partnership opportunities. This form should not be used to submit protected health information.
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="inline-block rounded-2xl bg-white p-3">
            <Logo variant="footer" />
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Population health in-home medical care, telemedicine, senior living medical support, and care gap closure for high-needs patients in Michigan and partner care settings.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          {[...navItems, ...aboutNavItems].map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-5 pt-6 text-xs text-slate-500 lg:px-8">
        © {new Date().getFullYear()} The Health Watchers. All rights reserved. This website is for informational purposes only and should not be used for medical emergencies.
      </div>
    </footer>
  );
}

export default function TheHealthWatchersWebsite() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-950">
      <SEO />
      <Header />
      <Hero />
      <TrustStrip />
      <Services />
      <ClinicalTeam />
      <WhoWeServe />
      <CareModel />
      <Technology />
      <About />
      <Compliance />
      <ServiceAreaAndFAQ />
      <Contact />
      <Footer />
    </main>
  );
}
