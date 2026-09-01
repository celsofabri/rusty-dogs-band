/** Bloco de secao com cabecalho padronizado (kicker + titulo + subtitulo). */
import React from "react"
import Reveal from "./Reveal"

const Section = ({
  id,
  kicker,
  title,
  subtitle,
  children,
  className = "",
  align = "left",
  as: Tag = "section",
  headingLevel: Heading = "h2",
}) => (
  <Tag id={id} className={["section", `section--${align}`, className].filter(Boolean).join(" ")}>
    <div className="container">
      {(kicker || title || subtitle) && (
        <Reveal className="section__header">
          {kicker ? <p className="section__kicker">{kicker}</p> : null}
          {title ? <Heading className="section__title">{title}</Heading> : null}
          {subtitle ? <p className="section__subtitle">{subtitle}</p> : null}
        </Reveal>
      )}
      {children}
    </div>
  </Tag>
)

export default Section
