# Auditoria e implementação de SEO — 2026-08-11

## Resumo executivo

A Home foi otimizada de forma conservadora para reforçar a entidade da Dra. Mayra Martins e sua atuação em neuropediatria. Não houve alteração de CSS, layout, integrações, rotas ou conteúdo clínico. Cidade, endereço, CRM/RQE, Google Business/Maps e Doctoralia não foram adicionados porque não há dados confiáveis no projeto que os confirmem.

## Auditoria anterior à implementação

### O que já estava correto

- Documento em `pt-BR`, viewport e theme color configurados.
- Uma única Home, com uma única tag `h1` e sequência coerente de `h2`/`h3`.
- Sete seções semânticas dentro de `main`, além de `header`, navegação e `footer`.
- Conteúdo principal disponível no HTML prerenderizado.
- Open Graph e Twitter Cards existentes.
- Canonical, `og:url`, imagem social, JSON-LD, `robots.txt` e `sitemap.xml` gerados no build de produção a partir de `VITE_SITE_URL`.
- Links internos apontando somente para seções existentes; nenhuma URL interna quebrada ou página duplicada.
- Duas fotografias com `alt` descritivo, `width`, `height`, AVIF responsivo, `srcset` e `sizes`.
- Imagem principal com `loading="eager"` e `fetchPriority="high"`; imagem secundária e logo do footer com lazy loading.
- Telefone, e-mail, horário e nomes das clínicas centralizados em dados compartilhados.
- GA4, Sentry, Vercel Speed Insights, CSP, headers, robots, sitemap e prerender preservados.

### O que precisava mudar

- Title genérico, sem o prefixo profissional e sem a forma natural “Neuropediatra”.
- Description pouco explícita quanto a nome, neuropediatria infantil e proposta de atendimento.
- H1 não identificava a Dra. Mayra nominalmente.
- H2 “Porque nos escolher?” era genérico e pouco útil para a entidade.
- JSON-LD descrevia apenas `WebSite`, sem entidade da médica nem relações.
- Rótulo “Endereço” era incorreto: o valor continha somente nomes de locais de atendimento.
- Clínicas apareciam na seção de contato, mas não no footer.
- Faltava `twitter:image:alt` e não havia teste dedicado do SEO prerenderizado.

### Riscos de regressão considerados

- Duplicação de canonical, OG ou JSON-LD durante o prerender.
- Inserção de cidade, endereço, CRM ou perfil pertencente a outra profissional homônima.
- JSON-LD sintaticamente válido, porém com entidades duplicadas ou desconectadas.
- Mudança de texto causando overflow ou alteração visual indesejada.
- Quebra de robots, sitemap, integrações, headers ou prerender.

## Resultado implementado

### Metadados finais

- Title (34 caracteres): `Dra. Mayra Martins | Neuropediatra`
- Meta description (147 caracteres): `Dra. Mayra Martins oferece acompanhamento em neuropediatria infantil, com avaliação individualizada, ciência, acolhimento e orientação às famílias.`
- Canonical: `https://www.dramayramartins.com.br/`
- OG e Twitter usam o mesmo title e description; URL, imagem e textos alternativos estão presentes no HTML final.

“Volta Redonda - RJ” não foi usado porque a cidade/UF não está confirmada em nenhum dado confiável do repositório.

### Hierarquia de headings

- H1: `Dra. Mayra Martins: cuidado neuropediátrico para o desenvolvimento do seu filho`
- H2 principais:
  - `Conheça a Dra. Mayra Martins`
  - `Como podemos ajudar?`
  - `Se sua criança tiver`
  - `Para famílias`
  - `Perguntas frequentes`
  - `Cada criança possui um caminho único de desenvolvimento.`
- H3 continuam identificando cards e subtópicos. O footer mantém H2 próprios para navegação e contato.

### JSON-LD e entidades

O build cria um único `@graph`, com referências por `@id` estável:

- `WebSite`: `https://www.dramayramartins.com.br/#website`
- `WebPage`: `https://www.dramayramartins.com.br/#webpage`
- `Person` + `Physician`: `https://www.dramayramartins.com.br/#physician`
- `ImageObject`: `https://www.dramayramartins.com.br/#primaryimage`
- `Organization`: Center Kids
- `Organization`: Clínica Colo de Mãe

A `WebPage` aponta para a médica com `mainEntity`; a médica aponta para a imagem, para as duas organizações por `affiliation` e para os perfis oficiais. `medicalSpecialty` usa os valores Schema.org `Neurologic` e `Pediatric`. Não foram adicionados `address`, CRM/RQE ou tipos de negócio local incompletos.

### sameAs utilizados

- `https://www.instagram.com/dra.mayra_martins/`
- `https://www.threads.com/@dra.mayra_martins`
- `https://www.facebook.com/dra.maymartins/`

Parâmetros de rastreamento foram removidos das URLs de entidade. Doctoralia e Google Business/Maps não foram usados por falta de URL confirmada.

### SEO local

- O falso rótulo “Endereço” foi substituído por “Locais de atendimento”.
- Center Kids e Clínica Colo de Mãe passaram a aparecer de forma consistente no contato, footer e grafo de entidade.
- Telefone e e-mail permanecem consistentes no conteúdo e no JSON-LD.
- Nenhuma localização foi inferida pelo DDD do telefone.

### Imagens

- Os `alt` existentes já eram naturais e foram preservados.
- Dimensões, responsividade, prioridades de carregamento e nomes descritivos foram preservados.
- Nenhuma imagem ou dependência foi adicionada.

### Links, páginas e URLs

- Links internos continuam apontando apenas para âncoras existentes.
- Breadcrumbs não foram adicionados: existe somente uma Home, sem hierarquia de rotas.
- Não foram criadas `/neuropediatria`, `/sobre`, `/tdah`, `/tea-autismo`, `/epilepsia` ou `/atraso-no-desenvolvimento`, pois não há conteúdo médico aprovado suficiente para páginas únicas e úteis.
- Sitemap permanece com somente a Home canônica indexável.

## Arquivos alterados

- `index.html`
- `scripts/prerender.mjs`
- `src/sections/Hero.tsx`
- `src/sections/About.tsx`
- `src/sections/Contact.tsx`
- `src/components/Footer.tsx`
- `e2e/site.spec.ts`
- `PRODUCTION.md`
- `SEO_AUDIT_REPORT.md`

## Validação

- `npm run typecheck`: passou.
- `npm run lint`: passou.
- `npm test`: 23/23 testes passaram.
- `npm run build`: passou; client, SSR e prerender concluídos.
- `npm run test:e2e`: 32/32 testes passaram em 20 viewports.
- `npm audit`: 0 vulnerabilidades.
- HTML final: 1 title, 1 description, 1 canonical, 1 H1, 1 JSON-LD e 1 `og:title`.
- Canonical final: `https://www.dramayramartins.com.br/`.
- Robots final referencia `https://www.dramayramartins.com.br/sitemap.xml`.
- Sitemap final contém somente `https://www.dramayramartins.com.br/`.
- O teste E2E faz parse do HTML bruto, valida metadados, canonical, H1, entidades, `sameAs` e ausência deliberada de endereço.

O primeiro Vitest dentro do sandbox falhou com `spawn EPERM` ao iniciar o Vite no Windows. A mesma suíte executada fora do sandbox passou integralmente; não foi falha de código.

## Bundle e performance

- Nenhuma dependência, imagem, fonte, folha de estilo ou código client-side de SEO foi adicionado.
- O JSON-LD é inserido apenas pelo prerender e não entra no bundle do navegador.
- Build atual: JavaScript `313,89 kB` (`101,99 kB` gzip informado pelo Vite) e CSS `22,72 kB` (`5,56 kB` gzip antes de ser incorporado ao HTML pelo prerender).
- Impacto esperado em runtime e Core Web Vitals: desprezível; as mudanças client-side são somente textos já renderizados.

## Dados ainda necessários

- Cidade e UF principais.
- Endereço completo e validado de cada local de atendimento.
- Confirmação formal do vínculo atual com Center Kids e Clínica Colo de Mãe.
- CRM e RQE, se a médica aprovar sua publicação.
- URLs oficiais de Google Business/Maps e Doctoralia.
- Confirmação de que telefone, e-mail e horário publicados continuam atuais.
- Respostas médicas aprovadas para o FAQ.
- Conteúdo clínico revisado para qualquer página temática futura.
- Imagem OG definitiva aprovada; o build usa atualmente `public/og-image.jpg`.

## Próximos passos no Search Console

1. Publicar o build e inspecionar a URL canônica.
2. Solicitar nova indexação da Home após confirmar que o HTML publicado contém os metadados e o grafo.
3. Reenviar ou conferir a leitura de `/sitemap.xml`.
4. Acompanhar indexação, consultas, CTR, Core Web Vitals e eventuais melhorias de dados estruturados.
5. Depois de fornecer os dados pendentes, alinhar site e Google Business Profile sem divergências de nome, endereço e telefone.
