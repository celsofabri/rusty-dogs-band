/**
 * Linha do tempo vertical com animacao de entrada por item.
 * No desktop os marcos alternam entre os dois lados do eixo central;
 * no mobile tudo alinha a esquerda.
 */
import React from "react"
import Reveal from "./Reveal"
import { useLanguage } from "../context/LanguageContext"

const Timeline = ({ items }) => {
  const { t, localize } = useLanguage()

  return (
    <ol className="timeline">
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={`${item.year}-${index}`}
          className={`timeline__item timeline__item--${index % 2 === 0 ? "left" : "right"}`}
        >
          <div className="timeline__marker" aria-hidden="true">
            <span className="timeline__dot" />
          </div>
          <article className="timeline__card">
            <header className="timeline__head">
              <time className="timeline__year" dateTime={item.year}>
                {item.year}
              </time>
              <span className={`timeline__tag timeline__tag--${item.type}`}>
                {t(`about.types.${item.type}`)}
              </span>
            </header>
            <h3 className="timeline__title">{localize(item.title)}</h3>
            <p className="timeline__text">{localize(item.description)}</p>
          </article>
        </Reveal>
      ))}
    </ol>
  )
}

export default Timeline
