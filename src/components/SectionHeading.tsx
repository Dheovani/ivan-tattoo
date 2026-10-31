import { Reveal } from './Reveal'
import './SectionHeading.css'

interface SectionHeadingProps {
  index: string
  label: string
  title: string[]
  id?: string
}

export function SectionHeading({ index, label, title, id }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <Reveal>
        <p className="section-heading__meta label">
          <span className="section-heading__index">{index}</span>
          <span className="section-heading__rule" aria-hidden="true" />
          {label}
        </p>
      </Reveal>
      <h2 className="section-heading__title display" id={id}>
        {title.map((line, i) => (
          <Reveal key={line} variant="mask" delay={i * 90}>
            <span className="section-heading__line">{line}</span>
          </Reveal>
        ))}
      </h2>
    </header>
  )
}
