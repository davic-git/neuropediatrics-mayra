import { chromium } from '@playwright/test';

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const siteUrl = process.env.PRODUCTION_URL ?? readArgument('--url');
const expectedMeasurementId =
  process.env.EXPECTED_GA_MEASUREMENT_ID ?? readArgument('--measurement-id');
const browserChannel = readArgument('--channel');

if (!siteUrl) {
  throw new Error('Set PRODUCTION_URL or pass --url.');
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
  const hasExpectedMeasurementId =
    !expectedMeasurementId || parameters.get('tid') === expectedMeasurementId;
  return hasExpectedMeasurementId && parameters.get('en') === eventName;
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

async function waitForCollectResponse(page, eventName) {
  return page.waitForResponse(
    (response) => response.ok() && isCollectRequest(response.request(), eventName),
    { timeout: 20_000 },
  );
}

async function dispatchTrackedClick(page, eventName) {
  const responsePromise = waitForCollectResponse(page, eventName);

  await page.locator(`[data-analytics-event="${eventName}"]`).first().evaluate((element) => {
    element.addEventListener('click', (event) => event.preventDefault(), {
      capture: true,
      once: true,
    });
    element.click();
  });

  return responsePromise;
}

const browser = await chromium.launch(browserChannel ? { channel: browserChannel } : undefined);
const page = await browser.newPage();
const responseErrors = [];
const consoleErrors = [];
const googleRequests = [];
const fontRequests = [];
const obsoleteAssetRequests = [];

await page.addInitScript(() => {
  window.__cspViolations = [];
  document.addEventListener('securitypolicyviolation', (event) => {
    window.__cspViolations.push({
      blockedURI: event.blockedURI,
      directive: event.effectiveDirective,
    });
  });
});

page.on('request', (request) => {
  const url = new URL(request.url());
  if (
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('analytics.google.com') ||
    url.hostname === 'www.googletagmanager.com' ||
    url.hostname === 'www.google.com'
  ) {
    const parameters = requestParameters(request);
    googleRequests.push({
      host: url.host,
      path: url.pathname,
      measurementId: parameters.get('tid') ?? parameters.get('id'),
      eventName: parameters.get('en'),
    });
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    fontRequests.push(request.url());
  }
  if (
    ['/favicon.svg', '/images/imagem-dna.png', '/images/foto-consultorio-1.jpg', '/images/foto-consultorio-2.jpg'].includes(
      url.pathname,
    )
  ) {
    obsoleteAssetRequests.push(request.url());
  }
});

page.on('response', (response) => {
  if (response.status() >= 400) {
    responseErrors.push(`${response.status()} ${response.url()}`);
  }
});
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});

try {
  const tagScriptPromise = page.waitForResponse(
    (response) =>
      response.url().startsWith('https://www.googletagmanager.com/gtag/js') && response.ok(),
    { timeout: 20_000 },
  );
  const pageViewPromise = waitForCollectResponse(page, 'page_view');

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

  const tagScriptResponse = await tagScriptPromise;
  const pageViewResponse = await pageViewPromise;
  const scrollPromise = waitForCollectResponse(page, 'scroll');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const scrollResponse = await scrollPromise;
  const whatsappResponse = await dispatchTrackedClick(page, 'click_whatsapp');
  const appointmentResponse = await dispatchTrackedClick(page, 'click_agendar_consulta');
  const phoneResponse = await dispatchTrackedClick(page, 'click_phone');
  const emailResponse = await dispatchTrackedClick(page, 'click_email');
  const runtimeState = await page.evaluate(() => ({
    dataLayerExists: Array.isArray(window.dataLayer),
    gtagType: typeof window.gtag,
    scriptSrc: document.querySelector('script[src*="googletagmanager.com/gtag/js"]')?.src,
    speedInsightsScript: document.querySelector('script[src*="_vercel/speed-insights"]')?.src,
    cspViolations: window.__cspViolations,
  }));
  const faviconResponse = await page.request.get(new URL('/favicon.ico', siteUrl).href);

  const relevantConsoleErrors = consoleErrors.filter(
    (message) =>
      message.includes('Content Security Policy') ||
      message.includes('violates the following Content Security Policy') ||
      message.includes('fonts.gstatic.com') ||
      message.includes('fonts.googleapis.com') ||
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

  if (
    !faviconResponse.ok() ||
    relevantConsoleErrors.length ||
    relevantResponseErrors.length ||
    runtimeState.cspViolations.length ||
    fontRequests.length ||
    obsoleteAssetRequests.length
  ) {
    throw new Error(
      JSON.stringify({
        faviconStatus: faviconResponse.status(),
        relevantConsoleErrors,
        relevantResponseErrors,
        cspViolations: runtimeState.cspViolations,
        fontRequests,
        obsoleteAssetRequests,
      }),
    );
  }

  console.log(
    JSON.stringify(
      {
        runtimeState,
        tagScriptStatus: tagScriptResponse.status(),
        requests: {
          page_view: summarizeCollectRequest(pageViewResponse.request()),
          scroll: summarizeCollectRequest(scrollResponse.request()),
          click_whatsapp: summarizeCollectRequest(whatsappResponse.request()),
          click_agendar_consulta: summarizeCollectRequest(appointmentResponse.request()),
          click_phone: summarizeCollectRequest(phoneResponse.request()),
          click_email: summarizeCollectRequest(emailResponse.request()),
        },
        faviconStatus: faviconResponse.status(),
        relevantConsoleErrors,
        relevantResponseErrors,
        fontRequests,
        obsoleteAssetRequests,
        googleRequests,
      },
      null,
      2,
    ),
  );
} catch (error) {
  const runtimeState = await page.evaluate(() => ({
    dataLayerExists: Array.isArray(window.dataLayer),
    dataLayerCommands: Array.isArray(window.dataLayer)
      ? window.dataLayer.map((command) => [command[0], command[1]])
      : [],
    gtagType: typeof window.gtag,
    scriptSrc: document.querySelector('script[src*="googletagmanager.com/gtag/js"]')?.src,
    speedInsightsScript: document.querySelector('script[src*="_vercel/speed-insights"]')?.src,
    cspViolations: window.__cspViolations,
  }));

  console.error(
    JSON.stringify(
      {
        error: error instanceof Error ? error.message : String(error),
        runtimeState,
        googleRequests,
        fontRequests,
        obsoleteAssetRequests,
        consoleErrors,
        responseErrors,
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
} finally {
  await browser.close();
}
