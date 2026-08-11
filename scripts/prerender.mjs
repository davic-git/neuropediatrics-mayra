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

function normalizePublicUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
    url.hash = '';
    url.search = '';
    return url.href.replace(/\/+$/, '');
  } catch {
    return '';
  }
}

const siteUrl = normalizePublicUrl(rawSiteUrl.trim());

const pageTitle = 'Dra. Mayra Martins | Neuropediatra';
const pageDescription =
  'Dra. Mayra Martins oferece acompanhamento em neuropediatria infantil, com avaliação individualizada, ciência, acolhimento e orientação às famílias.';
const socialProfiles = [
  'https://www.instagram.com/dra.mayra_martins/',
  'https://www.threads.com/@dra.mayra_martins',
  'https://www.facebook.com/dra.maymartins/',
];

function buildStructuredData(pageUrl, socialImageUrl) {
  const websiteId = `${pageUrl}#website`;
  const webpageId = `${pageUrl}#webpage`;
  const physicianId = `${pageUrl}#physician`;
  const imageId = `${pageUrl}#primaryimage`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: pageUrl,
        name: 'Dra. Mayra Martins | Neuropediatra',
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': physicianId },
        primaryImageOfPage: { '@id': imageId },
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'ImageObject',
        '@id': imageId,
        url: socialImageUrl,
        contentUrl: socialImageUrl,
        width: 1731,
        height: 909,
        caption: 'Dra. Mayra Martins — Neuropediatra',
      },
      {
        '@type': ['Person', 'Physician'],
        '@id': physicianId,
        name: 'Mayra Martins',
        honorificPrefix: 'Dra.',
        url: pageUrl,
        image: { '@id': imageId },
        description:
          'Médica neuropediatra que oferece acompanhamento infantil individualizado, com ciência, acolhimento e orientação às famílias.',
        telephone: '+55 24 99945-9027',
        email: 'dra.mayramartinsneuro@gmail.com',
        medicalSpecialty: [
          'https://schema.org/Neurologic',
          'https://schema.org/Pediatric',
        ],
        affiliation: [
          { '@id': `${pageUrl}#center-kids` },
          { '@id': `${pageUrl}#clinica-colo-de-mae` },
        ],
        sameAs: socialProfiles,
      },
      {
        '@type': 'Organization',
        '@id': `${pageUrl}#center-kids`,
        name: 'Center Kids',
      },
      {
        '@type': 'Organization',
        '@id': `${pageUrl}#clinica-colo-de-mae`,
        name: 'Clínica Colo de Mãe',
      },
    ],
  };
}

try {
  const [{ render }, template] = await Promise.all([
    import(`${pathToFileURL(serverEntry).href}?t=${Date.now()}`),
    readFile(indexPath, 'utf8'),
  ]);

  const stylesheetMatch = template.match(/<link rel="stylesheet"[^>]*href="([^\"]+\.css)"[^>]*>/);
  let htmlTemplate = template;
  let inlinedStylesheetPath = '';

  if (stylesheetMatch) {
    const stylesheetUrl = new URL(stylesheetMatch[1], 'https://local.invalid');
    const relativeStylesheetPath = decodeURIComponent(stylesheetUrl.pathname).replace(/^\/+/, '');
    const stylesheetPath = resolve(clientDirectory, relativeStylesheetPath);
    const stylesheet = await readFile(stylesheetPath, 'utf8');
    htmlTemplate = htmlTemplate.replace(
      stylesheetMatch[0],
      `<style data-build="critical-css">${stylesheet}</style>`,
    );
    inlinedStylesheetPath = stylesheetPath;
  }

  let html = htmlTemplate.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);

  if (siteUrl) {
    const pageUrl = `${siteUrl}/`;
    const socialImageUrl = `${siteUrl}/og-image.jpg`;
    const structuredData = JSON.stringify(buildStructuredData(pageUrl, socialImageUrl)).replace(
      /</g,
      '\\u003c',
    );

    const productionHead = [
      `    <link rel="canonical" href="${pageUrl}" />`,
      `    <meta property="og:url" content="${pageUrl}" />`,
      `    <meta property="og:image" content="${socialImageUrl}" />`,
      '    <meta property="og:image:width" content="1731" />',
      '    <meta property="og:image:height" content="909" />',
      '    <meta property="og:image:alt" content="Mayra Martins — Neuropediatria" />',
      `    <meta name="twitter:image" content="${socialImageUrl}" />`,
      '    <meta name="twitter:image:alt" content="Dra. Mayra Martins — Neuropediatra" />',
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
      'SEO: VITE_SITE_URL não foi definido; canonical, URLs sociais, JSON-LD e sitemap foram omitidos para não inventar o domínio.',
    );
  }

  await writeFile(indexPath, html);
  if (inlinedStylesheetPath) await rm(inlinedStylesheetPath);
} finally {
  await rm(serverDirectory, { recursive: true, force: true });
}
