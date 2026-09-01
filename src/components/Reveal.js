/** Envolve um bloco e aplica a animacao de entrada quando ele aparece na tela. */
import React from "react"
import useScrollReveal from "../hooks/useScrollReveal"

const Reveal = ({ children, as: Tag = "div", className = "", delay = 0, ...rest }) => {
  const [ref, isVisible] = useScrollReveal()

  return (
    <Tag
      ref={ref}
      className={["reveal", isVisible ? "is-visible" : "", className].filter(Boolean).join(" ")}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
