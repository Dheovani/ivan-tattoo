import type { ReactNode } from 'react'
import './ImageSlot.css'

interface ImageSlotProps {
  /** O que deve ocupar este espaço quando houver a foto real. */
  label: string
  note?: string
  className?: string
  children?: ReactNode
}

/**
 * Espaço reservado para fotografias reais ainda não fornecidas.
 * Deixa explícito que não é um trabalho do estúdio.
 */
export function ImageSlot({ label, note, className = '', children }: ImageSlotProps) {
  return (
    <div className={`image-slot ${className}`} role="img" aria-label={`Espaço reservado: ${label}`}>
      {children}
      <span className="image-slot__crop image-slot__crop--tl" aria-hidden="true" />
      <span className="image-slot__crop image-slot__crop--br" aria-hidden="true" />
      <span className="image-slot__text">
        <span className="label">Foto a receber</span>
        <span className="image-slot__label">{label}</span>
        {note && <span className="image-slot__note">{note}</span>}
      </span>
    </div>
  )
}
