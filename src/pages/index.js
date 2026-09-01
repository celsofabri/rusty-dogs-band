/** Home: hero, apresentacao da banda, previa de videos e plataformas. */
import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Hero from "../components/Hero"
import Section from "../components/Section"
import Reveal from "../components/Reveal"
import Button from "../components/Button"
import Icon from "../components/Icon"
import VideoGrid from "../components/VideoGrid"
import SocialLinks from "../components/SocialLinks"
import BandPoster from "../components/BandPoster"
import site from "../data/site.json"
import members from "../data/members.json"
import { useLanguage } from "../context/LanguageContext"

const IndexPage = () => {
  const { t, localize } = useLanguage()

  const stats = [
    { value: `${members.length}`, label: t("home.statsMembers") },
    { value: "24", label: t("home.statsSongs") },
    { value: "18", label: t("home.statsShows") },
    { value: "6", label: t("home.statsCities") },
  ]

  return (
    <Layout>
      <Seo title={t("seo.home")} description={t("seo.homeDescription")} pathname="/" />
      <Hero />

      <Section
        id="sobre"
        className="section--about"
        kicker={t("home.aboutKicker")}
        title={t("home.aboutTitle")}
      >
        <div className="about-preview">
          <Reveal className="about-preview__text">
            <p className="about-preview__lead">{localize(site.shortBio)}</p>
            <ul className="stats">
              {stats.map(stat => (
                <li key={stat.label} className="stats__item">
                  <span className="stats__value">{stat.value}</span>
                  <span className="stats__label">{stat.label}</span>
                </li>
              ))}
            </ul>
            <Button to="/sobre/" variant="outline" icon={<Icon name="arrowRight" size={18} />}>
              {t("home.aboutCta")}
            </Button>
          </Reveal>

          <Reveal className="about-preview__media poster" delay={120}>
            <BandPoster />
          </Reveal>
        </div>
      </Section>

      <Section
        id="videos"
        className="section--videos section--dark"
        kicker={t("home.videosKicker")}
        title={t("home.videosTitle")}
        subtitle={t("home.videosSubtitle")}
      >
        <VideoGrid showFilters={false} limit={3} />
        <Reveal className="section__footer">
          <Button to="/videos/" variant="outline" icon={<Icon name="arrowRight" size={18} />}>
            {t("home.videosCta")}
          </Button>
        </Reveal>
      </Section>

      <Section
        id="ouvir"
        className="section--social"
        kicker={t("home.socialKicker")}
        title={t("home.socialTitle")}
        subtitle={t("home.socialSubtitle")}
      >
        <Reveal className="release-card">
          <div className="release-card__info">
            <p className="release-card__label">{t("home.latestRelease")}</p>
            <p className="release-card__title">{site.latestRelease.title}</p>
            <p className="release-card__meta">
              {localize(site.latestRelease.type)} · {site.latestRelease.year}
            </p>
          </div>
          <Button href={site.latestRelease.url} variant="primary" icon={<Icon name="spotify" size={20} />}>
            {t("home.ctaListen")}
          </Button>
        </Reveal>

        <Reveal delay={100}>
          <SocialLinks variant="cards" showHandle />
        </Reveal>
      </Section>
    </Layout>
  )
}

export default IndexPage
