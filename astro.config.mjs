import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Map blog URLs to their last-changed date (updatedDate, else pubDate) so the
// sitemap can tell crawlers when each post changed.
const blogLastmod = {};
for (const file of readdirSync('./src/content/blog').filter((f) => f.endsWith('.md'))) {
  const fm = readFileSync(`./src/content/blog/${file}`, 'utf8').split('---')[1] ?? '';
  const get = (k) => fm.match(new RegExp(`^${k}:\\s*["']?([^"'\\n]+)`, 'm'))?.[1]?.trim();
  const slug = get('slug');
  const date = get('updatedDate') ?? get('pubDate');
  if (slug && date) blogLastmod[`https://elevationfireprotection.com/blog/${slug}/`] = new Date(date).toISOString();
}

export default defineConfig({
  site: 'https://elevationfireprotection.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        if (blogLastmod[item.url]) item.lastmod = blogLastmod[item.url];
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
