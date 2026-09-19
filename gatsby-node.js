/**
 * Busca em build-time a lista de uploads do canal do YouTube da banda
 * (https://www.youtube.com/@RustyDogsCwb) e cria os nos "Video" que
 * alimentam a pagina de Videos e a previa na home.
 *
 * O video fixo em src/data/pinned-videos.json sempre aparece primeiro; os
 * demais vem automaticamente do feed do canal, na ordem em que foram
 * postados (mais recente primeiro), sem precisar editar nada manualmente
 * a cada novo upload.
 */
const pinnedVideos = require("./src/data/pinned-videos.json")

const CHANNEL_ID = "UC-kKEXE8YsyiPnHPQ-NG-ew" // @RustyDogsCwb
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const FETCH_TIMEOUT_MS = 10000
const CACHE_KEY = "rusty-dogs-channel-videos"

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type Video implements Node {
      youtubeId: String!
      thumbnail: String!
      category: String!
      year: Int!
      duration: String
      order: Int!
      title: VideoText!
      description: VideoText!
    }

    type VideoText {
      pt: String!
      en: String!
    }
  `)
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, cache, reporter }) => {
  const { createNode } = actions

  const channelVideos = await fetchChannelVideos({ cache, reporter })
  const pinnedIds = new Set(pinnedVideos.map(video => video.youtubeId))
  const autoVideos = channelVideos.filter(video => !pinnedIds.has(video.youtubeId))
  const videos = [...pinnedVideos, ...autoVideos]

  videos.forEach((video, index) => {
    const { youtubeId, thumbnail, category, year, duration, title, description } = video
    const nodeContent = {
      youtubeId,
      thumbnail,
      category,
      year,
      duration: duration || null,
      order: index,
      title,
      description,
    }

    createNode({
      ...nodeContent,
      id: createNodeId(`video-${youtubeId}`),
      parent: null,
      children: [],
      internal: {
        type: "Video",
        contentDigest: createContentDigest(nodeContent),
      },
    })
  })
}

// Busca o feed RSS publico do canal (sem chave de API). Em caso de falha
// (build offline, YouTube fora do ar), reaproveita o ultimo resultado salvo
// em cache para o build nao quebrar; se nunca houve um fetch com sucesso,
// o site segue com o video fixo.
async function fetchChannelVideos({ cache, reporter }) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    const response = await fetch(FEED_URL, { signal: controller.signal })
    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`o feed respondeu ${response.status}`)
    }

    const xml = await response.text()
    const videos = parseFeed(xml)
    await cache.set(CACHE_KEY, videos)
    return videos
  } catch (error) {
    reporter.warn(
      `[videos] nao foi possivel buscar os uploads do canal no YouTube (${error.message}). ` +
        `Usando o ultimo resultado em cache, se houver.`
    )
    const cached = await cache.get(CACHE_KEY)
    return cached || []
  }
}

function parseFeed(xml) {
  return xml
    .split("<entry>")
    .slice(1)
    .map(block => block.split("</entry>")[0])
    .map(block => {
      const youtubeId = matchTag(block, "yt:videoId")
      const title = decodeEntities(matchTag(block, "title"))
      const published = matchTag(block, "published")
      const description = decodeEntities(matchTag(block, "media:description"))
      const thumbnailMatch = block.match(/<media:thumbnail url="([^"]+)"/)

      return {
        youtubeId,
        thumbnail: thumbnailMatch ? thumbnailMatch[1] : null,
        category: guessCategory(title, description),
        year: published ? new Date(published).getFullYear() : new Date().getFullYear(),
        title: { pt: title, en: title },
        description: { pt: description, en: description },
      }
    })
    .filter(video => video.youtubeId && video.thumbnail)
}

function matchTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))
  return match ? match[1].trim() : ""
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, `"`)
    .replace(/&#39;/g, "'")
}

// O feed nao traz categoria; os titulos e descricoes dos uploads do canal
// seguem um padrao ("... (Cover)", "Ensaio ...") suficiente pra classificar
// automaticamente nos mesmos filtros da pagina de Videos.
function guessCategory(title, description) {
  const text = `${title} ${description}`.toLowerCase()
  if (text.includes("cover")) return "covers"
  if (text.includes("ensaio")) return "ensaios"
  return "bastidores"
}
