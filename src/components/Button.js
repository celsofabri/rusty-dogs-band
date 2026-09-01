/**
 * Botao reutilizavel. Renderiza <Link> para rotas internas, <a> para links
 * externos (sempre com rel de seguranca) ou <button> para acoes.
 */
import React from "react"
import { Link } from "gatsby"

const Button = ({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  icon = null,
  ...rest
}) => {
  const classes = ["btn", `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(" ")

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon ? (
        <span className="btn__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}

export default Button
