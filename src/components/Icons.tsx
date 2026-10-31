import type { SVGProps } from 'react'

const base: SVGProps<SVGSVGElement> = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  'aria-hidden': true,
  focusable: false,
}

export const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

export const WhatsappIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M4 20l1.3-4A8 8 0 1 1 8.3 19z" strokeLinejoin="round" />
    <path d="M9.2 8.6c.2 2.6 3.1 5.6 6 6l.9-1.4-1.9-1-1 .8a5 5 0 0 1-2.5-2.5l.8-1-1-1.9z" strokeLinejoin="round" />
  </svg>
)

export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

export const ExternalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
)
