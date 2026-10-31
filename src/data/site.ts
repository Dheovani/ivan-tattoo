/**
 * Conteúdo do site, separado da apresentação.
 *
 * Fonte dos dados verificados: bios públicas do Instagram consultadas em 2026-10-20.
 * Campos `null` = informação ainda não confirmada; a interface mostra um espaço reservado.
 */

/** Caminho de arquivos em `public/`, respeitando o `base` do Vite. */
const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`

export type ArtistId = 'ivan' | 'pamela' | 'seco'

export interface Image {
  src: string
  alt: string
  width: number
  height: number
  /** Ponto focal no recorte (CSS `object-position`), ex.: '45% 30%'. */
  position?: string
}

export interface Artist {
  id: ArtistId
  /** Nome artístico exibido em destaque, já quebrado em linhas. */
  displayName: string[]
  fullName: string
  role: string
  specialties: string[]
  bio: string[]
  /** Emblema/logo — imagem representativa enquanto não houver retrato. */
  emblem: Image
  /** Retrato do artista. Quando preenchido, aparece em destaque com o emblema sobreposto. */
  portrait: Image | null
  /** Cor de destaque extraída do emblema. */
  accent: string
  instagram: { handle: string; url: string }
  /** Número no formato internacional, só dígitos. Fonte: link da bio do Instagram — confirmar. */
  whatsapp: string | null
}

export interface Service {
  id: string
  title: string
  description: string
  tags: string[]
  artists: ArtistId[]
}

export interface PortfolioItem {
  image: Image
  artist: ArtistId
  /** Legenda curta exibida sob a foto. */
  caption: string
}

export interface HeroSlide {
  artist: ArtistId
  kicker: string
  headline: string[]
  text: string
  cta: string
}

export const studio = {
  name: 'Studio Ivan Henrique',
  shortName: 'Ivan Henrique',
  city: 'Joinville — SC',
  booking: 'Atendimento com hora marcada',
  instagram: {
    handle: '@studioivanhenrique',
    url: 'https://www.instagram.com/studioivanhenrique/',
  },
  linktree: 'https://linktr.ee/studioivanhenrique',
  /** Endereço completo — a confirmar com o estúdio. */
  address: null as string | null,
  /** URL de incorporação do Google Maps — a confirmar. */
  mapEmbedUrl: null as string | null,
  /** Horários de funcionamento — a confirmar. */
  hours: null as string | null,
  /** Foto do interior (mural). Enviar arquivo em alta resolução para `public/`. */
  interiorPhoto: null as Image | null,
}

export const artists: Artist[] = [
  {
    id: 'ivan',
    displayName: ['Ivan', 'Henrique'],
    fullName: 'Ivan Henrique',
    role: 'Tatuador',
    specialties: ['Black and gray'],
    bio: [
      'Especialista em black and gray, com 13 prêmios de tatuagem conquistados.',
      'É o nome por trás do Studio Ivan Henrique.',
    ],
    emblem: {
      src: asset('ivan.png'),
      alt: 'Monograma IH ornamentado em dourado e laranja sobre fundo preto',
      width: 100,
      height: 100,
    },
    portrait: {
      src: asset('artists/ivan-retrato.webp'),
      alt: 'Ivan Henrique segurando uma máquina de tatuagem em primeiro plano, com luvas pretas',
      width: 1200,
      height: 1600,
      position: '50% 35%',
    },
    accent: '#E66B24',
    instagram: {
      handle: '@ivanhenriquetattoo',
      url: 'https://www.instagram.com/ivanhenriquetattoo/',
    },
    whatsapp: '5547997591403',
  },
  {
    id: 'pamela',
    displayName: ['Pamela', 'Schmitt'],
    fullName: 'Pamela Schmitt',
    role: 'Tatuadora',
    specialties: ['Black and grey', 'Fine line', 'Floral', 'Lettering', 'Retrato'],
    bio: [
      'Tatuadora com trabalhos em black and grey, fine line, floral, lettering e retrato.',
      'Agenda e orçamentos direto pelo Instagram.',
    ],
    emblem: {
      src: asset('pamela.png'),
      alt: 'Emblema Pamela Tattoo com monograma P em rosa sobre moldura escura',
      width: 150,
      height: 150,
    },
    portrait: {
      src: asset('artists/pamela-retrato.webp'),
      alt: 'Retrato em preto e branco de Pamela Schmitt, tatuada, segurando uma máquina de tatuagem com luva preta',
      width: 1200,
      height: 1306,
      position: '40% 30%',
    },
    accent: '#D9578A',
    instagram: {
      handle: '@_pamelatattoo',
      url: 'https://www.instagram.com/_pamelatattoo/',
    },
    whatsapp: null,
  },
  {
    id: 'seco',
    displayName: ['Seco'],
    fullName: 'Seco',
    role: 'Piercer',
    specialties: ['Piercings básicos', 'Piercings avançados'],
    bio: [
      'Piercer profissional, especialista em piercings básicos e avançados.',
      'Agendamento de horário pelo link do perfil.',
    ],
    emblem: {
      src: asset('seco.png'),
      alt: 'Monograma SP dourado em moldura Art Déco, assinatura Seco Piercer',
      width: 100,
      height: 100,
    },
    portrait: {
      src: asset('artists/seco-retrato.webp'),
      alt: 'Seco, de máscara e luvas, aplicando um piercing na orelha de uma cliente no estúdio',
      width: 1034,
      height: 1293,
      position: '55% 70%',
    },
    accent: '#C9A45C',
    instagram: {
      handle: '@seco.piercer',
      url: 'https://www.instagram.com/seco.piercer/',
    },
    whatsapp: '5547997835393',
  },
]

export const heroSlides: HeroSlide[] = [
  {
    artist: 'ivan',
    kicker: 'Ivan Henrique — Tattoo',
    headline: ['Preto.', 'Cinza.', 'Sem padrão.'],
    text: 'Black and gray com 13 prêmios no currículo.',
    cta: 'Conheça o Ivan',
  },
  {
    artist: 'pamela',
    kicker: 'Pamela Schmitt — Tattoo',
    headline: ['Traço', 'com', 'identidade.'],
    text: 'Fine line, floral, lettering e retrato.',
    cta: 'Conheça a Pamela',
  },
  {
    artist: 'seco',
    kicker: 'Seco — Piercer',
    headline: ['Metal', 'na pele.'],
    text: 'Piercings básicos e avançados, do jeito certo.',
    cta: 'Conheça o Seco',
  },
]

export const services: Service[] = [
  {
    id: 'tatuagem',
    title: 'Tatuagem',
    description:
      'Projetos personalizados em diferentes linguagens. Cada artista desenvolve o desenho com você a partir do próprio estilo.',
    tags: ['Black and gray', 'Fine line', 'Floral', 'Lettering', 'Retrato'],
    artists: ['ivan', 'pamela'],
  },
  {
    id: 'piercing',
    title: 'Piercing',
    description:
      'Perfurações básicas e avançadas com profissional dedicado exclusivamente ao piercing.',
    tags: ['Básicos', 'Avançados'],
    artists: ['seco'],
  },
]

/**
 * Trabalhos do portfólio, agrupados por artista na ordem de `artists`.
 * Para adicionar: coloque o arquivo em `public/portfolio/` e inclua um item aqui.
 */
export const portfolio: PortfolioItem[] = [
  {
    image: {
      src: asset('portfolio/ivan-jesus.webp'),
      alt: 'Tatuagem realista em preto e cinza de Jesus com coroa de espinhos, no ombro',
      width: 800,
      height: 1424,
    },
    artist: 'ivan',
    caption: 'Jesus — ombro',
  },
  {
    image: {
      src: asset('portfolio/ivan-aguia.webp'),
      alt: 'Tatuagem realista em preto e cinza de águia com algarismos romanos, no antebraço',
      width: 800,
      height: 1420,
    },
    artist: 'ivan',
    caption: 'Águia — antebraço',
  },
  {
    image: {
      src: asset('portfolio/pamela-cavaleiro.webp'),
      alt: 'Tatuagem em preto e cinza de cavaleiro de armadura com medalha de São Bento, na perna',
      width: 800,
      height: 926,
    },
    artist: 'pamela',
    caption: 'Cavaleiro — perna',
  },
  {
    image: {
      src: asset('portfolio/pamela-fechamento-braco.webp'),
      alt: 'Fechamento de braço em preto e cinza com Jesus e leão, fotografado no estúdio',
      width: 800,
      height: 1066,
      position: '55% 50%',
    },
    artist: 'pamela',
    caption: 'Fechamento de braço',
  },
  {
    image: {
      src: asset('portfolio/seco-septo-labret.webp'),
      alt: 'Piercing no septo com argola de aço e labret vertical no lábio inferior',
      width: 800,
      height: 1066,
      position: '40% 50%',
    },
    artist: 'seco',
    caption: 'Septo + labret vertical',
  },
  {
    image: {
      src: asset('portfolio/seco-daith.webp'),
      alt: 'Piercing daith com argola dourada cravejada, com brincos no lóbulo',
      width: 800,
      height: 1066,
      position: '45% 55%',
    },
    artist: 'seco',
    caption: 'Daith',
  },
]

export const navLinks = [
  { href: '#estudio', label: 'Estúdio' },
  { href: '#artistas', label: 'Artistas' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#contato', label: 'Contato' },
]

export const getArtist = (id: ArtistId): Artist => {
  const artist = artists.find((a) => a.id === id)
  if (!artist) throw new Error(`Artista desconhecido: ${id}`)
  return artist
}

export const whatsappUrl = (phone: string, message?: string) =>
  `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`

export const artistAnchor = (id: ArtistId) => `artista-${id}`

export const workAnchor = (id: ArtistId) => `trabalhos-${id}`
