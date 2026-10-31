import type { CSSProperties } from 'react'
import { artistAnchor, artists, whatsappUrl, workAnchor, type Artist } from '../data/site'
import { ArrowIcon, InstagramIcon, WhatsappIcon } from './Icons'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import './Artists.css'

export function Artists() {
  return (
    <section id="artistas" className="artists section" aria-labelledby="artistas-title">
      <div className="container">
        <SectionHeading id="artistas-title" index="02" label="Artistas" title={['Cada um', 'com seu traço.']} />
      </div>
      <div className="artists__list">
        {artists.map((artist, i) => (
          <ArtistFeature key={artist.id} artist={artist} index={i} />
        ))}
      </div>
    </section>
  )
}

interface ArtistFeatureProps {
  artist: Artist
  index: number
}

function ArtistFeature({ artist, index }: ArtistFeatureProps) {
  const number = String(index + 1).padStart(2, '0')
  const headingId = `${artistAnchor(artist.id)}-nome`

  return (
    <article
      id={artistAnchor(artist.id)}
      className={`artist container${index % 2 ? ' artist--flip' : ''}`}
      aria-labelledby={headingId}
      style={{ '--accent': artist.accent } as CSSProperties}
    >
      <Reveal variant="mask" className="artist__media">
        <div className="artist__stage">
          <span className="artist__number display" aria-hidden="true">
            {number}
          </span>
          {/* O retrato fala por si; o emblema só aparece enquanto não houver foto. */}
          {artist.portrait ? (
            <img
              className="artist__portrait"
              src={artist.portrait.src}
              alt={artist.portrait.alt}
              width={artist.portrait.width}
              height={artist.portrait.height}
              style={{ objectPosition: artist.portrait.position }}
              loading="lazy"
            />
          ) : (
            <div className="artist__emblem">
              <img
                src={artist.emblem.src}
                alt={artist.emblem.alt}
                width={artist.emblem.width}
                height={artist.emblem.height}
                style={{ width: Math.min(300, Math.max(180, Math.round(artist.emblem.width * 1.5))) }}
                loading="lazy"
              />
            </div>
          )}
          <span className="artist__stamp label" aria-hidden="true">
            {artist.role} · {number}
          </span>
        </div>
      </Reveal>

      <div className="artist__info">
        <Reveal>
          <p className="artist__role label">
            <span className="artist__dot" aria-hidden="true" />
            {artist.role}
          </p>
        </Reveal>
        <h3 id={headingId} className="artist__name display">
          {artist.displayName.map((part, i) => (
            <Reveal key={part} variant="mask" delay={i * 90}>
              <span>{part}</span>
            </Reveal>
          ))}
        </h3>

        <Reveal delay={150}>
          <ul className="artist__tags" aria-label="Especialidades">
            {artist.specialties.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={220}>
          <div className="artist__bio">
            {artist.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="artist__actions">
            {artist.whatsapp ? (
              <a
                className="btn"
                href={whatsappUrl(artist.whatsapp, `Olá, ${artist.fullName}! Vim pelo site do estúdio.`)}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsappIcon /> Agendar
              </a>
            ) : (
              <a className="btn" href={artist.instagram.url} target="_blank" rel="noreferrer">
                <InstagramIcon /> Agenda & orçamentos
              </a>
            )}
            <a className="btn btn--ghost" href={artist.instagram.url} target="_blank" rel="noreferrer">
              <InstagramIcon /> {artist.instagram.handle}
            </a>
            <a className="artist__work link-underline" href={`#${workAnchor(artist.id)}`}>
              Ver trabalhos <ArrowIcon width={16} height={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  )
}
