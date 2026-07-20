export const site = {
  brand: "Elevation Fire Protection",
  legalName: "Elevation Fire Protection LLC",
  domain: "elevationfireprotection.com",
  url: "https://elevationfireprotection.com",
  founded: "2016",
  yearsExperience: 19,
  phoneDisplay: "(720) 382-9669",
  phoneTel: "tel:7203829669",
  phoneE164: "+17203829669",
  email: "nic@elevationfireprotection.com",
  address: {
    street: "8671 E Duke Pl",
    locality: "Denver",
    region: "CO",
    postal: "80231",
    country: "US",
  },
  geo: {
    lat: 39.6711,
    lng: -104.8859,
  },
  hours: [
    { day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:00" },
  ],
  emergency: "24/7 Emergency Service Available",
  description:
    "Locally owned fire sprinkler contractor providing installation, inspection, testing, repair, and 24/7 emergency service across Colorado and Wyoming since 2016.",
};

export const services = [
  {
    slug: "fire-sprinkler-installation",
    name: "Fire Sprinkler Installation",
    short: "Design-build fire sprinkler systems for new construction, tenant finish, and upgrades — NFPA 13.",
    icon: "sprinkler",
    nfpa: "NFPA 13",
  },
  {
    slug: "inspections-and-testing",
    name: "Inspections & Testing",
    short: "Annual, semi-annual, and quarterly NFPA compliance reporting for commercial assets.",
    icon: "fact_check",
    nfpa: "NFPA 25",
  },
  {
    slug: "service-and-repair",
    name: "Service & Repair",
    short: "Rapid response maintenance for sprinkler systems, backflow, and fire alarm panels.",
    icon: "build",
    nfpa: "NFPA 13 / 25",
  },
  {
    slug: "fire-pump-testing",
    name: "Fire Pump Testing",
    short: "Comprehensive flow testing and calibration to ensure critical pressure levels.",
    icon: "plumbing",
    nfpa: "NFPA 20 / 25",
  },
  {
    slug: "backflow-testing",
    name: "Backflow Testing",
    short: "Certified technicians providing annual certification and immediate repairs.",
    icon: "water_drop",
    nfpa: "Cross-Connection Control Manual",
  },
];

export const locations = [
  {
    slug: "denver",
    city: "Denver",
    state: "Colorado",
    stateCode: "CO",
    neighborhoods: ["Downtown", "RiNo", "Cherry Creek", "DTC", "Stapleton", "Lowry", "LoDo", "Highlands"],
    geo: { lat: 39.7392, lng: -104.9903 },
    blurb:
      "Headquartered in Denver since 2016, our crew runs across the Front Range daily — from RiNo build-outs to DTC commercial inspections.",
  },
  {
    slug: "aurora",
    city: "Aurora",
    state: "Colorado",
    stateCode: "CO",
    neighborhoods: ["Stapleton", "Saddle Rock", "Southlands", "Town Center", "Anschutz Medical Campus"],
    geo: { lat: 39.7294, lng: -104.8319 },
    blurb:
      "Aurora's commercial corridor — from Anschutz Medical Campus to the Southlands — gets the same dispatch speed as our Denver clients.",
  },
  {
    slug: "boulder",
    city: "Boulder",
    state: "Colorado",
    stateCode: "CO",
    neighborhoods: ["Pearl Street", "Downtown", "Gunbarrel", "North Boulder", "Table Mesa"],
    geo: { lat: 40.015, lng: -105.2705 },
    blurb:
      "Boulder's research labs, breweries, and historic Pearl Street commercial buildings — we know the AHJ requirements and we know the buildings.",
  },
  {
    slug: "fort-collins",
    city: "Fort Collins",
    state: "Colorado",
    stateCode: "CO",
    neighborhoods: ["Old Town", "Midtown", "Harmony Corridor", "CSU Campus area"],
    geo: { lat: 40.5853, lng: -105.0844 },
    blurb:
      "Servicing northern Colorado's breweries, CSU-adjacent commercial space, and the Harmony Corridor's growing industrial base.",
  },
  {
    slug: "cheyenne",
    city: "Cheyenne",
    state: "Wyoming",
    stateCode: "WY",
    neighborhoods: ["Downtown", "F.E. Warren AFB area", "Cheyenne Business Parkway", "South Greeley Hwy"],
    geo: { lat: 41.14, lng: -104.8202 },
    blurb:
      "Wyoming-licensed and Cheyenne-ready. We cover the I-25 corridor weekly for inspections, repairs, and new construction.",
  },
];
