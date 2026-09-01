/** Poster da banda (arte com o logo do idioma atual), usado como imagem editorial. */
import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { useLanguage } from "../context/LanguageContext"

const BandPoster = ({ className = "" }) => {
  const { language } = useLanguage()
  const classes = ["poster__image", className].filter(Boolean).join(" ")

  if (language === "en") {
    return (
      <StaticImage
        src="../images/hero-en.jpg"
        alt="The Rusty Dogs — official tour poster"
        className={classes}
        layout="constrained"
        width={900}
        quality={85}
        placeholder="blurred"
        formats={["auto", "webp", "avif"]}
      />
    )
  }

  return (
    <StaticImage
      src="../images/hero-pt.jpg"
      alt="Os Cães Enferrujados — pôster oficial da turnê"
      className={classes}
      layout="constrained"
      width={900}
      quality={85}
      placeholder="blurred"
      formats={["auto", "webp", "avif"]}
    />
  )
}

export default BandPoster
