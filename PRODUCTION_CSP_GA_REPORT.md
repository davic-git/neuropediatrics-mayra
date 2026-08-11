# Correção de produção — CSP, GA4, fontes e assets

Data: 2026-08-11
Site: https://www.dramayramartins.com.br/
Deployment: `dpl_5cHSULmhq69QCc781dNi84voR54r`

## Resultado

O deployment de produção foi concluído e recebeu estado `READY`. O domínio canônico foi associado ao novo deployment. A CSP publicada permite o fallback observado da Google tag sem ampliar outras diretivas, e a validação em Chrome limpo confirmou GA4, fontes locais, assets e integrações sem erros CSP legítimos.

## Causas raiz

### Google Analytics

A Google tag podia enviar `https://www.google.com/g/collect`, mas `https://www.google.com` não fazia parte de `connect-src`. O navegador bloqueava essa conexão pela CSP. A origem foi adicionada explicitamente porque houve request real e a documentação oficial da Google a lista para conexões da tag.

`ERR_BLOCKED_BY_CLIENT` tem causa diferente: é bloqueio do cliente, normalmente extensão ou proteção anti-tracking. Ele não indica falha da CSP do servidor e nenhuma tentativa de contornar bloqueadores foi implementada.

### Fontes

Não existe referência carregável a Open Sans, `fonts.googleapis.com` ou `fonts.gstatic.com` no código-fonte, dependências importadas, HTML prerenderizado, bundle ou HTML publicado atual. O projeto usa Inter local via `@fontsource/inter` e Sofia Pro local em WOFF2.

Portanto, o request externo relatado não é produzido pelo artefato atual. Ele era compatível com um artefato/cache antigo ou conteúdo injetado no ambiente do cliente, mas a origem histórica exata não pode ser determinada a partir do repositório atual. Após o novo deployment, o Chrome limpo registrou zero requests para Google Fonts e zero erros `font-src`.

### Assets antigos

`/favicon.svg`, `/images/imagem-dna.png`, `/images/foto-consultorio-1.jpg` e `/images/foto-consultorio-2.jpg` não existem e retornam 404 quando solicitados diretamente, o que é esperado para URLs removidas. Nenhum deles é referenciado ou requisitado pela página publicada. O favicon real `/favicon.ico` respondeu 200.

## Fonte de verdade dos headers

- Produção Vercel: `vercel.json`.
- Preview local: `vite.config.ts`.
- Hosts estáticos compatíveis: `public/_headers`.

As três políticas estão sincronizadas. `scripts/verify-security-headers.mjs` compara os valores e interrompe o build se houver divergência ou permissões não autorizadas.

## CSP anterior

```text
default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google-analytics.com https://region1.google-analytics.com; font-src 'self'; connect-src 'self' https://o4511403723718656.ingest.us.sentry.io https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
```

## CSP final

Somente `https://www.google.com` foi acrescentado a `connect-src`:

```text
default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google-analytics.com https://region1.google-analytics.com; font-src 'self'; connect-src 'self' https://o4511403723718656.ingest.us.sentry.io https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com https://www.google.com; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
```

Não foram adicionados `https://google.com`, `*.google.com`, curingas globais, Ads, DoubleClick, `unsafe-eval` ou novas permissões de fonte. HSTS, `object-src 'none'`, `base-uri`, `frame-ancestors`, `nosniff`, Referrer Policy e Permissions Policy foram preservados.

## GA4 em Chrome limpo

Execução: `npm run verify:production:analytics -- --url https://www.dramayramartins.com.br/ --channel chrome`

- `window.dataLayer`: existe.
- `typeof window.gtag`: `function`.
- `gtag.js`: respondeu 200.
- Measurement ID observado: `G-CJFYKDPWGS`.
- `page_view`: resposta em `www.google-analytics.com/g/collect`.
- `scroll`: resposta em `www.google-analytics.com/g/collect`.
- `click_whatsapp`: resposta em `www.google-analytics.com/g/collect`.
- `click_agendar_consulta`: resposta em `www.google-analytics.com/g/collect`.
- `click_phone`: resposta em `www.google-analytics.com/g/collect`.
- `click_email`: resposta em `www.google-analytics.com/g/collect`.
- Violações CSP: zero.
- Erros relevantes de console: zero.

Nesta execução a tag escolheu `www.google-analytics.com`; `www.google.com` permanece permitido para o fallback real anteriormente observado. Um eventual `ERR_BLOCKED_BY_CLIENT` em navegador com bloqueador continua sendo comportamento do cliente, não regressão do site.

## Sentry e Speed Insights

- O bundle publicado contém a configuração do endpoint Sentry.
- O endpoint Sentry permanece em `connect-src`.
- Não houve violação CSP relacionada ao Sentry.
- Não foi enviado erro sintético para não poluir a produção.
- `/_vercel/speed-insights/script.js`: respondeu 200.
- A API Vercel encontrou zero erros de runtime no deployment e zero clusters de erro na última hora.

## Arquivos alterados

- `.gitignore`
- `vercel.json`
- `vite.config.ts`
- `public/_headers`
- `package.json`
- `scripts/verify-security-headers.mjs`
- `scripts/verify-production-analytics.mjs`
- `e2e/site.spec.ts`
- `PRODUCTION.md`
- `PRODUCTION_CSP_GA_REPORT.md`

`.vercel/project.json` foi criado localmente para vincular o workspace ao projeto correto e está ignorado pelo Git.

## Testes

- `npm run verify:security-headers`: passou.
- `npm run typecheck`: passou.
- `npm run lint`: passou.
- `npm test`: 23/23 testes passaram.
- `npm run build`: passou, incluindo SSR e prerender.
- `npm run test:e2e`: 32/32 testes passaram em 20 viewports.
- `npm audit`: zero vulnerabilidades.
- Header CSP real do domínio: contém `https://www.google.com` e corresponde ao `vercel.json`.
- HTML publicado: zero referências a Open Sans, Google Fonts e assets obsoletos.
- Favicon, bundle e Speed Insights: HTTP 200.
- Domínio canônico: sem `X-Robots-Tag`.

## Ausência de regressão

Nenhum layout, CSS visual ou conteúdo foi alterado. GA4, Sentry, Speed Insights, prerender/SSR, Open Graph, canonical, sitemap, robots e JSON-LD permanecem no build. A matriz E2E confirmou responsividade, acessibilidade funcional, headers, SEO e ausência de recursos removidos.
