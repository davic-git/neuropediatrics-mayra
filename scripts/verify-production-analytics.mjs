import { chromium } from '@playwright/test';

const siteUrl = process.env.PRODUCTION_URL;
const expectedMeasurementId = process.env.EXPECTED_GA_MEASUREMENT_ID;

if (!siteUrl || !expectedMeasurementId) {
  throw new Error('Set PRODUCTION_URL and EXPECTED_GA_MEASUREMENT_ID before running this check.');
}

function requestParameters(request) {
  const url = new URL(request.url());
  const parameters = new URLSearchParams(url.search);
  const postData = request.postData();

  if (postData) {
    for (const [key, value] of new URLSearchParams(postData)) {
      if (!parameters.has(key)) parameters.set(key, value);
    }
  }

  return parameters;
}

function isCollectRequest(request, eventName) {
  const url = new URL(request.url());
  if (url.pathname !== '/g/collect') return false;

  const parameters = requestParameters(request);
  return parameters.get('tid') === expectedMeasurementId && parameters.get('en') === eventName;
}

function summarizeCollectRequest(request) {
  const url = new URL(request.url());
  const parameters = requestParameters(request);

  return {
    host: url.host,
    path: url.pathname,
    measurementId: parameters.get('tid'),
    eventName: parameters.get('en'),
  };
}

async function dispatchTrackedClick(page, eventName) {
  const requestPromise = page.waitForRequest(
    (request) => isCollectRequest(request, eventName),
    { timeout: 20_000 },
  );

  await page.locator(`[data-analytics-event="${eventName}"]`).first().evaluate((element) => {
    element.addEventListener('click', (event) => event.preventDefault(), {
      capture: true,
      once: true,
    });
    element.click();
  });

  return requestPromise;
}

const browser = await chromium.launch();
const page = await browser.newPage();
const responseErrors = [];
const consoleErrors = [];

page.on('response', (response) => {
  if (response.status() >= 400) {
    responseErrors.push(`${response.status()} ${response.url()}`);
  }
});
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});

try {
  const pageViewPromise = page.waitForRequest(
    (request) => isCollectRequest(request, 'page_view'),
    { timeout: 20_000 },
  );

  const navigationResponse = await page.goto(siteUrl, { waitUntil: 'domcontentloaded' });
  if (!navigationResponse?.ok()) {
    throw new Error(`Production navigation failed with ${navigationResponse?.status()}.`);
  }

  await page.waitForFunction(
    () =>
      document.querySelector('script[src*="googletagmanager.com/gtag/js"]') !== null &&
      Array.isArray(window.dataLayer) &&
      typeof window.gtag === 'function',
    undefined,
    { timeout: 20_000 },
  );

  const pageViewRequest = await pageViewPromise;
  const whatsappRequest = await dispatchTrackedClick(page, 'click_whatsapp');
  const appointmentRequest = await dispatchTrackedClick(page, 'click_agendar_consulta');
  const runtimeState = await page.evaluate(() => ({
    dataLayerExists: Array.isArray(window.dataLayer),
    gtagType: typeof window.gtag,
    scriptSrc: document.querySelector('script[src*="googletagmanager.com/gtag/js"]')?.src,
  }));
  const faviconResponse = await page.request.get(new URL('/favicon.ico', siteUrl).href);

  const relevantConsoleErrors = consoleErrors.filter(
    (message) =>
      message.includes('fonts.gstatic.com') ||
      message.includes('favicon.svg') ||
      message.includes('imagem-dna.png') ||
      message.includes('foto-consultorio'),
  );
  const relevantResponseErrors = responseErrors.filter(
    (message) =>
      message.includes('favicon.svg') ||
      message.includes('imagem-dna.png') ||
      message.includes('foto-consultorio'),
  );

  if (!faviconResponse.ok() || relevantConsoleErrors.length || relevantResponseErrors.length) {
    throw new Error(
      JSON.stringify({ faviconStatus: faviconResponse.status(), relevantConsoleErrors, relevantResponseErrors }),
    );
  }

  console.log(
    JSON.stringify(
      {
        runtimeState,
        requests: {
          page_view: summarizeCollectRequest(pageViewRequest),
          click_whatsapp: summarizeCollectRequest(whatsappRequest),
          click_agendar_consulta: summarizeCollectRequest(appointmentRequest),
        },
        faviconStatus: faviconResponse.status(),
        relevantConsoleErrors,
        relevantResponseErrors,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
