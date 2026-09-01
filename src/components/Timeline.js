/**
 * Linha do tempo vertical com animacao de entrada por marco.
 *
 * No desktop os marcos alternam entre os dois lados do eixo central; no mobile
 * tudo alinha a esquerda. Marcos podem trazer:
 *  - `highlight`: destaque visual para o que consolidou a formacao atual (2025);
 *  - `video`: registro em video, aberto no mesmo lightbox da pagina de Videos.
 */
import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Reveal from "./Reveal"
import Modal from "./Modal"
import VideoPlayer from "./VideoPlayer"
import Icon from "./Icon"
import { useLanguage } from "../context/LanguageContext"

const Timeline = ({ items }) => {
  const { t, localize } = useLanguage()
  const [activeVideo, setActiveVideo] = useState(null)

  // As capas dos videos da timeline ficam junto das capas da pagina de Videos.
  const data = useStaticQuery(graphql`
    query TimelineThumbnails {
      allFile(filter: { relativeDirectory: { eq: "videos" } }) {
        nodes {
          base
          childImageSharp {
            gatsbyImageData(
              width: 560
              aspectRatio: 1.7777
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  `)

  const imagesByFile = Object.fromEntries(data.allFile.nodes.map(node => [node.base, node]))

  return (
    <>
      <ol className="timeline">
        {items.map((item, index) => {
          const videoTitle = item.video ? localize(item.video.title) : ""
          const thumbnail = item.video ? getImage(imagesByFile[item.video.thumbnail]?.childImageSharp) : null

          return (
            <Reveal
              as="li"
              key={item.id}
              className={`timeline__item timeline__item--${index % 2 === 0 ? "left" : "right"}${
                item.highlight ? " timeline__item--highlight" : ""
              }`}
            >
              <div className="timeline__marker" aria-hidden="true">
                <span className="timeline__dot" />
              </div>

              <article className="timeline__card">
                <header className="timeline__head">
                  {item.datetime ? (
                    <time className="timeline__year" dateTime={item.datetime}>
                      {localize(item.period)}
                    </time>
                  ) : (
                    <span className="timeline__year">{localize(item.period)}</span>
                  )}
                  <span className={`timeline__tag timeline__tag--${item.type}`}>
                    {t(`about.types.${item.type}`)}
                  </span>
                </header>

                <h3 className="timeline__title">{localize(item.title)}</h3>
                <p className="timeline__text">{localize(item.description)}</p>

                {item.video ? (
                  <button
                    type="button"
                    className="timeline__video"
                    onClick={() => setActiveVideo({ ...item.video, label: videoTitle })}
                    aria-label={`${t("videos.playAria")}: ${videoTitle}`}
                  >
                    <span className="timeline__video-media">
                      {thumbnail ? (
                        <GatsbyImage image={thumbnail} alt="" role="presentation" />
                      ) : null}
                      <span className="timeline__video-play" aria-hidden="true">
                        <Icon name="play" size={20} />
                      </span>
                    </span>
                    <span className="timeline__video-label">{videoTitle}</span>
                  </button>
                ) : null}

                {item.highlight ? (
                  <p className="timeline__milestone">{t("about.milestone")}</p>
                ) : null}
              </article>
            </Reveal>
          )
        })}
      </ol>

      <Modal
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        title={activeVideo ? activeVideo.label : ""}
        closeLabel={t("videos.close")}
      >
        {activeVideo ? <VideoPlayer youtubeId={activeVideo.youtubeId} title={activeVideo.label} /> : null}
      </Modal>
    </>
  )
}

export default Timeline
