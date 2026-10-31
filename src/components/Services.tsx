import { artistAnchor, getArtist, services } from '../data/site'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import './Services.css'

export function Services() {
  return (
    <section id="servicos" className="services section" aria-labelledby="servicos-title">
      <div className="container">
        <SectionHeading id="servicos-title" index="03" label="Serviços" title={['Tinta', 'e metal.']} />

        <ol className="services__list">
          {services.map((service, i) => (
            <li key={service.id}>
              <Reveal delay={i * 100}>
                <article className="service" aria-labelledby={`servico-${service.id}`}>
                  <span className="service__num label">{String(i + 1).padStart(2, '0')}</span>
                  <h3 id={`servico-${service.id}`} className="service__title display">
                    {service.title}
                  </h3>
                  <div className="service__body">
                    <p>{service.description}</p>
                    <ul className="service__tags" aria-label="Estilos e tipos">
                      {service.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <p className="service__artists">
                      <span className="label">Com</span>
                      {service.artists.map((id, n) => (
                        <span key={id}>
                          {n > 0 && <span aria-hidden="true"> / </span>}
                          <a className="link-underline" href={`#${artistAnchor(id)}`}>
                            {getArtist(id).fullName}
                          </a>
                        </span>
                      ))}
                    </p>
                  </div>
                  <a className="service__cta" href="#contato" aria-label={`Agendar ${service.title.toLowerCase()}`}>
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
