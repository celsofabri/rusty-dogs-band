/**
 * Grade de videos com filtro por categoria e player em lightbox.
 *
 * Performance: a thumbnail e uma imagem local otimizada pelo gatsby-plugin-image
 * e o iframe do YouTube so e criado quando o modal abre (nenhum script do
 * YouTube carrega junto com a pagina).
 */
import React, { useMemo, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Modal from "./Modal"
import VideoPlayer from "./VideoPlayer"
import Reveal from "./Reveal"
import Icon from "./Icon"
import videos from "../data/videos.json"
import { useLanguage } from "../context/LanguageContext"

const VideoGrid = ({ items = videos, showFilters = true, limit }) => {
  const { t, localize } = useLanguage()
  const [category, setCategory] = useState("all")
  const [activeVideo, setActiveVideo] = useState(null)

  const data = useStaticQuery(graphql`
    query VideoThumbnails {
      allFile(filter: { relativeDirectory: { eq: "videos" } }) {
        nodes {
          base
          childImageSharp {
            gatsbyImageData(
              width: 720
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

  const categories = useMemo(() => ["all", ...new Set(items.map(video => video.category))], [items])

  const visible = useMemo(() => {
    const filtered = category === "all" ? items : items.filter(video => video.category === category)
    return limit ? filtered.slice(0, limit) : filtered
  }, [items, category, limit])

  return (
    <div className="video-grid">
      {showFilters ? (
        <div className="video-grid__filters" role="group" aria-label={t("videos.filterLabel")}>
          {categories.map(value => (
            <button
              key={value}
              type="button"
              className={`chip${category === value ? " is-active" : ""}`}
              onClick={() => setCategory(value)}
              aria-pressed={category === value}
            >
              {value === "all" ? t("videos.all") : t(`videos.categories.${value}`)}
            </button>
          ))}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <p className="video-grid__empty">{t("videos.empty")}</p>
      ) : (
        <ul className="video-grid__list">
          {visible.map((video, index) => {
            const image = getImage(imagesByFile[video.thumbnail]?.childImageSharp)
            const title = localize(video.title)

            return (
              <Reveal as="li" key={video.id} className="video-grid__item" delay={index * 70}>
                <article className="video-card">
                  <button
                    type="button"
                    className="video-card__button"
                    onClick={() => setActiveVideo(video)}
                    aria-label={`${t("videos.playAria")}: ${title}`}
                  >
                    <span className="video-card__media">
                      {image ? (
                        <GatsbyImage image={image} alt="" role="presentation" className="video-card__image" />
                      ) : null}
                      <span className="video-card__play" aria-hidden="true">
                        <Icon name="play" size={26} />
                      </span>
                      {video.duration ? (
                        <span className="video-card__duration" aria-hidden="true">
                          {video.duration}
                        </span>
                      ) : null}
                    </span>
                    <span className="video-card__body">
                      <span className="video-card__category">{t(`videos.categories.${video.category}`)}</span>
                      <span className="video-card__title">{title}</span>
                      <span className="video-card__description">{localize(video.description)}</span>
                      <span className="video-card__meta">{video.year}</span>
                    </span>
                  </button>
                </article>
              </Reveal>
            )
          })}
        </ul>
      )}

      <Modal
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        title={activeVideo ? localize(activeVideo.title) : ""}
        closeLabel={t("videos.close")}
      >
        {activeVideo ? (
          <VideoPlayer youtubeId={activeVideo.youtubeId} title={localize(activeVideo.title)} />
        ) : null}
      </Modal>
    </div>
  )
}

export default VideoGrid
