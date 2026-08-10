import { expect, test } from '@playwright/test';

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
  '/images/hero-consulta.jpg',
  '/images/foto-mayra-benicio.jpg',
  '/images/imagem-dna.png',
  '/images/foto-consultorio-1.jpg',
  '/images/foto-consultorio-2.jpg',
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
      await expect(headerCta).toBeVisible();
      await expect(headerCta).toContainText('Agendar consulta');
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
  await expect(page.getByRole('navigation', { name: 'Navegação móvel' }).locator('a').first()).toBeFocused();
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

test('keeps all service cards accessible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const cards = page.locator('.how-card');
  await expect(cards).toHaveCount(5);
  for (let index = 0; index < 5; index += 1) {
    await expect(cards.nth(index)).toBeVisible();
    await expect(cards.nth(index)).toHaveAttribute('aria-hidden', 'false');
  }
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

  await expect(page.locator('.blobs-grid .blob')).toHaveCount(3);
  await expect(page.locator('.blobs-grid .photo-slot')).toHaveCount(0);
  await expect(page.getByText(/foto de pacientes/i)).toHaveCount(0);
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
  await expect(page.getByText('Center Kids e Clínica Colo de Mãe', { exact: true })).toHaveCount(1);
  await expect(page.getByText('Segunda a Sexta de 8h às 18h', { exact: true })).toHaveCount(2);
});

test('serves the production preview with security headers', async ({ request }) => {
  const response = await request.get('/');
  const contentSecurityPolicy = response.headers()['content-security-policy'];

  expect(contentSecurityPolicy).toContain("default-src 'self'");
  expect(contentSecurityPolicy).toContain('https://*.ingest.sentry.io');
  expect(contentSecurityPolicy).toContain('https://*.ingest.us.sentry.io');
  expect(contentSecurityPolicy).toContain('https://www.googletagmanager.com');
  expect(contentSecurityPolicy).toContain('https://www.google-analytics.com');
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
});
