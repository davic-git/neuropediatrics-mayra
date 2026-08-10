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
  '/images/foto-pacientes.jpg',
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
  await expect(menuButton).toHaveAccessibleName('Abrir menu');
  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Navegação móvel' }).locator('a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menuButton).toBeFocused();

  const faqButton = page.locator('.faq-question').first();
  await faqButton.focus();
  await page.keyboard.press('Enter');
  await expect(faqButton).toHaveAttribute('aria-expanded', 'true');
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
});

test('serves the production preview with security headers', async ({ request }) => {
  const response = await request.get('/');
  const contentSecurityPolicy = response.headers()['content-security-policy'];

  expect(contentSecurityPolicy).toContain("default-src 'self'");
  expect(contentSecurityPolicy).toContain('https://*.ingest.sentry.io');
  expect(contentSecurityPolicy).toContain('https://*.ingest.us.sentry.io');
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
});
