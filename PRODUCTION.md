# Checklist de produção

Este documento registra decisões que dependem de informações reais ou da plataforma de hospedagem. Nenhum dado foi inventado no código.

## Pendências editoriais e de conteúdo

- Substituir os seis arquivos pendentes em `public/images/` pelos arquivos finais, mantendo exatamente estes nomes: `hero-consulta.jpg`, `foto-mayra-benicio.jpg`, `foto-pacientes.jpg`, `imagem-dna.png`, `foto-consultorio-1.jpg` e `foto-consultorio-2.jpg`.
- Exportar fotografias em AVIF/WebP e manter fallback quando os originais aprovados forem fornecidos. Sem as imagens finais não é seguro escolher corte, compressão ou proporção diferentes.
- Confirmar e preencher o endereço real do consultório em `src/data/contact.ts`.
- Fornecer e aprovar clinicamente as respostas em `src/data/faq.ts`.
- Definir `VITE_SITE_URL` no ambiente de build. Isso habilita canonical, `og:url`, JSON-LD e `sitemap.xml` com o domínio verdadeiro.
- Fornecer uma imagem social aprovada antes de adicionar `og:image`.

## Cabeçalhos recomendados na hospedagem

O repositório não identifica uma plataforma de deploy. Configure estes cabeçalhos na plataforma escolhida, validando primeiro em staging:

```text
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

`Strict-Transport-Security` só deve ser habilitado depois que o domínio e todos os subdomínios funcionarem exclusivamente em HTTPS. O `unsafe-inline` em estilos ainda é necessário porque o carrossel e o parallax aplicam estilos calculados em tempo de execução; scripts inline não são necessários.

## Inventário de assets

- `src/assets/icons/`: identidade visual usada pelo site e variações oficiais mantidas como fonte de marca.
- `src/assets/fonts/`: família Sofia Pro original. O CSS carrega somente os pesos Black e Bold realmente usados; os demais arquivos foram preservados por serem materiais de identidade, não lixo confirmado.
- A família Inter é empacotada em WOFF2 por `@fontsource/inter`, nos mesmos pesos e estilo usados anteriormente, sem requisição ao Google Fonts.
- `src/assets/hero.png`: não está conectado e não corresponde de forma inequívoca a nenhuma fotografia pendente; foi preservado para evitar substituir conteúdo sem aprovação.
- `public/icons.svg`: não está conectado, mas foi preservado por não haver confirmação de que não faça parte do pacote de marca.
- `public/images/`: diretório esperado para as fotografias finais aprovadas.

## Operação

- A pipeline executa TypeScript, ESLint, testes unitários, build e Playwright.
- Rode `npm audit` periodicamente e revise atualizações antes de aplicá-las.
- Após configurar o domínio e as imagens, valide Rich Results, compartilhamento social, Lighthouse e os status HTTP de todos os recursos no deploy final.
