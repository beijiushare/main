export interface AcbThemeConfig {
  bg: string
  solidBg: string
  text: string
  lineNumColor: string
  hlBg: string
  borderColor: string
  headerBg: string
  accent: string
  accentText: string
  shadow: string
  scrollbarThumb: string
  fadeLeft: string
  fadeRight: string
  blurColor: string
}

export const ACB_THEMES: Record<string, AcbThemeConfig> = {
  dark: {
    bg: '#18181b',
    solidBg: '#18181b',
    text: '#f4f4f5',
    lineNumColor: '#71717a',
    hlBg: '#27272a',
    borderColor: '#27272a',
    headerBg: '#27272a',
    accent: '#4f46e5',
    accentText: '#818cf8',
    shadow: '0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -4px rgba(0,0,0,0.1)',
    scrollbarThumb: 'rgba(255,255,255,0.2)',
    fadeLeft: 'rgba(24,24,27,0.8)',
    fadeRight: 'rgba(24,24,27,0.8)',
    blurColor: '#60a5fa',
  },
  terminal: {
    bg: '#0d1117',
    solidBg: '#0d1117',
    text: '#00ff88',
    lineNumColor: '#009966',
    hlBg: 'rgba(0,59,47,0.6)',
    borderColor: '#1f2a30',
    headerBg: '#161b22',
    accent: '#00c46f',
    accentText: '#00ff88',
    shadow: '0 4px 6px -1px rgba(0,255,136,0.2), 0 2px 4px -2px rgba(0,255,136,0.1)',
    scrollbarThumb: 'rgba(0,255,136,0.3)',
    fadeLeft: 'rgba(2,6,23,0.8)',
    fadeRight: 'rgba(2,6,23,0.8)',
    blurColor: '#34d399',
  },
  cyberpunk: {
    bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    solidBg: '#1a153a',
    text: '#e0e0f0',
    lineNumColor: '#8f7ada',
    hlBg: 'rgba(62,45,103,0.6)',
    borderColor: '#5a4b8d',
    headerBg: 'linear-gradient(90deg, #2e1a47, #443266)',
    accent: '#ff00a0',
    accentText: '#ff00a0',
    shadow: '0 10px 15px -3px rgba(255,0,160,0.2), 0 4px 6px -4px rgba(255,0,160,0.1)',
    scrollbarThumb: 'rgba(255,0,160,0.3)',
    fadeLeft: 'rgba(76,29,149,0.8)',
    fadeRight: 'rgba(76,29,149,0.8)',
    blurColor: '#d946ef',
  },
  nightowl: {
    bg: '#011627',
    solidBg: '#011627',
    text: '#d6deeb',
    lineNumColor: '#5f7e97',
    hlBg: '#1d3b53',
    borderColor: '#1e2d3d',
    headerBg: '#0b2942',
    accent: '#82aaff',
    accentText: '#82aaff',
    shadow: '0 4px 6px -1px rgba(130,170,255,0.2), 0 2px 4px -2px rgba(130,170,255,0.1)',
    scrollbarThumb: 'rgba(130,170,255,0.3)',
    fadeLeft: 'rgba(11,41,66,0.8)',
    fadeRight: 'rgba(11,41,66,0.5)',
    blurColor: '#60a5fa',
  },
}

export function getAcbTheme(theme: string): AcbThemeConfig {
  return ACB_THEMES[theme] || ACB_THEMES.dark
}
