/** Cabecalho fixo com navegacao principal, troca de idioma e menu mobile. */
import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import BandLogo from "./BandLogo"
import LanguageSwitcher from "./LanguageSwitcher"
import Icon from "./Icon"
import useBodyScrollLock from "../hooks/useBodyScrollLock"
import { useLanguage } from "../context/LanguageContext"

const Header = () => {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useBodyScrollLock(isMenuOpen)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/sobre/", label: t("nav.about") },
    { to: "/videos/", label: t("nav.videos") },
    { to: "/contato/", label: t("nav.contact") },
  ]

  return (
    // O menu mobile fica FORA do <header> de proposito: o header usa
    // `backdrop-filter` e um ancestral com filtro vira o bloco de contencao dos
    // filhos `position: fixed`, o que prendia o menu na faixa de 76px do topo.
    <>
      <header className={`header${isScrolled ? " is-scrolled" : ""}${isMenuOpen ? " is-open" : ""}`}>
        <div className="container header__inner">
          <Link to="/" className="header__brand" onClick={() => setIsMenuOpen(false)}>
            <BandLogo className="header__logo" />
          </Link>

          <nav className="header__nav" aria-label={t("nav.menu")}>
            <ul className="header__list">
              {links.map(link => (
                <li key={link.to}>
                  <Link className="header__link" activeClassName="is-active" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <LanguageSwitcher className="header__lang" />
            <button
              type="button"
              className="header__toggle"
              onClick={() => setIsMenuOpen(open => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            >
              <Icon name={isMenuOpen ? "close" : "menu"} size={26} />
            </button>
          </div>
        </div>

      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${isMenuOpen ? " is-open" : ""}`}
        hidden={!isMenuOpen}
      >
        <nav aria-label={t("nav.menu")}>
          <ul className="mobile-menu__list">
            {links.map((link, index) => (
              <li key={link.to} style={{ animationDelay: `${index * 60}ms` }}>
                <Link
                  className="mobile-menu__link"
                  activeClassName="is-active"
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header
