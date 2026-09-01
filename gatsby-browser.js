/**
 * APIs de browser do Gatsby.
 * Docs: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */
import * as React from "react"

import "@fontsource/oswald/400.css"
import "@fontsource/oswald/500.css"
import "@fontsource/oswald/700.css"
import "@fontsource-variable/inter"

import "./src/styles/main.scss"
import { LanguageProvider } from "./src/context/LanguageContext"

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>{element}</LanguageProvider>
)
