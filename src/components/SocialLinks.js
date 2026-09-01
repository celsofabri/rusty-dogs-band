/** Lista de redes sociais / plataformas de streaming vinda de `src/data/site.json`. */
import React from "react"
import Icon from "./Icon"
import site from "../data/site.json"

const SocialLinks = ({ variant = "row", showHandle = false, className = "" }) => (
  <ul className={["social", `social--${variant}`, className].filter(Boolean).join(" ")}>
    {site.social.map(network => (
      <li key={network.id} className="social__item">
        <a
          className="social__link"
          href={network.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${network.label} — ${network.handle}`}
        >
          <span className="social__icon">
            <Icon name={network.id} size={22} />
          </span>
          <span className="social__text">
            <span className="social__label">{network.label}</span>
            {showHandle ? <span className="social__handle">{network.handle}</span> : null}
          </span>
        </a>
      </li>
    ))}
  </ul>
)

export default SocialLinks
