// SEO landing pages that the keyword redirect domains point to.
// Each page lives at /<slug>/ and is built for local search intent.
// Rendered by src/pages/[landing].astro.

export interface LandingPage {
  slug: string;
  domain: string;           // the keyword domain that 301s here (reference only)
  eyebrow: string;          // small label above the H1
  h1: string;
  serviceName: string;      // used in Service schema
  metaTitle: string;
  metaDescription: string;
  intro: string;
  highlightsHeading: string;
  highlights: string[];
  detailHeading: string;
  detail: string[];         // paragraphs
  relatedServiceSlug?: string; // canonical service page to link to (specific pages)
  faqs: { q: string; a: string }[];
  ctaHeading: string;
}

export const landingPages: LandingPage[] = [
  {
    slug: "denver-fire-sprinkler-service",
    domain: "denverfiresprinklerservice.com",
    eyebrow: "Denver, CO · NFPA 13 / 25",
    h1: "Fire Sprinkler Service & Repair in Denver",
    serviceName: "Fire Sprinkler Service & Repair",
    metaTitle: "Fire Sprinkler Service & Repair in Denver, CO | Elevation Fire Protection",
    metaDescription:
      "Fast fire sprinkler service and repair across Denver. Leak repairs, head replacement, valve work, and 24/7 emergency response from a licensed local contractor.",
    intro:
      "When a sprinkler system fails, leaks, or trips into trouble, you need a Denver crew that answers the phone and shows up. We service, troubleshoot, and repair commercial and industrial fire sprinkler systems across the metro — with 24/7 emergency response when a system goes down.",
    highlightsHeading: "What We Service & Repair",
    highlights: [
      "Sprinkler head replacement, corrosion, and painted-head remediation",
      "Pipe leaks, fittings, and frozen or burst line repair",
      "Control valve, check valve, and riser service",
      "Dry system air maintenance and low-point drainage",
      "Deficiency correction from failed inspections (all AHJs)",
      "24/7 emergency shutdown, isolation, and repair",
    ],
    detailHeading: "A Denver Crew That Actually Shows Up",
    detail: [
      "Most sprinkler repair calls come in one of two ways: a scheduled fix from a failed inspection, or an emergency when a line lets go. We handle both, and we carry the common parts to close out most repairs in a single trip.",
      "We've run repair calls across the Denver market for 19 years — from RiNo build-outs to DTC high-rises to warehouse space along I-70. We know the local AHJ deficiency notices, which water utilities want a report filed after a shutdown, and how to keep the rest of your building in service while we work.",
    ],
    relatedServiceSlug: "service-and-repair",
    faqs: [
      {
        q: "Do you offer emergency fire sprinkler repair in Denver?",
        a: "Yes — 24/7. If a system is leaking, flowing, or has to be shut down, call us and we'll dispatch to isolate the problem, protect the property, and get you back in service.",
      },
      {
        q: "Can you fix deficiencies from a failed inspection?",
        a: "Absolutely. Send us the inspection report or deficiency notice and we'll quote and correct the items — whether we did the inspection or another company did.",
      },
      {
        q: "Do you work on commercial and industrial systems?",
        a: "Yes. We service wet, dry, and pre-action systems for commercial, retail, warehouse, industrial, and multi-family properties throughout the Denver metro.",
      },
    ],
    ctaHeading: "Sprinkler problem in Denver? Let's fix it.",
  },
  {
    slug: "denver-fire-sprinkler-inspections",
    domain: "denverfiresprinklerinspections.com",
    eyebrow: "Denver, CO · NFPA 25",
    h1: "Fire Sprinkler Inspections in Denver",
    serviceName: "Fire Sprinkler Inspections & Testing",
    metaTitle: "Fire Sprinkler Inspections in Denver, CO | NFPA 25 Compliance",
    metaDescription:
      "NFPA 25 fire sprinkler inspections in Denver — quarterly, semi-annual, and annual testing with AHJ-ready reports. Keep your commercial property compliant.",
    intro:
      "Denver AHJs and your insurer expect current NFPA 25 inspection records — and a lapse can mean fines, a red tag, or a coverage problem. We handle the full inspection and testing schedule for commercial properties across the metro and file reports the way your AHJ wants them.",
    highlightsHeading: "Inspections & Testing We Perform",
    highlights: [
      "Quarterly, semi-annual, and annual NFPA 25 inspections",
      "Wet, dry, and pre-action system testing",
      "Main drain and forward flow tests",
      "Backflow and fire pump testing coordination",
      "Digital, AHJ-ready reports with deficiencies flagged",
      "Automatic scheduling so you never miss a cycle",
    ],
    detailHeading: "Compliance Without the Chase",
    detail: [
      "The hardest part of inspections isn't the test — it's keeping every frequency on schedule across a portfolio of buildings. We put your properties on an automatic cadence, show up on time, and hand you documentation that satisfies the Denver AHJ and your insurance carrier.",
      "For 19 years we've filed reports across the Front Range. We know which utilities need a report by which day of the month and which AHJs accept digital submittal — so your records stay clean without you having to manage it.",
    ],
    relatedServiceSlug: "inspections-and-testing",
    faqs: [
      {
        q: "How often does Denver require fire sprinkler inspections?",
        a: "NFPA 25 sets the schedule your AHJ enforces: quarterly, semi-annual, and annual items depending on the component and system type. We map your building's full frequency schedule and keep you on it.",
      },
      {
        q: "Will I get a report I can submit to the AHJ?",
        a: "Yes. Every inspection comes with a digital, AHJ-ready report that documents what was tested, any deficiencies found, and the corrective recommendations.",
      },
      {
        q: "Can you inspect and also fix what fails?",
        a: "Yes — we're a full-service contractor, so any deficiencies we find we can quote and correct, no second vendor needed.",
      },
    ],
    ctaHeading: "Get your Denver property inspected & compliant.",
  },
  {
    slug: "denver-fire-pump-testing",
    domain: "denverfirepumptesting.com",
    eyebrow: "Denver, CO · NFPA 20 / 25",
    h1: "Fire Pump Testing in Denver",
    serviceName: "Fire Pump Testing",
    metaTitle: "Fire Pump Testing in Denver, CO | NFPA 20 / 25 Annual Flow Test",
    metaDescription:
      "Annual fire pump flow testing in Denver — 3-point flow test, churn test setup, and controller diagnostics for diesel and electric pumps. NFPA 20 / 25, AHJ-ready.",
    intro:
      "Your fire pump is the heart of the system — and NFPA 25 requires it proven every year at three flow points. We run full annual flow tests, weekly churn test setups, and pump controller diagnostics for diesel and electric pumps across the Denver metro.",
    highlightsHeading: "What We Test",
    highlights: [
      "Annual 3-point flow test (0%, 100%, 150% of rated capacity)",
      "Suction and discharge pressure verification against the pump curve",
      "Controller transfer to alternate power source",
      "Diesel: battery, fuel, starter, and exhaust checks",
      "Electric: motor amps, voltage, and phase balance",
      "Jockey pump cut-in / cut-out pressure setup",
    ],
    detailHeading: "Calibrated Equipment, AHJ-Ready Results",
    detail: [
      "We arrive with calibrated pitot tubes, flow meters, and gauges, and the required hose stream apparatus — calibration certificates available for AHJ submittal. You get a clean report that proves your pump performs to its listed curve.",
      "If your pump fails the annual test, we document the failure, identify the root cause on the spot, and quote remediation — most issues we resolve the same visit or with one return trip. We've been testing pumps across Denver for 19 years.",
    ],
    relatedServiceSlug: "fire-pump-testing",
    faqs: [
      {
        q: "How often does a fire pump need testing in Denver?",
        a: "NFPA 25 requires a weekly no-flow churn test (monthly for diesel) plus a full annual flow test at 0%, 100%, and 150% of rated capacity, all documented for the AHJ.",
      },
      {
        q: "Do you test diesel and electric fire pumps?",
        a: "Both — diesel, electric, and dual-drive arrangements. We service common drivers and controllers and bring all required test equipment.",
      },
      {
        q: "What happens if my pump fails?",
        a: "We document the failure, diagnose the root cause (impeller, controller, suction, transfer switch), and quote the fix immediately — often resolving it the same day.",
      },
    ],
    ctaHeading: "Schedule your Denver fire pump test.",
  },
  {
    slug: "denver-backflow-testing",
    domain: "denverbackflowrepair.com",
    eyebrow: "Denver, CO · Cross-Connection Control",
    h1: "Backflow Testing & Repair in Denver",
    serviceName: "Backflow Testing & Repair",
    metaTitle: "Backflow Testing & Repair in Denver, CO | Certified Annual Testing",
    metaDescription:
      "Certified backflow testing and repair in Denver. Annual assembly certification, rebuilds, and report filing with your water utility — fire and domestic lines.",
    intro:
      "Denver Water and metro utilities require annual backflow certification on your fire and domestic assemblies — and they want the report filed on time. Our certified technicians test, repair, and rebuild backflow preventers and handle the paperwork with the utility for you.",
    highlightsHeading: "Backflow Services",
    highlights: [
      "Annual certification testing on fire & domestic assemblies",
      "RPZ, double-check, and PVB testing",
      "On-site repair, rebuild kits, and assembly replacement",
      "Report filing directly with your water utility",
      "Failed-test remediation and re-certification",
      "Coordination with your annual fire inspection",
    ],
    detailHeading: "Tested, Repaired, and Filed On Time",
    detail: [
      "A backflow test is only done when the report reaches the utility. We test your assemblies, repair anything that fails on the spot when we can, and file the certification with Denver Water or your local utility so you stay in compliance without chasing paperwork.",
      "We carry common rebuild kits so a failed assembly usually gets repaired and re-certified the same visit. After 19 years in this market, we know each utility's filing requirements and deadlines.",
    ],
    relatedServiceSlug: "backflow-testing",
    faqs: [
      {
        q: "Who requires backflow testing in Denver?",
        a: "Denver Water and metro-area utilities require annual certification of backflow assemblies on fire and domestic lines, with the test report filed by their deadline.",
      },
      {
        q: "Can you repair a backflow that fails the test?",
        a: "Usually the same day. We carry common rebuild kits, so a failed assembly typically gets repaired and re-certified on the same visit.",
      },
      {
        q: "Do you file the report with the water utility?",
        a: "Yes. We handle the filing with Denver Water or your local utility so your certification is on record and on time.",
      },
    ],
    ctaHeading: "Get your Denver backflow certified.",
  },
  {
    slug: "colorado-fire-sprinklers",
    domain: "coloradofiresprinklers.com",
    eyebrow: "Serving Colorado & Wyoming",
    h1: "Fire Sprinkler Systems in Colorado",
    serviceName: "Fire Sprinkler Systems",
    metaTitle: "Fire Sprinkler Systems in Colorado | Install, Inspect, Service & Repair",
    metaDescription:
      "Colorado fire sprinkler contractor — design, installation, NFPA 25 inspections, service, repair, fire pump and backflow testing. Denver metro & Front Range, since 2016.",
    intro:
      "Elevation Fire Protection is a locally owned fire sprinkler contractor serving Colorado and Wyoming since 2016. From design and installation to inspections, service, and repair, we're a single accountable partner for the entire life of your fire sprinkler system.",
    highlightsHeading: "Full-Service Fire Protection",
    highlights: [
      "NFPA 13 fire sprinkler design & installation",
      "NFPA 25 inspections & testing",
      "Service, repair & 24/7 emergency response",
      "Fire pump testing (NFPA 20 / 25)",
      "Backflow testing & certification",
      "Commercial, industrial, retail & multi-family",
    ],
    detailHeading: "One Contractor for the Whole System",
    detail: [
      "Whether you're building new, finishing a tenant space, or keeping an existing system compliant, you get one licensed and insured contractor from design through certificate of occupancy and every annual inspection after.",
      "We're headquartered in Denver and run the Front Range daily — Denver, Aurora, Boulder, Fort Collins, and up into Cheyenne, Wyoming. Local crew, local response, 19 years of experience.",
    ],
    faqs: [
      {
        q: "What areas of Colorado do you serve?",
        a: "The Denver metro and Front Range — Denver, Aurora, Boulder, and Fort Collins — plus Cheyenne, Wyoming. We run the I-25 corridor weekly.",
      },
      {
        q: "Do you handle both new installs and ongoing service?",
        a: "Yes. We design and install new systems and also provide the inspections, testing, service, and repair to keep them compliant year after year.",
      },
      {
        q: "Are you licensed and insured?",
        a: "Yes — licensed and insured, and registered with Colorado's Division of Fire Prevention and Control. We're happy to provide documentation.",
      },
    ],
    ctaHeading: "Colorado's full-service fire sprinkler contractor.",
  },
  {
    slug: "denver-fire-sprinkler-contractor",
    domain: "milehighfiresprinkler.com",
    eyebrow: "Denver Metro · Since 2016",
    h1: "Denver Fire Sprinkler Contractor",
    serviceName: "Fire Sprinkler Contractor",
    metaTitle: "Denver Fire Sprinkler Contractor | Install, Inspect, Service & Repair",
    metaDescription:
      "Locally owned Denver fire sprinkler contractor — design, installation, NFPA 25 inspections, service, repair, and 24/7 emergency response across the metro.",
    intro:
      "Elevation Fire Protection is a locally owned fire sprinkler contractor based right here in the Denver metro. We design, install, inspect, service, and repair commercial fire sprinkler systems — one accountable local partner instead of a rotating cast of vendors.",
    highlightsHeading: "What We Do",
    highlights: [
      "NFPA 13 design & installation for new construction and tenant finish",
      "NFPA 25 inspections & testing",
      "Service, repair & 24/7 emergency response",
      "Fire pump testing (NFPA 20 / 25)",
      "Backflow testing & certification",
      "Commercial, industrial, retail & multi-family",
    ],
    detailHeading: "Local Crew, Local Response",
    detail: [
      "We're based in Denver and know the metro's buildings, its AHJs, and its water utilities. From RiNo build-outs to DTC high-rises to warehouse space along I-70, we've been running calls across the market for 19 years.",
      "Being local means we answer the phone, show up on time, and can dispatch fast when a system goes down — not route your emergency through a national call center.",
    ],
    faqs: [
      {
        q: "What does a fire sprinkler contractor do?",
        a: "We design, install, inspect, test, service, and repair fire sprinkler systems. Elevation handles all of it in-house so you have one accountable partner for the life of the system.",
      },
      {
        q: "Do you serve the whole Denver metro?",
        a: "Yes — Denver, Aurora, and the surrounding Front Range communities, plus Boulder, Fort Collins, and Cheyenne, WY.",
      },
      {
        q: "Do you offer 24/7 emergency service?",
        a: "Yes. If a system is leaking, flowing, or has to be shut down, we dispatch around the clock across the Denver metro.",
      },
    ],
    ctaHeading: "Your local Denver fire sprinkler contractor.",
  },
];
