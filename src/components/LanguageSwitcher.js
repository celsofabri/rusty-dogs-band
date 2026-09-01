/** Alterna entre portugues e ingles. A escolha fica salva no navegador. */
import React from "react"
import Icon from "./Icon"
import { useLanguage } from "../context/LanguageContext"

const LanguageSwitcher = ({ className = "" }) => {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div
      className={["lang", className].filter(Boolean).join(" ")}
      role="group"
      aria-label={t("language.label")}
    >
      <Icon name="globe" size={16} className="lang__globe" />
      {["pt", "en"].map(code => {
        const isActive = language === code
        return (
          <button
            key={code}
            type="button"
            className={`lang__option${isActive ? " is-active" : ""}`}
            onClick={() => setLanguage(code)}
            aria-pressed={isActive}
            lang={code === "pt" ? "pt-BR" : "en"}
          >
            {code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
