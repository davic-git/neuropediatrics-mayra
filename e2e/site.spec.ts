import { expect, test } from '@playwright/test';
import { JSDOM } from 'jsdom';

const viewports = [
  { name: 'desktop-qhd', width: 2560, height: 1440 },
  { name: 'desktop-full-hd', width: 1920, height: 1080 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'laptop-small', width: 1280, height: 720 },
  { name: 'tablet-large-portrait', width: 1024, height: 1366 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'tablet-medium', width: 820, height: 1180 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'mobile-large', width: 430, height: 932 },
  { name: 'mobile-medium', width: 412, height: 915 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'mobile-compact', width: 375, height: 812 },
  { name: 'mobile-small', width: 360, height: 800 },
  { name: 'mobile-minimum', width: 320, height: 568 },
  { name: 'phone-landscape-large', width: 932, height: 430 },
  { name: 'phone-landscape', width: 844, height: 390 },
  { name: 'phone-landscape-medium', width: 812, height: 375 },
  { name: 'phone-landscape-small', width: 740, height: 360 },
  { name: 'phone-landscape-minimum', width: 667, height: 375 },
] as const;

const expectedUnavailablePreviewResources = new Set([
  '/_vercel/speed-insights/script.js',
]);

for (const viewport of viewports) {
  test(`renders without horizontal overflow at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const runtimeErrors: string[] = [];
    const unexpectedResponses: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error' && !message.text().includes('Failed to load resource')) {
        runtimeErrors.push(message.text());
      }
    });
    page.on('pageerror', (error) => runtimeErrors.push(error.message));
    page.on('response', (response) => {
      const url = new URL(response.url());
      if (
        url.origin === 'http://127.0.0.1:4175' &&
        response.status() >= 400 &&
        !expectedUnavailablePreviewResources.has(url.pathname)
      ) {
        unexpectedResponses.push(`${response.status()} ${url.pathname}`);
      }
    });

    await page.goto('/');
    if (viewport.width <= 860) {
      const headerCta = page.locator('.site-header .header-cta');
      await expect(headerCta).toBeHidden();
      await expect(page.locator('.brand-logo-header img')).toHaveAttribute('src', /logo-horizontal-mayra/);
    }
    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main > section')).toHaveCount(7);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(runtimeErrors).toEqual([]);
    expect(unexpectedResponses).toEqual([]);
  });
}

test('supports the mobile menu and FAQ by keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const menuButton = page.locator('.nav-toggle');
  await expect(menuButton).toHaveCSS('color', 'rgb(34, 50, 47)');
  await expect(menuButton).toHaveAccessibleName('Abrir menu');
  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(menuButton).toHaveCSS('color', 'rgb(34, 50, 47)');
  const mobileNav = page.getByRole('navigation', { name: 'Navegação móvel' });
  const firstMobileLink = mobileNav.locator('ul a').first();
  await expect(firstMobileLink).toBeFocused();
  await expect(firstMobileLink).toHaveCSS('box-shadow', 'none');
  const mobileCta = mobileNav.locator('.btn');
  await expect(mobileCta).toBeVisible();
  await expect(mobileCta).toContainText('Agendar consulta');
  await expect(mobileCta).toHaveCSS('color', 'rgb(249, 245, 236)');
  await page.keyboard.press('Escape');
  await expect(menuButton).toBeFocused();

  const faqButton = page.locator('.faq-question').first();
  const faqPanel = page.locator('.faq-answer').first();
  await expect(faqPanel).toHaveCSS('transition-duration', '0.4s, 0s');
  await faqButton.focus();
  await page.keyboard.press('Enter');
  await expect(faqButton).toHaveAttribute('aria-expanded', 'true');
  await expect(faqPanel).toHaveAttribute('aria-hidden', 'false');
  const panelId = await faqButton.getAttribute('aria-controls');
  await expect(page.locator(`#${panelId}`)).toBeVisible();
});

test('navigates the service carousel with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const cards = page.locator('.how-card');
  await expect(cards).toHaveCount(5);
  await expect(page.locator('.how-status')).toHaveText('1 de 5');
  await page.getByRole('button', { name: 'Próxima etapa' }).click();
  await expect(page.locator('.how-status')).toHaveText('2 de 5');
});

test('keeps the original icon and family card colors', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.mini-icon').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(page.locator('.familia-icon').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(page.locator('.familia-card h3').first()).toHaveCSS('color', 'rgb(249, 245, 236)');
  await expect(page.locator('.familia-card p').first()).toHaveCSS('color', 'rgba(249, 245, 236, 0.9)');
});

test('keeps clear spacing between social links and footer copyright', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const footerPadding = await page.locator('.footer-grid').evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).paddingBottom),
  );
  expect(footerPadding).toBeGreaterThanOrEqual(72);
});

test('keeps the experience badge above the Mayra and Benício photo on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.locator('.sobre-badge')).toHaveCSS('z-index', '2');
  await expect(page.locator('.sobre-photo img')).toHaveCSS('z-index', '1');
});

test('keeps only the decorative color blobs in the conditions section', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.blobs-grid .blob')).toHaveCount(4);
  await expect(page.locator('.blobs-grid .blob-green')).toHaveCount(1);
  await expect(page.locator('.blobs-grid .photo-slot')).toHaveCount(0);
  await expect(page.getByText(/foto de pacientes/i)).toHaveCount(0);
});

test('shows one service card on mobile and advances one card per click', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const viewport = page.locator('.how-carousel-viewport');
  await viewport.scrollIntoViewIfNeeded();
  const cards = page.locator('.how-card');
  const viewportBox = await viewport.boundingBox();
  const firstBox = await cards.nth(0).boundingBox();
  const secondBoxBefore = await cards.nth(1).boundingBox();
  expect(viewportBox && firstBox && secondBoxBefore).toBeTruthy();
  expect(firstBox!.width).toBeCloseTo(viewportBox!.width, 0);
  expect(secondBoxBefore!.x).toBeGreaterThanOrEqual(viewportBox!.x + viewportBox!.width);

  await page.getByRole('button', { name: 'Próxima etapa' }).click();
  await expect(page.locator('.how-status')).toHaveText('2 de 5');
  await expect.poll(async () => (await cards.nth(1).boundingBox())?.x).toBeCloseTo(viewportBox!.x, 0);
});

test('shows two service cards on desktop and advances one card per click', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const viewport = page.locator('.how-carousel-viewport');
  await viewport.scrollIntoViewIfNeeded();
  const cards = page.locator('.how-card');
  const viewportBox = await viewport.boundingBox();
  const firstBox = await cards.nth(0).boundingBox();
  const secondBox = await cards.nth(1).boundingBox();
  const thirdBoxBefore = await cards.nth(2).boundingBox();
  expect(viewportBox && firstBox && secondBox && thirdBoxBefore).toBeTruthy();
  expect(firstBox!.width + secondBox!.width).toBeLessThan(viewportBox!.width);
  expect(thirdBoxBefore!.x).toBeGreaterThanOrEqual(viewportBox!.x + viewportBox!.width);
  await expect(page.locator('.how-status')).toHaveText('1–2 de 5');

  await page.getByRole('button', { name: 'Próxima etapa' }).click();
  await expect(page.locator('.how-status')).toHaveText('2–3 de 5');
  await expect.poll(async () => (await cards.nth(1).boundingBox())?.x).toBeCloseTo(viewportBox!.x, 0);
});

test('opens external links safely and builds WhatsApp URLs correctly', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('a[target="_blank"]');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    await expect(links.nth(index)).toHaveAttribute('rel', /noopener/);
  }

  const whatsAppLinks = page.locator('a.btn-whatsapp');
  expect(await whatsAppLinks.count()).toBeGreaterThan(0);
  for (let index = 0; index < (await whatsAppLinks.count()); index += 1) {
    await expect(whatsAppLinks.nth(index)).toHaveAttribute('href', /^https:\/\/wa\.me\/5524999459027\?text=/);
  }

  const emailLinks = page.locator('a[href="mailto:dra.mayramartinsneuro@gmail.com"]');
  await expect(emailLinks).toHaveCount(2);
  await expect(page.getByText('Center Kids e Clínica Colo de Mãe', { exact: true })).toHaveCount(2);
  await expect(page.getByText('Segunda a Sexta de 8h às 18h', { exact: true })).toHaveCount(2);
});

test('serves complete prerendered SEO metadata and a connected entity graph', async ({ request }) => {
  const response = await request.get('/');
  const html = await response.text();
  const { document } = new JSDOM(html).window;

  expect(document.title).toBe('Dra. Mayra Martins | Neuropediatra');
  expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
    'neuropediatria infantil',
  );
  expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
    'https://www.dramayramartins.com.br/',
  );
  expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
    'https://www.dramayramartins.com.br/',
  );
  expect(document.querySelector('meta[name="twitter:image:alt"]')).not.toBeNull();
  expect(document.querySelectorAll('h1')).toHaveLength(1);
  expect(document.querySelector('h1')?.textContent).toContain('Dra. Mayra Martins');

  const jsonLd = document.querySelector('script[type="application/ld+json"]')?.textContent;
  expect(jsonLd).toBeTruthy();
  const structuredData = JSON.parse(jsonLd!);
  const graph = structuredData['@graph'] as Array<Record<string, unknown>>;
  const physician = graph.find((entity) => entity['@id']?.toString().endsWith('#physician'));

  expect(graph).toHaveLength(6);
  expect(physician?.['@type']).toEqual(['Person', 'Physician']);
  expect(physician?.sameAs).toEqual([
    'https://www.instagram.com/dra.mayra_martins/',
    'https://www.threads.com/@dra.mayra_martins',
    'https://www.facebook.com/dra.maymartins/',
  ]);
  expect(physician).not.toHaveProperty('address');
});

test('serves the production preview with security headers', async ({ request }) => {
  const response = await request.get('/');
  const contentSecurityPolicy = response.headers()['content-security-policy'];

  expect(contentSecurityPolicy).toContain("default-src 'self'");
  expect(contentSecurityPolicy).toContain(
    "script-src 'self' https://www.googletagmanager.com",
  );
  expect(contentSecurityPolicy).toContain(
    "img-src 'self' data: https://www.google-analytics.com https://region1.google-analytics.com",
  );
  expect(contentSecurityPolicy).toContain("font-src 'self'");
  expect(contentSecurityPolicy).toContain(
    "connect-src 'self' https://o4511403723718656.ingest.us.sentry.io https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com https://www.google.com",
  );
  expect(contentSecurityPolicy).not.toContain('https://google.com');
  expect(contentSecurityPolicy).not.toContain('*.google.com');
  expect(contentSecurityPolicy).not.toContain('unsafe-eval');
  expect(contentSecurityPolicy).not.toContain('https://*.ingest');
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
});

test('serves the favicon and contains no removed image or external font references', async ({
  page,
  request,
}) => {
  const faviconResponse = await request.get('/favicon.ico');
  expect(faviconResponse.ok()).toBe(true);

  await page.goto('/');
  const html = await page.locator('html').evaluate((element) => element.outerHTML);
  expect(html).not.toContain('/favicon.svg');
  expect(html).not.toContain('/images/imagem-dna.png');
  expect(html).not.toContain('/images/foto-consultorio-1.jpg');
  expect(html).not.toContain('/images/foto-consultorio-2.jpg');
  expect(html).not.toContain('fonts.googleapis.com');
  expect(html).not.toContain('fonts.gstatic.com');
  expect(html).not.toContain('Open Sans');
});
