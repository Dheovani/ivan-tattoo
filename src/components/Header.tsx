import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { navLinks, studio } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { InstagramIcon } from './Icons'
import './Header.css'

const sectionIds = navLinks.map((l) => l.href.slice(1))

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth > 960 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <p className="site-header__notice">
        <span className="site-header__notice-dot" aria-hidden="true" />
        Protótipo não oficial
        <span className="site-header__notice-extra"> · proposta de site para o {studio.name}</span>
      </p>
      <div className="site-header__bar container">
        <a href="#top" className="site-header__brand" onClick={close}>
          <span className="site-header__brand-mark" aria-hidden="true">IH</span>
          <span className="site-header__brand-name">
            Studio <strong>Ivan Henrique</strong>
          </span>
        </a>

        <nav className="site-header__nav" aria-label="Principal">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={active === link.href.slice(1) ? 'is-active' : undefined}
                  aria-current={active === link.href.slice(1) ? 'location' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contato" className="btn site-header__cta">
          Agendar <span className="btn__arrow" aria-hidden="true">→</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
          <span className="site-header__toggle-line" aria-hidden="true" />
          <span className="site-header__toggle-line" aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Menu móvel">
          <ul>
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ '--i': i } as CSSProperties}>
                <a href={link.href} onClick={close} ref={i === 0 ? firstLinkRef : undefined}>
                  <span className="label">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">
          <span className="label">{studio.city}</span>
          <a href={studio.instagram.url} target="_blank" rel="noreferrer" className="link-underline">
            <InstagramIcon /> {studio.instagram.handle}
          </a>
        </div>
      </div>
    </header>
  )
}
