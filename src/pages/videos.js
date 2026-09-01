/** Videos: grade filtravel com player em lightbox. */
import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Section from "../components/Section"
import Reveal from "../components/Reveal"
import VideoGrid from "../components/VideoGrid"
import videos from "../data/videos.json"
import { useLanguage } from "../context/LanguageContext"

const VideosPage = () => {
  const { t } = useLanguage()

  return (
    <Layout className="page page--videos">
      <Seo title={t("videos.title")} description={t("seo.videosDescription")} pathname="/videos/" />
      <header className="page-header">
        <div className="container">
          <Reveal>
            <p className="page-header__kicker">
              {videos.length} {t("videos.count")}
            </p>
            <h1 className="page-header__title">{t("videos.title")}</h1>
            <p className="page-header__subtitle">{t("videos.subtitle")}</p>
          </Reveal>
        </div>
      </header>

      <Section className="section--video-list">
        <VideoGrid />
      </Section>
    </Layout>
  )
}

export default VideosPage
