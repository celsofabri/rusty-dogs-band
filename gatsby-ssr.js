/**
 * APIs de SSR do Gatsby - mantem o provider de idioma tambem na renderizacao estatica.
 * Docs: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */
import * as React from "react"
import { LanguageProvider } from "./src/context/LanguageContext"

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>{element}</LanguageProvider>
)

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `pt-BR` })
}
