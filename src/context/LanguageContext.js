/**
 * Contexto de idioma (PT/EN).
 *
 * O site tem uma unica arvore de rotas: o conteudo vem sempre dos arquivos de
 * `src/data` no formato `{ pt: ..., en: ... }` e a troca acontece no cliente.
 * Isso mantem o deploy estatico simples (GitHub Pages) e evita duplicar rotas.
 *
 * A renderizacao estatica sempre usa "pt". O idioma real do visitante e aplicado
 * dentro de um efeito, depois da hidratacao, para nao gerar mismatch de HTML.
 */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import translations from "../data/translations.json"

const STORAGE_KEY = "rusty-dogs:lang"
export const DEFAULT_LANGUAGE = "pt"
export const LANGUAGES = ["pt", "en"]

const LanguageContext = createContext(null)

/** Busca uma chave aninhada ("nav.home") dentro do dicionario do idioma atual. */
const resolve = (dictionary, key) =>
  key.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dictionary)

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE)
  const [ready, setReady] = useState(false)

  // Preferencia salva > idioma do navegador > padrao.
  useEffect(() => {
    let next = DEFAULT_LANGUAGE
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (LANGUAGES.includes(saved)) {
        next = saved
      } else if (typeof navigator !== "undefined" && navigator.language) {
        next = navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en"
      }
    } catch (error) {
      // localStorage indisponivel (modo privado, cookies bloqueados): segue no padrao.
    }
    setLanguageState(next)
    setReady(true)
  }, [])

  // Mantem o atributo lang do documento em sincronia com o idioma escolhido.
  useEffect(() => {
    document.documentElement.lang = translations[language].locale
  }, [language])

  const setLanguage = useCallback(next => {
    if (!LANGUAGES.includes(next)) return
    setLanguageState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch (error) {
      // Sem persistencia: a escolha vale so para esta sessao.
    }
  }, [])

  const value = useMemo(() => {
    const dictionary = translations[language]

    return {
      language,
      ready,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "pt" ? "en" : "pt"),
      otherLanguage: language === "pt" ? "en" : "pt",
      locale: dictionary.locale,
      /** Traduz uma chave do dicionario de interface. Devolve a propria chave se nao existir. */
      t: key => {
        const found = resolve(dictionary, key)
        return found === undefined ? key : found
      },
      /** Le um campo localizado de um arquivo de dados: `{ pt: "...", en: "..." }`. */
      localize: field => {
        if (field === null || field === undefined) return ""
        if (typeof field === "string" || Array.isArray(field)) return field
        return field[language] !== undefined ? field[language] : field[DEFAULT_LANGUAGE]
      },
    }
  }, [language, ready, setLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage precisa estar dentro de <LanguageProvider>")
  }
  return context
}

export default LanguageContext
