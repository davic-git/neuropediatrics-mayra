# Relatório de auditoria — 2026-08-09

## Resultado

Auditoria executada no build de produção local, com Lighthouse e Playwright Chromium. Desktop atingiu 100 em Performance, Accessibility, Best Practices e SEO. Mobile atingiu 93 em Performance e 100 nas outras três categorias.

| Métrica | Mobile antes | Mobile depois | Desktop antes | Desktop depois |
|---|---:|---:|---:|---:|
| Performance | 68 | 93 | 85 | 100 |
| Accessibility | 95 | 100 | 95 | 100 |
| Best Practices | 100 | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| FCP | 3,3 s | 2,4 s | 0,7 s | 0,5 s |
| LCP | 27,1 s | 2,7 s | 2,7 s | 0,6 s |
| TBT | 0 ms | 0 ms | 0 ms | 0 ms |
| CLS | 0,026 | 0,024 | 0,014 | 0,014 |

O Lighthouse concluiu a auditoria e gravou os JSONs, mas a CLI retornou `EPERM` ao tentar remover sua própria pasta temporária no Windows. Isso não afetou os relatórios.

## Rede e bundle

| Recurso | Antes | Depois |
|---|---:|---:|
| Transferência inicial mobile | 5.069.245 B | 293.266 B |
| Imagens mobile | 4.622.235 B | 80.790 B |
| Fontes mobile | 359.960 B | 124.108 B |
| JavaScript | 224,66 kB / 71,89 kB gzip | 225,49 kB / 72,26 kB gzip |
| CSS | 22,46 kB / 5,59 kB gzip, 1 request | 22,31 kB / 5,52 kB gzip, inline, 0 requests |

O pequeno aumento de JavaScript vem dos metadados de `srcset`/`sizes`. Não foi feito code splitting artificial porque há um único bundle pequeno, TBT zero e uma única landing page.

## Principais correções

- Corrigido o Hero mobile que colapsava para `0×0`; a fotografia LCP agora aparece em portrait e landscape.
- Fotografias convertidas para AVIF responsivo; logos convertidos para WebP responsivo, sem troca de arte ou crop.
- Logo do rodapé usa lazy loading; LCP usa eager loading, `fetchpriority`, dimensões e preload responsivo gerado pelo React.
- Sofia Pro convertida de OTF para WOFF2 e limitada aos dois pesos usados; Inter continua local.
- CSS incorporado ao HTML prerenderizado para eliminar o request bloqueante.
- Contraste do crédito da citação corrigido; Lighthouse Accessibility passou de 95 para 100.
- Navbar deixa de renderizar React a cada scroll e usa um RAF; carrossel consolidou resize/scroll, cleanup e unidades `svh`.
- Safe areas adicionadas ao botão flutuante; nome acessível do WhatsApp tornou-se descritivo.
- CSP e demais headers adicionados, cache de assets/HTML definido, URLs de build normalizadas e dependências auditadas com zero vulnerabilidades conhecidas.
- Coverage, dois testes de componentes, `npm run check`, Dependabot e matriz E2E de 20 viewports foram adicionados.

## Testes finais

- Typecheck: passou.
- ESLint: passou sem warnings.
- Vitest: 7/7 testes passaram.
- Coverage: statements 70,20%; branches 58,99%; functions 77,90%; lines 72,83%.
- Playwright: 24/24 testes passaram em 20 viewports, incluindo menu, FAQ, reduced motion, links externos, overflow, console/rede e headers.
- `npm audit`: 0 vulnerabilidades conhecidas.

## SEO e pendências

Title final: `Mayra Martins | Neuropediatria`.

Description final: `Acompanhamento neuropediátrico humanizado para o desenvolvimento do seu filho. Dra. Mayra Martins — consultas, avaliações e orientação para famílias.`

O HTML inicial contém as sete seções prerenderizadas, um único `h1`, landmarks e metadados sociais sem depender da execução do JavaScript. Canonical, `og:url`, JSON-LD WebSite e sitemap são gerados apenas com `VITE_SITE_URL`. Endereço, respostas de FAQ, quatro imagens e a imagem OG continuam pendentes por dependerem de dados/arquivos aprovados.

## Decisões conservadoras

- Não foi adotado Preact, SSR complexo, divisão agressiva de CSS ou reescrita do carrossel para perseguir dois pontos adicionais no Lighthouse mobile; o risco de regressão visual/CLS não se justificava.
- Não foram atualizados TypeScript 7 ou `@types/node` 26 por serem mudanças maiores sem benefício de segurança. `npm audit` está limpo.
- Não foi instalado tracking, Sentry, Analytics, banner de cookies ou backend. O risco residual é **baixo** para uma landing page pública, condicionado à publicação correta dos headers e HTTPS pelo host.
