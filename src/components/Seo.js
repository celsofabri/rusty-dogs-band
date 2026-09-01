/**
 * Meta tags por pagina (title, description, Open Graph, Twitter Card).
 * Usa react-helmet para acompanhar a troca de idioma feita no cliente.
 */
import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql, withPrefix } from "gatsby"
import { useLanguage } from "../context/LanguageContext"

const Seo = ({ title, description, pathname = "", image, children }) => {
  const { site } = useStaticQuery(graphql`
    query SeoMetadata {
      site {
        siteMetadata {
          title
          titleAlt
          titleTemplate
          description
          descriptionEn
          siteUrl
          image
          author
        }
      }
    }
  `)

  const meta = site.siteMetadata
  const { language, locale } = useLanguage()

  const siteName = language === "pt" ? meta.titleAlt : meta.title
  const metaTitle = title ? `${title} | ${siteName}` : `${siteName} — ${language === "pt" ? "Site oficial" : "Official website"}`
  const metaDescription = description || (language === "pt" ? meta.description : meta.descriptionEn)
  const url = `${meta.siteUrl}${withPrefix(pathname || "/")}`
  const metaImage = `${meta.siteUrl}${withPrefix(image || meta.image)}`

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={meta.author} />
      <meta name="theme-color" content="#0a0d12" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:locale" content={locale.replace("-", "_")} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {children}
    </Helmet>
  )
}

export default Seo
