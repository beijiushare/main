/**
 * 主题色配置 — 逐像素匹配 nyxui 原版 animated-code-block
 * 每个主题包含：
 *   bg, solidBg, text, lineNumColor, hlBg, borderColor, headerBg,
 *   accent, accentText, shadow, scrollbarThumb,
 *   fadeLeft, fadeRight (渐变遮罩)
 */

export const ACB_THEMES = {
  dark: {
    bg: '#18181b',               // bg-zinc-900
    solidBg: '#18181b',          // 渐变主题用，dark 纯色同 bg
    text: '#f4f4f5',             // text-zinc-100
    lineNumColor: '#71717a',     // text-zinc-500
    hlBg: '#27272a',             // bg-zinc-800
    borderColor: '#27272a',      // border-zinc-800
    headerBg: '#27272a',         // bg-zinc-800
    accent: '#4f46e5',           // bg-indigo-600
    accentText: '#818cf8',       // text-indigo-400
    shadow: '0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -4px rgba(0,0,0,0.1)', // shadow-lg shadow-black/20
    scrollbarThumb: 'rgba(255,255,255,0.2)',
    fadeLeft: 'rgba(24,24,27,0.8)',
    fadeRight: 'rgba(24,24,27,0.8)',
    blurColor: '#60a5fa',        // bg-blue-400
  },
  terminal: {
    bg: '#0d1117',               // bg-[#0d1117]
    solidBg: '#0d1117',
    text: '#00ff88',             // text-[#00ff88]
    lineNumColor: '#009966',     // text-[#009966]
    hlBg: 'rgba(0,59,47,0.6)',  // bg-[#003b2f]/60
    borderColor: '#1f2a30',      // border-[#1f2a30]
    headerBg: '#161b22',         // bg-[#161b22]
    accent: '#00c46f',           // bg-[#00c46f]
    accentText: '#00ff88',       // text-[#00ff88]
    shadow: '0 4px 6px -1px rgba(0,255,136,0.2), 0 2px 4px -2px rgba(0,255,136,0.1)', // shadow-md shadow-[#00ff88]/20
    scrollbarThumb: 'rgba(0,255,136,0.3)',
    fadeLeft: 'rgba(2,6,23,0.8)',
    fadeRight: 'rgba(2,6,23,0.8)',
    blurColor: '#34d399',        // bg-emerald-400
  },
  cyberpunk: {
    bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    solidBg: '#1a153a',
    text: '#e0e0f0',             // text-[#e0e0f0]
    lineNumColor: '#8f7ada',     // text-[#8f7ada]
    hlBg: 'rgba(62,45,103,0.6)', // bg-[#3e2d67]/60
    borderColor: '#5a4b8d',      // border-[#5a4b8d]
    headerBg: 'linear-gradient(90deg, #2e1a47, #443266)',
    accent: '#ff00a0',           // bg-[#ff00a0]
    accentText: '#ff00a0',       // text-[#ff00a0]
    shadow: '0 10px 15px -3px rgba(255,0,160,0.2), 0 4px 6px -4px rgba(255,0,160,0.1)', // shadow-lg shadow-[#ff00a0]/20
    scrollbarThumb: 'rgba(255,0,160,0.3)',
    fadeLeft: 'rgba(76,29,149,0.8)',
    fadeRight: 'rgba(76,29,149,0.8)',
    blurColor: '#d946ef',        // bg-fuchsia-400
  },
  nightowl: {
    bg: '#011627',               // bg-[#011627]
    solidBg: '#011627',
    text: '#d6deeb',             // text-[#d6deeb]
    lineNumColor: '#5f7e97',     // text-[#5f7e97]
    hlBg: '#1d3b53',             // bg-[#1d3b53]
    borderColor: '#1e2d3d',      // border-[#1e2d3d]
    headerBg: '#0b2942',         // bg-[#0b2942]
    accent: '#82aaff',           // bg-[#82aaff]
    accentText: '#82aaff',       // text-[#82aaff]
    shadow: '0 4px 6px -1px rgba(130,170,255,0.2), 0 2px 4px -2px rgba(130,170,255,0.1)', // shadow-md shadow-[#82aaff]/20
    scrollbarThumb: 'rgba(130,170,255,0.3)',
    fadeLeft: 'rgba(11,41,66,0.8)',
    fadeRight: 'rgba(11,41,66,0.5)',
    blurColor: '#60a5fa',        // bg-blue-400
  },
}

export function getAcbTheme(theme) {
  return ACB_THEMES[theme] || ACB_THEMES.dark
}
