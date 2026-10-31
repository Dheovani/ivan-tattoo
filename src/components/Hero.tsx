import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { artistAnchor, getArtist, heroSlides, studio } from '../data/site'
import { useReducedMotion } from '../hooks/useMedia'
import './Hero.css'

const SLIDE_DURATION = 7000

export function Hero() {
  const [index, setIndex] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [userPaused, setUserPaused] = useState(false)
  const [focusInside, setFocusInside] = useState(false)
  const [visible, setVisible] = useState(true)
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)

  const total = heroSlides.length
  const playing = !userPaused && !reducedMotion && !focusInside && visible

  const goTo = useCallback(
    (target: number, dir?: 'next' | 'prev') => {
      const wrapped = (target + total) % total
      if (wrapped === index) return
      setPrevious(index)
      setDirection(dir ?? (wrapped > index ? 'next' : 'prev'))
      setIndex(wrapped)
    },
    [index, total],
  )

  const next = useCallback(() => goTo(index + 1, 'next'), [goTo, index])
  const prev = useCallback(() => goTo(index - 1, 'prev'), [goTo, index])

  // Pausa a rotação quando o hero sai da tela.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return
    pointerStart.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e: PointerEvent) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) next()
      else prev()
    }
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      className="hero"
      aria-roledescription="carrossel"
      aria-label="Artistas do estúdio"
      data-direction={direction}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (pointerStart.current = null)}
      onFocus={() => setFocusInside(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusInside(false)
      }}
    >
      <h1 className="sr-only">
        {studio.name} — tatuagem e piercing em {studio.city}
      </h1>

      <div className="hero__slides" aria-live={playing ? 'off' : 'polite'}>
        {heroSlides.map((slide, i) => {
          const artist = getArtist(slide.artist)
          const isActive = i === index
          const isPrev = i === previous
          const emblemMax = Math.min(360, Math.max(180, Math.round(artist.emblem.width * 1.5)))
          return (
            <div
              key={slide.artist}
              className={`hero-slide${isActive ? ' is-active' : ''}${isPrev ? ' is-prev' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}: ${artist.fullName}`}
              aria-hidden={!isActive}
              inert={!isActive}
              style={{ '--accent': artist.accent } as CSSProperties}
            >
              <div className="hero-slide__bg" aria-hidden="true">
                <img src={artist.emblem.src} alt="" width={artist.emblem.width} height={artist.emblem.height} />
              </div>
              <div className="hero-slide__shade" aria-hidden="true" />
              <p className="hero-slide__ghost display" aria-hidden="true">
                {artist.displayName[0]}
              </p>

              <div className="hero-slide__inner container">
                <div className="hero-slide__copy">
                  <p className="hero-slide__kicker label">
                    <span className="hero-slide__num">0{i + 1}</span>
                    {slide.kicker}
                  </p>
                  <h2 className="hero-slide__headline display">
                    {slide.headline.map((line, l) => (
                      <span className="hero-slide__line" key={line}>
                        <span style={{ '--l': l } as CSSProperties}>{line}</span>
                      </span>
                    ))}
                  </h2>
                  <p className="hero-slide__text">{slide.text}</p>
                  <a href={`#${artistAnchor(artist.id)}`} className="btn hero-slide__cta">
                    {slide.cta} <span className="btn__arrow" aria-hidden="true">→</span>
                  </a>
                </div>

                <figure className="hero-slide__poster">
                  <span className="hero-slide__tape hero-slide__tape--a" aria-hidden="true" />
                  <span className="hero-slide__tape hero-slide__tape--b" aria-hidden="true" />
                  <div className="hero-slide__poster-head label" aria-hidden="true">
                    <span>Nº 0{i + 1}</span>
                    <span>{artist.role}</span>
                  </div>
                  <div className="hero-slide__emblem">
                    <img
                      src={artist.emblem.src}
                      alt={artist.emblem.alt}
                      width={artist.emblem.width}
                      height={artist.emblem.height}
                      style={{ maxWidth: emblemMax }}
                      fetchPriority={i === 0 ? 'high' : 'low'}
                    />
                  </div>
                  <figcaption className="hero-slide__poster-foot label">
                    {artist.instagram.handle}
                  </figcaption>
                </figure>
              </div>
            </div>
          )
        })}
      </div>

      <div className="hero__controls container">
        <ol className="hero__tabs">
          {heroSlides.map((slide, i) => {
            const artist = getArtist(slide.artist)
            const isActive = i === index
            return (
              <li key={slide.artist}>
                <button
                  type="button"
                  className={`hero__tab${isActive ? ' is-active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Slide ${i + 1}: ${artist.fullName}`}
                  onClick={() => goTo(i)}
                >
                  <span className="hero__tab-num">0{i + 1}</span>
                  <span className="hero__tab-name">{artist.displayName[0]}</span>
                  <span className="hero__tab-track" aria-hidden="true">
                    {isActive && (
                      <span
                        key={`${index}-${reducedMotion}`}
                        className={`hero__tab-fill${reducedMotion ? '' : ' is-timed'}`}
                        style={
                          {
                            '--duration': `${SLIDE_DURATION}ms`,
                            animationPlayState: playing ? 'running' : 'paused',
                          } as CSSProperties
                        }
                        onAnimationEnd={next}
                      />
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        <div className="hero__buttons">
          <button
            type="button"
            className="hero__btn hero__btn--pause"
            onClick={() => setUserPaused((v) => !v)}
            aria-pressed={userPaused}
            hidden={reducedMotion}
          >
            <span className="sr-only">{userPaused ? 'Retomar rotação' : 'Pausar rotação'}</span>
            <span aria-hidden="true">{userPaused ? '▶' : '❚❚'}</span>
          </button>
          <button type="button" className="hero__btn" onClick={prev} aria-label="Slide anterior">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="hero__btn" onClick={next} aria-label="Próximo slide">
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <a href="#estudio" className="hero__scroll label">
          <span>Role</span>
          <span className="hero__scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
