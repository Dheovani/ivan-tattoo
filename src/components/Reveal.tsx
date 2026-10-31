import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  className?: string
  /** 'up' = sobe com fade; 'mask' = revelada por máscara de baixo para cima. */
  variant?: 'up' | 'mask'
  delay?: number
}

export function Reveal({ children, className = '', variant = 'up', delay = 0 }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const classes = ['reveal', variant === 'mask' && 'reveal--mask', inView && 'is-visible', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classes} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}
