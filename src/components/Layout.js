/** Estrutura comum a todas as paginas: skip link, header, conteudo e rodape. */
import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import { useLanguage } from "../context/LanguageContext"

const Layout = ({ children, className = "" }) => {
  const { t } = useLanguage()

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        {t("nav.skipToContent")}
      </a>
      <Header />
      <main id="main" className={["site__main", className].filter(Boolean).join(" ")}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
