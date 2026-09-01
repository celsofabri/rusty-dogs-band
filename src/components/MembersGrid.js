/**
 * Grade de integrantes. As fotos vivem em `src/images/members` e sao
 * consultadas via GraphQL; o JSON guarda apenas o nome do arquivo.
 */
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Reveal from "./Reveal"
import members from "../data/members.json"
import { useLanguage } from "../context/LanguageContext"

const MembersGrid = () => {
  const { t, localize } = useLanguage()

  const data = useStaticQuery(graphql`
    query MemberPhotos {
      allFile(filter: { relativeDirectory: { eq: "members" } }) {
        nodes {
          base
          childImageSharp {
            gatsbyImageData(
              width: 520
              aspectRatio: 0.75
              transformOptions: { cropFocus: NORTH }
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
    <ul className="members">
      {members.map((member, index) => {
        const image = getImage(imagesByFile[member.image]?.childImageSharp)

        return (
          <Reveal as="li" key={member.id} className="members__item" delay={index * 80}>
            <article className="member-card">
              <div className="member-card__media">
                {image ? (
                  <GatsbyImage image={image} alt={`${member.name} — ${localize(member.role)}`} className="member-card__image" />
                ) : null}
              </div>
              <div className="member-card__body">
                <h3 className="member-card__name">{member.name}</h3>
                <p className="member-card__role">{localize(member.role)}</p>
                <p className="member-card__bio">{localize(member.bio)}</p>
                <p className="member-card__since">
                  {t("about.memberSince")} <strong>{member.since}</strong>
                </p>
              </div>
            </article>
          </Reveal>
        )
      })}
    </ul>
  )
}

export default MembersGrid
