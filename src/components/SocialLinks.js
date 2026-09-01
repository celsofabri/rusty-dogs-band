/** Lista de redes sociais / plataformas de streaming vinda de `src/data/site.json`. */
import React from "react"
import Icon from "./Icon"
import site from "../data/site.json"
import { useLanguage } from "../context/LanguageContext"

const SocialLinks = ({ variant = "row", showHandle = false, className = "" }) => {
  const { localize } = useLanguage()

  return (
    <ul className={["social", `social--${variant}`, className].filter(Boolean).join(" ")}>
      {site.social.map(network => {
        // O handle pode ser texto fixo (perfil real) ou localizado ("Em breve").
        const handle = localize(network.handle)

        return (
          <li key={network.id} className="social__item">
            <a
              className="social__link"
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${network.label} — ${handle}`}
            >
              <span className="social__icon">
                <Icon name={network.id} size={22} />
              </span>
              <span className="social__text">
                <span className="social__label">{network.label}</span>
                {showHandle ? <span className="social__handle">{handle}</span> : null}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks
