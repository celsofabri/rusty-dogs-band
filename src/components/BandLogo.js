/**
 * Logo da banda. Existe uma arte para cada idioma, entao trocamos o arquivo
 * junto com o idioma.
 *
 * StaticImage exige que as props de imagem sejam literais (o plugin as le em
 * tempo de build), por isso as duas versoes estao escritas por extenso e o
 * tamanho final e controlado por CSS.
 */
import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { useLanguage } from "../context/LanguageContext"

const BandLogo = ({ className = "" }) => {
  const { language } = useLanguage()
  const classes = ["band-logo", className].filter(Boolean).join(" ")

  if (language === "en") {
    return (
      <StaticImage
        src="../images/logo-en.png"
        alt="The Rusty Dogs"
        className={classes}
        layout="constrained"
        width={640}
        quality={92}
        placeholder="blurred"
        objectFit="contain"
        loading="eager"
      />
    )
  }

  return (
    <StaticImage
      src="../images/logo-pt.png"
      alt="Os Cães Enferrujados"
      className={classes}
      layout="constrained"
      width={640}
      quality={92}
      placeholder="blurred"
      objectFit="contain"
      loading="eager"
    />
  )
}

export default BandLogo
