/**
 * Prism 语法高亮 CSS — 逐像素匹配 nyxui 原版
 * 每个主题覆盖特定的 token 颜色
 */

export function getAcbScrollbarCSS(theme, thumbColor) {
  const hoverColor = thumbColor.replace(
    /[\d.]+\)$/,
    (m) => String(Math.min(parseFloat(m) + 0.2, 1)) + ')'
  )
  return `
.${theme} .code-scrollbar::-webkit-scrollbar { height:8px; width:8px; }
.${theme} .code-scrollbar::-webkit-scrollbar-track { background:transparent; margin:0 4px; }
.${theme} .code-scrollbar::-webkit-scrollbar-thumb { background:${thumbColor}; border-radius:4px; }
.${theme} .code-scrollbar::-webkit-scrollbar-thumb:hover { background:${hoverColor}; }
.${theme} .code-scrollbar { scrollbar-width:thin; scrollbar-color:${thumbColor} transparent; }
`
}

export function getAcbPrismCSS(theme) {
  const base = `
.token.comment, .token.prolog, .token.doctype, .token.cdata { color:#6a737d; font-style:italic; }
.token.punctuation { color:#f8f8f2; }
.token.property, .token.tag, .token.constant, .token.symbol, .token.deleted { color:#f92672; }
.token.boolean, .token.number { color:#ae81ff; }
.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color:#a6e22e; }
.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string, .token.variable { color:#f8f8f2; }
.token.atrule, .token.attr-value, .token.function, .token.class-name { color:#e6db74; }
.token.keyword { color:#66d9ef; }
.token.regex, .token.important { color:#fd971f; }
`

  switch (theme) {
    case 'nightowl':
      return `${base}
.token.comment, .token.prolog, .token.doctype, .token.cdata { color:#637777; font-style:italic; }
.token.punctuation { color:#c792ea; }
.token.property, .token.tag, .token.constant, .token.symbol, .token.deleted { color:#f78c6c; }
.token.boolean, .token.number { color:#ff5874; }
.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color:#addb67; }
.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string { color:#c792ea; }
.token.keyword { color:#7fdbca; }
.token.atrule, .token.attr-value, .token.function, .token.class-name { color:#82aaff; }
.token.regex, .token.important, .token.variable { color:#d6deeb; }
.token.bold { font-weight:bold; }
.token.italic { font-style:italic; }`

    case 'terminal':
      return `${base}
.token.comment, .token.prolog, .token.doctype, .token.cdata { color:#10b981; opacity:0.7; }
.token.property, .token.tag, .token.constant, .token.symbol, .token.deleted { color:#34d399; }
.token.boolean, .token.number { color:#6ee7b7; }
.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color:#a7f3d0; }
.token.keyword { color:#10b981; font-weight:bold; }
.token.atrule, .token.attr-value, .token.function, .token.class-name { color:#34d399; }`

    case 'cyberpunk':
      return `${base}
.token.comment, .token.prolog, .token.doctype, .token.cdata { color:#a855f7; opacity:0.8; }
.token.property, .token.tag, .token.constant, .token.symbol, .token.deleted { color:#ec4899; }
.token.boolean, .token.number { color:#f472b6; }
.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color:#e879f9; }
.token.keyword { color:#c084fc; font-weight:bold; }
.token.atrule, .token.attr-value, .token.function, .token.class-name { color:#d946ef; }`

    default: // dark
      return base
  }
}
