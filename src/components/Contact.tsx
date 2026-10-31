import type { CSSProperties } from 'react'
import { artists, studio, whatsappUrl } from '../data/site'
import { ExternalIcon, InstagramIcon, WhatsappIcon } from './Icons'
import { ImageSlot } from './ImageSlot'
import { Reveal } from './Reveal'
import './Contact.css'

export function Contact() {
  return (
    <section id="contato" className="contact section" aria-labelledby="contato-title">
      <div className="container">
        <div className="contact__top">
          <div className="contact__intro">
            <Reveal>
              <p className="contact__meta label">
                <span className="contact__index">05</span> Contato & agendamento
              </p>
            </Reveal>
            <h2 id="contato-title" className="contact__title display">
              {['A próxima', 'obra', 'é sua.'].map((line, i) => (
                <Reveal key={line} variant="mask" delay={i * 90}>
                  <span>{line}</span>
                </Reveal>
              ))}
            </h2>
            <Reveal delay={200}>
              <p className="contact__lead">
                {studio.booking}. Escolha o artista e chame direto — ou acesse todos os contatos do estúdio em um só
                lugar.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="contact__studio-links">
                <a className="btn" href={studio.linktree} target="_blank" rel="noreferrer">
                  Todos os contatos <ExternalIcon />
                </a>
                <a className="btn btn--ghost" href={studio.instagram.url} target="_blank" rel="noreferrer">
                  <InstagramIcon /> {studio.instagram.handle}
                </a>
              </div>
            </Reveal>
          </div>

          <ul className="contact__artists">
            {artists.map((artist, i) => (
              <li key={artist.id} style={{ '--accent': artist.accent } as CSSProperties}>
                <Reveal delay={i * 90} className="contact__artist">
                  <img
                    className="contact__artist-emblem"
                    src={artist.emblem.src}
                    alt=""
                    width={56}
                    height={56}
                    loading="lazy"
                  />
                  <div className="contact__artist-name">
                    <span className="label">{artist.role}</span>
                    <strong className="display">{artist.fullName}</strong>
                  </div>
                  <div className="contact__artist-links">
                    {artist.whatsapp && (
                      <a
                        href={whatsappUrl(artist.whatsapp, `Olá, ${artist.fullName}! Vim pelo site do estúdio.`)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`WhatsApp de ${artist.fullName}`}
                      >
                        <WhatsappIcon />
                      </a>
                    )}
                    <a
                      href={artist.instagram.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Instagram de ${artist.fullName} (${artist.instagram.handle})`}
                    >
                      <InstagramIcon />
                    </a>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__info">
          <Reveal className="contact__block">
            <h3 className="label">Endereço</h3>
            <p className="contact__value display">{studio.city}</p>
            {studio.address ? (
              <address>{studio.address}</address>
            ) : (
              <p className="contact__pending">Endereço completo a confirmar com o estúdio.</p>
            )}
          </Reveal>
          <Reveal className="contact__block" delay={90}>
            <h3 className="label">Horários</h3>
            <p className="contact__value display">Hora marcada</p>
            <p className="contact__pending">{studio.hours ?? 'Dias e horários a confirmar com o estúdio.'}</p>
          </Reveal>
          <Reveal className="contact__block contact__map" delay={180}>
            {studio.mapEmbedUrl ? (
              <iframe
                title={`Mapa — ${studio.name}`}
                src={studio.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <ImageSlot label="Mapa de localização" note="Incorporação do Google Maps após confirmar o endereço." />
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
