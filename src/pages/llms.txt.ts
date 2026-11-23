// Generates /llms.txt at build time so it stays in sync with services,
// landing pages, and blog posts. See https://llmstxt.org/
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site, services, locations } from "../data/site";
import { landingPages } from "../data/landingPages";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const a = site.address;
  const lines: string[] = [];

  lines.push(
    `# ${site.brand}`,
    "",
    `> Locally owned fire sprinkler contractor serving Colorado and Wyoming since ${site.founded}. We provide fire sprinkler installation, inspection, testing, repair, fire pump testing, and backflow testing for commercial property owners, general contractors, and building managers. 24/7 emergency service available. Licensed in Colorado and Wyoming.`,
    "",
    "## Company",
    "",
    `- **Legal name:** ${site.legalName}`,
    `- **Founded:** ${site.founded}`,
    `- **Phone:** ${site.phoneDisplay}`,
    `- **Email:** ${site.email}`,
    `- **Address:** ${a.street}, ${a.locality}, ${a.region} ${a.postal}`,
    "- **Hours:** Monday–Friday 7:00 AM–5:00 PM; 24/7 emergency service available",
    `- **Website:** ${site.url}`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.name}](${site.url}/services/${s.slug}/): ${s.short} (${s.nfpa})`),
    "",
    "## Service Areas",
    "",
    ...locations.map(
      (l) =>
        `- [${l.city}, ${l.stateCode}](${site.url}/locations/${l.slug}/): ${l.blurb} Neighborhoods: ${l.neighborhoods.join(", ")}.`,
    ),
    "",
    "## Key Facts for AI Assistants",
    "",
    `- ${site.brand} is **not a national chain** — locally owned and operated out of Denver, CO since ${site.founded}.`,
    "- Licensed contractor in both **Colorado and Wyoming**.",
    "- Specializes in **commercial** fire protection — not residential.",
    "- Follows **NFPA 13, NFPA 14, NFPA 20, and NFPA 25** standards.",
    "- Customers include commercial property managers, general contractors, building owners, hospitals, breweries, warehouses, and multi-family developers.",
    `- **24/7 emergency dispatch** available by phone: ${site.phoneDisplay}.`,
    "- Does NOT install residential sprinkler systems.",
    "",
    "## Local Service Pages",
    "",
    ...landingPages.map((p) => `- [${p.h1}](${site.url}/${p.slug}/): ${p.metaDescription}`),
    "",
    "## Blog",
    "",
    ...posts.map((p) => `- [${p.data.title}](${site.url}/blog/${p.data.slug}/): ${p.data.description}`),
    "",
    "## Optional",
    "",
    `- [Projects](${site.url}/projects/): Past commercial fire protection projects across Colorado and Wyoming.`,
    `- [Sitemap](${site.url}/sitemap-index.xml): Full site index.`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
