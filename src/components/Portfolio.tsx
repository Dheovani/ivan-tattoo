import type { CSSProperties } from 'react'
import { artists, portfolio, studio, workAnchor, type Artist, type PortfolioItem } from '../data/site'
import { ExternalIcon } from './Icons'
import { ImageSlot } from './ImageSlot'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import './Portfolio.css'

const pad = (n: number) => String(n).padStart(2, '0')

/** Trabalhos de cada artista com a numeração contínua da peça (Nº 01, 02…). */
const chapters = artists.reduce<{ artist: Artist; items: PortfolioItem[]; start: number }[]>((acc, artist) => {
  const prev = acc.at(-1)
  const start = prev ? prev.start + prev.items.length : 0
  return [...acc, { artist, items: portfolio.filter((item) => item.artist === artist.id), start }]
}, [])

export function Portfolio() {
  return (
    <section id="portfolio" className="portfolio section" aria-labelledby="portfolio-title">
      <div className="container portfolio__head">
        <SectionHeading id="portfolio-title" index="04" label="Portfólio" title={['Pele', 'é parede.']} />
        <Reveal className="portfolio__intro">
          <p>Uma seleção de trabalhos do estúdio. Cada artista, uma assinatura.</p>
        </Reveal>
      </div>

      <div className="portfolio__chapters">
        {chapters.map(({ artist, items, start }, i) => (
          <Chapter key={artist.id} artist={artist} items={items} start={start} index={i} />
        ))}
      </div>

      <div className="container">
        <Reveal className="portfolio__outro">
          <p className="portfolio__outro-title display">
            O resto
            <br />
            tá no <span>Instagram.</span>
          </p>
          <ul className="portfolio__handles">
            {[studio, ...artists].map((profile) => (
              <li key={profile.instagram.handle}>
                <a className="portfolio__handle" href={profile.instagram.url} target="_blank" rel="noreferrer">
                  {profile.instagram.handle} <ExternalIcon width={16} height={16} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

interface ChapterProps {
  artist: Artist
  items: PortfolioItem[]
  start: number
  index: number
}

function Chapter({ artist, items, start, index }: ChapterProps) {
  const [lead, second, ...rest] = items
  const titleId = `${workAnchor(artist.id)}-titulo`

  return (
    <article
      id={workAnchor(artist.id)}
      className={`chapter container${index % 2 ? ' chapter--flip' : ''}`}
      aria-labelledby={titleId}
      style={{ '--accent': artist.accent } as CSSProperties}
    >
      <p className="chapter__ghost display" aria-hidden="true">
        {artist.displayName[0]}
      </p>

      <Reveal className="chapter__info">
        <p className="chapter__num display" aria-hidden="true">
          {pad(index + 1)}
        </p>
        <h3 id={titleId} className="chapter__name display">
          {artist.fullName}
        </h3>
        <p className="chapter__styles label">{artist.specialties.slice(0, 3).join(' · ')}</p>
        <a className="chapter__link link-underline" href={artist.instagram.url} target="_blank" rel="noreferrer">
          {artist.instagram.handle} <ExternalIcon width={14} height={14} />
        </a>
      </Reveal>

      {lead ? (
        <Piece item={lead} number={start + 1} className="chapter__a" />
      ) : (
        <Reveal className="chapter__a">
          <ImageSlot label={`Trabalhos de ${artist.fullName}`} note="Fotos a enviar pelo artista." />
        </Reveal>
      )}
      {second && <Piece item={second} number={start + 2} className="chapter__b" />}

      {rest.length > 0 && (
        <div className="chapter__more">
          {rest.map((item, n) => (
            <Piece key={item.image.src} item={item} number={start + 3 + n} />
          ))}
        </div>
      )}
    </article>
  )
}

interface PieceProps {
  item: PortfolioItem
  number: number
  className?: string
}

/** Foto de trabalho apresentada como pôster colado na parede. */
function Piece({ item, number, className = '' }: PieceProps) {
  return (
    <Reveal className={`piece ${className}`}>
      <figure className="piece__figure">
        <span className="piece__tape" aria-hidden="true" />
        <div className="piece__frame">
          <img
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            style={{ objectPosition: item.image.position }}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className="piece__caption">
          <span className="piece__number">Nº {pad(number)}</span>
          <span>{item.caption}</span>
        </figcaption>
      </figure>
    </Reveal>
  )
}
