/** Hero de tela cheia da home: foto da banda, logo do idioma atual e CTAs. */
import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import BandLogo from "./BandLogo"
import Button from "./Button"
import Icon from "./Icon"
import site from "../data/site.json"
import { useLanguage } from "../context/LanguageContext"

const Hero = () => {
  const { t, localize } = useLanguage()

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <StaticImage
          src="../images/band.jpg"
          alt=""
          role="presentation"
          className="hero__image"
          layout="fullWidth"
          placeholder="blurred"
          quality={85}
          loading="eager"
          formats={["auto", "webp", "avif"]}
        />
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="container hero__content">
        <p className="hero__kicker">{t("home.kicker")}</p>
        {/* O nome da banda esta no alt da arte do logo: nada de texto duplicado
            para quem usa leitor de tela. */}
        <h1 id="hero-title" className="hero__title">
          <BandLogo className="hero__logo" />
        </h1>
        <p className="hero__tagline">{localize(site.tagline)}</p>

        <div className="hero__actions">
          <Button href={site.featured.url} variant="primary" size="lg" icon={<Icon name="youtube" size={20} />}>
            {t("home.ctaWatch")}
          </Button>
          <Button to="/sobre/" variant="ghost" size="lg" icon={<Icon name="arrowRight" size={20} />}>
            {t("home.ctaAbout")}
          </Button>
        </div>

        <p className="hero__release">
          <span className="hero__release-label">{t("home.featured")}</span>
          <span className="hero__release-value">
            {localize(site.featured.title)} · {site.featured.year}
          </span>
        </p>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>{t("home.scroll")}</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}

export default Hero
