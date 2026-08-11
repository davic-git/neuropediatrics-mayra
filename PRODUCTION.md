# Checklist de produção

Este documento registra decisões que dependem de dados reais ou da hospedagem. Nenhuma informação profissional, médica ou comercial foi inventada.

## Pendências externas

- Fornecer e aprovar clinicamente as respostas em `src/data/faq.ts`.
- Fornecer uma imagem social definitiva aprovada; o build usa atualmente `public/og-image.jpg`.

## Dados confirmados

- Cidade/UF profissional: Volta Redonda - RJ.
- Registro profissional: CRM RJ 52100773-4.
- Qualificação de especialista: RQE 57481.
- Perfil profissional no Doctoralia: `https://www.doctoralia.com.br/mayra-martins-6/pediatra/volta-redonda`.
- Canal oficial no YouTube: `https://www.youtube.com/channel/UC5OpW7xubz-Qoum9aXM5hYA`.
- Perfil profissional no Google Maps/Google Business: `https://maps.app.goo.gl/XkDMnif7T6Szp8En8`.
- Colo de Mãe: R. Vinte e Um, 87 - Vila Santa Cecília, Volta Redonda - RJ, 27261-610.
- O endereço acima pertence ao local de atendimento e não é o endereço pessoal da Dra. Mayra Martins.

## Segurança e headers

`vercel.json` é a fonte efetiva dos headers no deployment da Vercel. `public/_headers` mantém a mesma política para hosts estáticos compatíveis com esse formato, e `vite.config.ts` a replica no preview local, exceto HSTS, para permitir validação E2E. `npm run verify:security-headers` compara as três cópias e interrompe o build se houver divergência.

O `connect-src` permite explicitamente `https://www.google.com` porque a Google tag atual pode usar `https://www.google.com/g/collect`. O domínio raiz `https://google.com`, curingas, endpoints de Ads e DoubleClick não são liberados sem request real ou recurso configurado que os justifique. `ERR_BLOCKED_BY_CLIENT` é bloqueio do navegador/extensão e não deve ser contornado pela CSP.

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
