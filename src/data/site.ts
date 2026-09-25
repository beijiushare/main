export const DESKTOP_MIN_WIDTH = 769
export const SITE_TITLE = 'BEIJIU.TOP'
export const SHINY_TEXT_PROPS = {
  text: SITE_TITLE,
  speed: 3,
  color: 'rgba(200,200,200,0.85)',
  shineColor: '#ffffff',
  spread: 150,
  direction: 'left' as const,
}

export const UNICORN_CANVAS_PROPS = {
  src: '/unicorn.webp',
  cellSize: 5,
  dotScale: 0.8,
  shape: 'circle' as const,
  backgroundColor: '',
  dropoutStrength: 0.4,
  interactive: true,
  distortionStrength: 14,
  distortionRadius: 80,
  distortionMode: 'swirl' as const,
  followSpeed: 0.2,
  jitterStrength: 4,
  jitterSpeed: 4,
  sampleAverage: true,
  tintColor: '#D946EF',
  tintStrength: 0.12,
  objectFit: 'contain' as const,
}
