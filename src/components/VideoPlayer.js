/**
 * Embed do YouTube em proporcao 16:9.
 *
 * Fica isolado aqui porque e usado em dois lugares: nos cards da pagina de
 * Videos e no marco da timeline que tem registro em video. Em ambos o iframe so
 * e montado quando o modal abre — nada do YouTube carrega junto com a pagina.
 */
import React from "react"

const VideoPlayer = ({ youtubeId, title, autoPlay = true }) => (
  <div className="video-player">
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0${autoPlay ? "&autoplay=1" : ""}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
    />
  </div>
)

export default VideoPlayer
