/** Contato: formulario validado + canais diretos e area de imprensa. */
import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Section from "../components/Section"
import Reveal from "../components/Reveal"
import ContactForm from "../components/ContactForm"
import SocialLinks from "../components/SocialLinks"
import Button from "../components/Button"
import Icon from "../components/Icon"
import site from "../data/site.json"
import { useLanguage } from "../context/LanguageContext"

const ContactPage = () => {
  const { t } = useLanguage()

  const channels = [
    { label: t("contact.general"), email: site.contact.general },
    { label: t("contact.booking"), email: site.contact.booking },
    { label: t("contact.press"), email: site.contact.press },
  ]

  return (
    <Layout className="page page--contact">
      <Seo title={t("contact.title")} description={t("seo.contactDescription")} pathname="/contato/" />
      <header className="page-header">
        <div className="container">
          <Reveal>
            <p className="page-header__kicker">{t("contact.infoTitle")}</p>
            <h1 className="page-header__title">{t("contact.title")}</h1>
            <p className="page-header__subtitle">{t("contact.subtitle")}</p>
          </Reveal>
        </div>
      </header>

      <Section className="section--contact">
        <div className="contact">
          <Reveal className="contact__form">
            <ContactForm />
          </Reveal>

          <Reveal className="contact__aside" delay={120}>
            <div className="info-card">
              <h2 className="info-card__title">{t("contact.infoTitle")}</h2>
              <ul className="info-card__list">
                {channels.map(channel => (
                  <li key={channel.email}>
                    <span className="info-card__label">{channel.label}</span>
                    <a className="info-card__link" href={`mailto:${channel.email}`}>
                      {channel.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card info-card--accent">
              <h2 className="info-card__title">{t("contact.pressKitTitle")}</h2>
              <p className="info-card__text">{t("contact.pressKitText")}</p>
              <Button
                href={`mailto:${site.contact.press}`}
                variant="outline"
                icon={<Icon name="arrowRight" size={18} />}
              >
                {t("contact.pressKitCta")}
              </Button>
            </div>

            <div className="info-card">
              <h2 className="info-card__title">{t("contact.followTitle")}</h2>
              <SocialLinks variant="grid" showHandle />
            </div>
          </Reveal>
        </div>
      </Section>
    </Layout>
  )
}

export default ContactPage
