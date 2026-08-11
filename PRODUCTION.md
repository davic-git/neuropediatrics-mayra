# Checklist de produção

Este documento registra decisões que dependem de dados reais ou da hospedagem. Nenhuma informação profissional, médica ou comercial foi inventada.

## Pendências externas

- Confirmar e preencher o endereço real em `src/data/contact.ts`.
- Fornecer e aprovar clinicamente as respostas em `src/data/faq.ts`.
- Confirmar cidade e UF principais antes de incluí-las no title, conteúdo, NAP ou dados estruturados.
- Fornecer CRM/RQE, URL do Google Business/Maps e Doctoralia, caso existam e sejam oficiais.
- Confirmar os vínculos com Center Kids e Clínica Colo de Mãe e fornecer os respectivos endereços reais.
- Fornecer uma imagem social definitiva aprovada; o build usa atualmente `public/og-image.jpg`.

## Segurança e headers

`public/_headers` configura CSP, HSTS, proteção contra framing, `nosniff`, referrer policy, permissions policy e cache para hosts estáticos compatíveis com o formato `_headers`. O `vite preview` aplica a mesma política, exceto HSTS, para permitir validação E2E.

A plataforma final deve confirmar que esses headers foram realmente publicados. HSTS só deve permanecer ativo quando o domínio e seus subdomínios funcionarem exclusivamente em HTTPS. `style-src 'unsafe-inline'` é necessário porque o CSS crítico é incorporado ao HTML e as animações calculam estilos inline; `unsafe-eval` não é usado.

Assets com hash devem receber cache imutável de um ano. HTML deve usar `no-cache`. Source maps públicos não são gerados no build atual.

## Assets e fontes

- As duas fotografias aprovadas são servidas em AVIF responsivo, mantendo os JPEG originais no repositório.
- Os logos usam variantes WebP responsivas de 2×/4×, recortadas exatamente da arte original; os PNG originais foram preservados.
- Sofia Pro permanece a tipografia de títulos. Somente os pesos 700 e 900 usados são servidos, em WOFF2 com os blocos latinos necessários; os OTF originais permanecem preservados.
- Inter permanece a tipografia de corpo, empacotada localmente pelo `@fontsource/inter`, sem chamadas a Google Fonts.

## Operação e monitoramento

- A pipeline executa `npm ci`, `npm audit`, `npm run check`, instalação do Chromium e `npm run test:e2e`.
- Ative proteção de branch exigindo CI verde antes de merge.
- Configure monitor de uptime gratuito ou do próprio host para a URL principal.
- Acompanhe Core Web Vitals do host sem adicionar tracking invasivo. Qualquer Analytics/Sentry futuro exige avaliação de consentimento, cookies, minimização de dados e LGPD.
- Um formulário futuro exigirá validação server-side, rate limiting, anti-spam, proteção de dados e CSRF conforme a arquitetura. Nenhum backend foi criado agora.
