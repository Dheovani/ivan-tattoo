import { artists, navLinks, studio } from '../data/site'
import { InstagramIcon } from './Icons'
import './Footer.css'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__mark display" aria-hidden="true">
              IH
            </span>
            <p>
              {studio.name}
              <br />
              <span className="label">Tattoo & piercing — {studio.city}</span>
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="label">Navegação</h2>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className="link-underline" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label">Instagram</h2>
            <ul>
              {[studio, ...artists].map((profile) => (
                <li key={profile.instagram.handle}>
                  <a className="footer__social link-underline" href={profile.instagram.url} target="_blank" rel="noreferrer">
                    <InstagramIcon width={15} height={15} /> {profile.instagram.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer__word display" aria-hidden="true">
          {studio.shortName}
        </p>

        <div className="footer__bottom label">
          <span>
            © {YEAR} {studio.name}
          </span>
          <span>Protótipo de demonstração</span>
          <a href="#top" className="link-underline">
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
