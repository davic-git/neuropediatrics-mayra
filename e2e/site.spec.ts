import { expect, test } from '@playwright/test';

const viewports = [
  { name: 'desktop-full-hd', width: 1920, height: 1080 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'mobile-small', width: 360, height: 800 },
  { name: 'phone-landscape', width: 844, height: 390 },
  { name: 'phone-landscape-small', width: 740, height: 360 },
] as const;

const expectedPendingImages = new Set([
  '/images/hero-consulta.jpg',
  '/images/foto-mayra-benicio.jpg',
  '/images/foto-pacientes.jpg',
  '/images/imagem-dna.png',
  '/images/foto-consultorio-1.jpg',
  '/images/foto-consultorio-2.jpg',
]);

for (const viewport of viewports) {
  test(`renders without horizontal overflow at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const unexpectedResponses: string[] = [];
    page.on('response', (response) => {
      const url = new URL(response.url());
      if (
        url.origin === 'http://127.0.0.1:4175' &&
        response.status() >= 400 &&
        !expectedPendingImages.has(url.pathname)
      ) {
        unexpectedResponses.push(`${response.status()} ${url.pathname}`);
      }
    });

    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main > section')).toHaveCount(7);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
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

test('opens WhatsApp links safely in a new tab', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('a[target="_blank"]');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    await expect(links.nth(index)).toHaveAttribute('rel', /noopener/);
    await expect(links.nth(index)).toHaveAttribute('href', /^https:\/\/wa\.me\//);
  }
});
