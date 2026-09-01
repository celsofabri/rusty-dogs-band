/** Rodape com navegacao, contatos, redes sociais e volta ao topo. */
import React from "react"
import { Link } from "gatsby"
import SocialLinks from "./SocialLinks"
import Icon from "./Icon"
import site from "../data/site.json"
import { useLanguage } from "../context/LanguageContext"

const Footer = () => {
  const { t, localize } = useLanguage()
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">{localize(site.band)}</p>
          <p className="footer__tagline">{localize(site.tagline)}</p>
          <p className="footer__hometown">{localize(site.hometown)}</p>
        </div>

        <nav className="footer__col" aria-label={t("footer.navTitle")}>
          <h2 className="footer__title">{t("footer.navTitle")}</h2>
          <ul className="footer__list">
            <li>
              <Link to="/">{t("nav.home")}</Link>
            </li>
            <li>
              <Link to="/sobre/">{t("nav.about")}</Link>
            </li>
            <li>
              <Link to="/videos/">{t("nav.videos")}</Link>
            </li>
            <li>
              <Link to="/contato/">{t("nav.contact")}</Link>
            </li>
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__title">{t("footer.contactTitle")}</h2>
          <ul className="footer__list">
            <li>
              <a href={`mailto:${site.contact.general}`}>{site.contact.general}</a>
            </li>
            <li>
              <a href={`mailto:${site.contact.booking}`}>{site.contact.booking}</a>
            </li>
            <li>
              <a href={`mailto:${site.contact.press}`}>{site.contact.press}</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__title">{t("footer.followTitle")}</h2>
          <SocialLinks variant="grid" />
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__copy">
          © {year} {localize(site.band)}. {t("footer.rights")}
        </p>
        <p className="footer__credit">{t("footer.madeWith")}</p>
        <button type="button" className="footer__top" onClick={scrollToTop}>
          {t("footer.backToTop")}
          <Icon name="arrowUp" size={16} />
        </button>
      </div>
    </footer>
  )
}

export default Footer
