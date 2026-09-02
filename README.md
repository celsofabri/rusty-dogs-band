# Os Cães Enferrujados / The Rusty Dogs

Site institucional bilíngue (PT/EN) da banda **Os Cães Enferrujados**, de Curitiba (PR), formada em 2025.
Feito em **Gatsby 5 + React + SCSS**.

🔗 **Site publicado:** https://celsofabri.github.io/rusty-dogs-band

---

## Stack

| Área | Escolha |
| --- | --- |
| Framework | Gatsby 5 (rotas automáticas a partir de `src/pages`) |
| UI | React 18, apenas componentes funcionais + Hooks |
| Estilos | SCSS na metodologia 7-1 simplificada (`utils`, `base`, `layout`, `components`, `pages`) |
| Imagens | `gatsby-plugin-image` + `gatsby-plugin-sharp` (AVIF/WebP, lazy loading, placeholder borrado) |
| SEO | `gatsby-plugin-react-helmet` (title, description, Open Graph e Twitter Card por página) + sitemap |
| Formulário | `react-hook-form` para validação + **Formspree** para o envio |
| Vídeos | iframe do `youtube-nocookie` criado **somente quando o modal abre** |
| Idiomas | Contexto React próprio (`src/context/LanguageContext.js`), sem duplicar rotas |

### Por que Formspree

Entre Formspree, Netlify Forms e EmailJS, o **Formspree** é o mais simples para este caso:
é um único `POST` em JSON para um endpoint, funciona em qualquer hospedagem estática
(inclusive GitHub Pages, onde Netlify Forms não existe) e não expõe credenciais no
front-end como o EmailJS. Veja [Formulário de contato](#formulário-de-contato).

---

## Como rodar

```bash
# 1. Instalar dependências (Node 18+; o projeto foi testado no 20 e no 24)
npm install

# 2. Ambiente de desenvolvimento com hot reload -> http://localhost:8000
npm run develop

# 3. Build de produção -> pasta public/
npm run build

# 4. Servir o build localmente -> http://localhost:9000
npm run serve

# 5. Build igual ao do GitHub Pages (com o prefixo /rusty-dogs-band)
npm run build:pages

# Limpar cache do Gatsby (necessário se uma alteração de SCSS não aparecer)
npm run clean
```

> O GraphiQL fica disponível em `http://localhost:8000/___graphql` durante o `develop`.

---

## Estrutura de pastas

```
rusty-dogs-band/
├── .github/workflows/deploy.yml   # build + deploy automático no GitHub Pages
├── gatsby-config.js               # plugins, metadados de SEO e pathPrefix
├── gatsby-browser.js              # fontes, CSS global e provider de idioma
├── gatsby-ssr.js                  # mesmo provider na renderização estática
├── src/
│   ├── components/                # peças reutilizáveis
│   │   ├── Layout.js  Header.js  Footer.js
│   │   ├── Hero.js  Section.js  Reveal.js
│   │   ├── Button.js  Icon.js  Modal.js
│   │   ├── Timeline.js  MembersGrid.js  VideoGrid.js
│   │   ├── ContactForm.js  SocialLinks.js
│   │   ├── LanguageSwitcher.js  BandLogo.js  BandPoster.js
│   │   └── Seo.js
│   ├── context/LanguageContext.js # idioma atual, t() e localize()
│   ├── hooks/
│   │   ├── useScrollReveal.js     # IntersectionObserver + prefers-reduced-motion
│   │   └── useBodyScrollLock.js
│   ├── data/                      # TODO o conteúdo do site (PT + EN)
│   │   ├── site.json  members.json  timeline.json  videos.json
│   │   └── translations.json
│   ├── images/                    # logos, fotos, retratos e thumbnails
│   ├── pages/                     # index, sobre, videos, contato, 404
│   └── styles/                    # SCSS 7-1 simplificado
│       ├── main.scss
│       ├── utils/       # _variables (design tokens) e _mixins
│       ├── base/        # reset, tipografia, acessibilidade, animações
│       ├── layout/      # container, section, header, footer
│       ├── components/  # button, hero, card, timeline, video, modal, social, form
│       └── pages/       # ajustes por página
└── static/                        # arquivos copiados como estão (og-image, favicon)
```

---

## Editando o conteúdo

Nada de texto fixo dentro dos componentes: **todo o conteúdo vive em `src/data`**, sempre
no formato `{ "pt": "...", "en": "..." }`.

| Arquivo | O que controla |
| --- | --- |
| `site.json` | Nome da banda, tagline, cidade, bio curta, e-mails, redes sociais e último lançamento |
| `members.json` | Integrantes: nome artístico (`stageName`), nome completo (`fullName`), instrumento, mini bio, ano de entrada e arquivo da foto |
| `timeline.json` | Marcos da linha do tempo (`period`, `datetime`, `type`, `title`, `description`, `highlight`, `video`) |
| `videos.json` | Vídeos: `youtubeId`, categoria, duração, thumbnail e textos |
| `translations.json` | Todos os rótulos de interface (menu, botões, mensagens de erro...) |

**Vídeos:** o primeiro item (`primeiro-ensaio-trio`, ID `RxewFEpE-_8`) é o vídeo real do
primeiro ensaio em trio, de julho de 2025 — o mesmo que aparece no marco da timeline em
`timeline.json`. Os outros cinco `youtubeId` ainda são placeholders de vídeos públicos, só
para o player funcionar; troque pelos IDs reais do canal da banda — o ID é o trecho depois
de `watch?v=` na URL do YouTube. As thumbnails são imagens locais em
`src/images/videos/` (otimizadas pelo Gatsby), então o YouTube só é acionado no clique.

**Integrantes e thumbnails:** coloque o arquivo em `src/images/members/` ou
`src/images/videos/` e informe apenas o nome do arquivo no JSON. As imagens são
consultadas por GraphQL e otimizadas automaticamente.

**Tipos aceitos na timeline:** `duo`, `name`, `pause`, `reunion`, `lineup`, `rehearsal`,
`today` (além de `formation`, `release`, `show` e `award`, mantidos para uso futuro). Cada
um tem sua etiqueta. Um marco com `"highlight": true` ganha destaque visual — é assim que
os marcos de 2025 (quarteto e nome atual) se diferenciam da origem da dupla nos anos 2000.
Um marco com `video` (`youtubeId` + `thumbnail` + `title`) exibe a capa com botão de play e
abre o mesmo lightbox da página de Vídeos.

---

## Idiomas (PT/EN)

- Uma única árvore de rotas; a troca acontece no cliente pelo `LanguageContext`.
- A ordem de escolha é: preferência salva (`localStorage`) → idioma do navegador → português.
- O atributo `lang` do `<html>` e as meta tags de SEO acompanham a troca.
- Para adicionar um idioma: inclua a chave em `translations.json`, acrescente o código em
  `LANGUAGES` (`src/context/LanguageContext.js`) e adicione o campo nos arquivos de dados.

---

## Formulário de contato

Campos: **Nome**, **E-mail**, **Título/Assunto** e **Mensagem**, todos obrigatórios, com
validação e mensagens de erro em português e inglês. Há também um campo-armadilha
(honeypot) contra robôs.

Sem configuração, o formulário roda em **modo demonstração**: valida tudo e mostra o
retorno de sucesso sem enviar nada. Para ativar o envio real:

1. Crie um formulário em [formspree.io](https://formspree.io) e copie o ID do endpoint
   (`https://formspree.io/f/**xxxxxxxx**`).
2. Local: copie `.env.example` para `.env.development` / `.env.production` e preencha
   `GATSBY_FORMSPREE_ID`.
3. No deploy: crie o secret `GATSBY_FORMSPREE_ID` em
   *Settings → Secrets and variables → Actions*. O workflow já o repassa para o build.

---

## Acessibilidade e performance

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`, `ol` na timeline).
- Hierarquia de títulos correta: um `h1` por página.
- Skip link, foco visível em todos os controles e navegação completa por teclado.
- Modal com `role="dialog"`, `aria-modal`, foco preso enquanto aberto, fechamento por
  `Esc` e devolução do foco ao elemento que o abriu.
- Paleta dark validada: texto principal 14:1 e texto secundário 7,9:1 sobre o fundo.
- `prefers-reduced-motion` desliga as animações de entrada.
- Imagens em AVIF/WebP com lazy loading; o YouTube só carrega no clique; code splitting
  automático por rota do Gatsby.

---

## Deploy

O deploy é automático: todo push na `main` dispara `.github/workflows/deploy.yml`, que
roda `npm ci`, `npm run build:pages` e publica a pasta `public/` no GitHub Pages.

Como o site é uma *project page*, ele vive em um subdiretório — por isso
`pathPrefix: "/rusty-dogs-band"` no `gatsby-config.js` e o `--prefix-paths` no build.
Se o repositório mudar de nome, ajuste as duas pontas.

---

## Licença

Código sob licença MIT. As artes, fotos e o conteúdo da banda são de uso exclusivo dos
Cães Enferrujados.
