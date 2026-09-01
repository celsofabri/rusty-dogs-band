/** Sobre: historia, linha do tempo interativa e integrantes. */
import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Section from "../components/Section"
import Reveal from "../components/Reveal"
import Timeline from "../components/Timeline"
import MembersGrid from "../components/MembersGrid"
import timeline from "../data/timeline.json"
import site from "../data/site.json"
import { useLanguage } from "../context/LanguageContext"

const AboutPage = () => {
  const { t } = useLanguage()
  const story = t("about.story")

  return (
    <Layout className="page page--about">
      <Seo title={t("about.title")} description={t("seo.aboutDescription")} pathname="/sobre/" />
      <header className="page-header">
        <div className="container">
          <Reveal>
            <p className="page-header__kicker">{t("about.storyKicker")}</p>
            <h1 className="page-header__title">{t("about.title")}</h1>
            <p className="page-header__subtitle">{t("about.subtitle")}</p>
          </Reveal>
        </div>
      </header>

      <Section className="section--story">
        <div className="story">
          <Reveal className="story__media">
            <StaticImage
              src="../images/band.jpg"
              alt={`${site.band.pt} — foto oficial da banda`}
              className="story__image"
              layout="constrained"
              width={900}
              placeholder="blurred"
              quality={85}
              formats={["auto", "webp", "avif"]}
            />
          </Reveal>
          <Reveal className="story__text" delay={100}>
            <h2 className="story__title">{t("about.storyTitle")}</h2>
            {(Array.isArray(story) ? story : [story]).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section
        className="section--timeline section--dark"
        kicker={t("about.timelineKicker")}
        title={t("about.timelineTitle")}
        subtitle={t("about.timelineSubtitle")}
        align="center"
      >
        <Timeline items={timeline} />
      </Section>

      <Section
        className="section--members"
        kicker={t("about.membersKicker")}
        title={t("about.membersTitle")}
        subtitle={t("about.membersSubtitle")}
        align="center"
      >
        <MembersGrid />
      </Section>
    </Layout>
  )
}

export default AboutPage
