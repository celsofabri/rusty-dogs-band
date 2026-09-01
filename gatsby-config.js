/**
 * Configuracao do Gatsby - The Rusty Dogs / Os Caes Enferrujados
 * Docs: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

// Publicado em https://celsofabri.github.io/rusty-dogs-band (GitHub Pages de projeto),
// por isso o site vive em um subdiretorio e precisa de pathPrefix + `gatsby build --prefix-paths`.
const pathPrefix = `/rusty-dogs-band`
const siteUrl = `https://celsofabri.github.io`

module.exports = {
  pathPrefix,
  siteMetadata: {
    title: `The Rusty Dogs`,
    titleAlt: `Os Cães Enferrujados`,
    titleTemplate: `%s | The Rusty Dogs`,
    description: `Rock nacional e internacional com pegada suja e melódica. Site oficial da banda The Rusty Dogs / Os Cães Enferrujados.`,
    descriptionEn: `Gritty, melodic rock from southern Brazil. Official website of The Rusty Dogs / Os Cães Enferrujados.`,
    siteUrl,
    image: `/og-image.jpg`,
    lang: `pt-BR`,
    author: `The Rusty Dogs`,
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          // Silencia os avisos de depreciacao das dependencias internas do dart-sass.
          quietDeps: true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `images`, path: `${__dirname}/src/images` },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: { output: `/sitemap` },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Rusty Dogs`,
        short_name: `Rusty Dogs`,
        start_url: `/`,
        background_color: `#0a0d12`,
        theme_color: `#e8621f`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
  ],
}
