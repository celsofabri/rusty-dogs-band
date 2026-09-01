/** Pagina 404. */
import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Button from "../components/Button"
import Icon from "../components/Icon"
import { useLanguage } from "../context/LanguageContext"

const NotFoundPage = () => {
  const { t } = useLanguage()

  return (
    <Layout className="page page--404">
      <Seo title={t("notFound.title")} pathname="/404/" />
      <section className="not-found">
        <div className="container">
          <p className="not-found__code">404</p>
          <h1 className="not-found__title">{t("notFound.title")}</h1>
          <p className="not-found__text">{t("notFound.text")}</p>
          <Button to="/" variant="primary" icon={<Icon name="arrowRight" size={18} />}>
            {t("notFound.cta")}
          </Button>
        </div>
      </section>
    </Layout>
  )
}

export default NotFoundPage
