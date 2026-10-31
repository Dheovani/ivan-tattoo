import { artists, services, studio } from '../data/site'
import { ImageSlot } from './ImageSlot'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import './About.css'

const pad = (n: number) => String(n).padStart(2, '0')

export function About() {
  const facts = [
    { value: pad(artists.length), label: 'Artistas' },
    { value: pad(services.length), label: 'Serviços — tattoo e piercing' },
    { value: '13×', label: 'Prêmios de Ivan Henrique' },
    { value: 'SC', label: studio.city.replace(' — SC', '') },
  ]

  return (
    <section id="estudio" className="about section" aria-labelledby="estudio-title">
      <div className="container">
        <SectionHeading id="estudio-title" index="01" label="O estúdio" title={['Um endereço.', 'Três assinaturas.']} />

        <div className="about__grid">
          <Reveal variant="mask" className="about__media">
            {studio.interiorPhoto ? (
              <img
                src={studio.interiorPhoto.src}
                alt={studio.interiorPhoto.alt}
                width={studio.interiorPhoto.width}
                height={studio.interiorPhoto.height}
                loading="lazy"
              />
            ) : (
              <ImageSlot label="Interior do estúdio — mural" note="Foto do espaço com o mural vermelho e laranja.">
                <span className="about__mural" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </ImageSlot>
            )}
            <p className="about__caption label">Fig. 01 — O espaço</p>
          </Reveal>

          <div className="about__text">
            <Reveal>
              <p className="about__lead">
                Tatuagem e piercing dividindo as mesmas paredes em {studio.city.replace(' — ', '/')}. Cada artista com
                a própria linguagem, o próprio traço e a própria agenda.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                O <strong>{studio.name}</strong> reúne o black and gray de Ivan Henrique, o traço de Pamela Schmitt e o
                trabalho em metal de Seco. Estilos diferentes, um mesmo endereço.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="about__note">
                <span className="about__note-mark" aria-hidden="true" />
                {studio.booking}.
              </p>
            </Reveal>

            <dl className="about__facts">
              {facts.map((fact, i) => (
                <Reveal key={fact.label} delay={i * 80} className="about__fact">
                  <dt className="label">{fact.label}</dt>
                  <dd className="display">{fact.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <p className="about__band display outline-text" aria-hidden="true">
        Tattoo · Piercing · Joinville · Tattoo · Piercing
      </p>
    </section>
  )
}
