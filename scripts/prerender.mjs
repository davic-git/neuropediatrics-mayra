import { readFile, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

const projectRoot = process.cwd();
const clientDirectory = resolve(projectRoot, 'dist');
const serverDirectory = resolve(projectRoot, 'dist-server');
const serverEntry = resolve(serverDirectory, 'entry-server.js');
const indexPath = resolve(clientDirectory, 'index.html');

const env = loadEnv('production', projectRoot, '');
const rawSiteUrl = process.env.VITE_SITE_URL || env.VITE_SITE_URL || '';
const siteUrl = rawSiteUrl.trim().replace(/\/+$/, '');

function isPublicUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

try {
  const [{ render }, template] = await Promise.all([
    import(`${pathToFileURL(serverEntry).href}?t=${Date.now()}`),
    readFile(indexPath, 'utf8'),
  ]);

  let html = template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);

  if (isPublicUrl(siteUrl)) {
    const structuredData = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Mayra Martins Neuropediatria',
      url: siteUrl,
      inLanguage: 'pt-BR',
    }).replace(/</g, '\\u003c');

    const productionHead = [
      `    <link rel="canonical" href="${siteUrl}/" />`,
      `    <meta property="og:url" content="${siteUrl}/" />`,
      `    <script type="application/ld+json">${structuredData}</script>`,
    ].join('\n');
    html = html.replace('  </head>', `${productionHead}\n  </head>`);

    await Promise.all([
      writeFile(
        resolve(clientDirectory, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      ),
      writeFile(
        resolve(clientDirectory, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`,
      ),
    ]);
  } else {
    console.warn(
      'SEO: VITE_SITE_URL não foi definido; canonical, og:url, JSON-LD e sitemap foram omitidos para não inventar o domínio.',
    );
  }

  await writeFile(indexPath, html);
} finally {
  await rm(serverDirectory, { recursive: true, force: true });
}
