'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

const getScrollbarStyles = (theme: string) => {
  const scrollbarColors: Record<string, string> = {
    dark: 'rgba(255, 255, 255, 0.2)',
    terminal: 'rgba(0, 255, 128, 0.2)',
    cyberpunk: 'rgba(236, 72, 153, 0.3)',
    nightowl: 'rgba(130, 170, 255, 0.3)',
  }
  const color = scrollbarColors[theme] || scrollbarColors.dark
  const hoverColor = color.replace(
    /[\d.]+\)$/,
    (m) => String(Math.min(Number.parseFloat(m) + 0.2, 1)) + ')',
  )
  return `
.code-scrollbar::-webkit-scrollbar { height:8px; width:8px; }
.code-scrollbar::-webkit-scrollbar-track { background:transparent; margin:0 4px; }
.code-scrollbar::-webkit-scrollbar-thumb { background:${color}; border-radius:4px; transition:background 0.2s ease; }
.code-scrollbar::-webkit-scrollbar-thumb:hover { background:${hoverColor}; }
.code-scrollbar { scrollbar-width:thin; scrollbar-color:${color} transparent; }
`
}

const getPrismThemeStyles = (theme: string) => {
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
    default:
      return base
  }
}

interface ThemeStyles {
  background: string
  text: string
  lineNumbers: string
  highlight: string
  border: string
  header: string
  accent: string
  accentText: string
  shadow: string
}

const getThemeStyles = (theme: string): ThemeStyles => {
  switch (theme) {
    case 'dark':
      return {
        background: '#18181b',
        text: '#f4f4f5',
        lineNumbers: '#71717a',
        highlight: '#27272a',
        border: '#27272a',
        header: '#27272a',
        accent: '#4f46e5',
        accentText: '#818cf8',
        shadow: '0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -4px rgba(0,0,0,0.1)',
      }
    case 'nightowl':
      return {
        background: '#011627',
        text: '#d6deeb',
        lineNumbers: '#5f7e97',
        highlight: '#1d3b53',
        border: '#1e2d3d',
        header: '#0b2942',
        accent: '#82aaff',
        accentText: '#82aaff',
        shadow: '0 4px 6px -1px rgba(130,170,255,0.2), 0 2px 4px -2px rgba(130,170,255,0.1)',
      }
    case 'terminal':
      return {
        background: '#0d1117',
        text: '#00ff88',
        lineNumbers: '#009966',
        highlight: 'rgba(0,59,47,0.6)',
        border: '#1f2a30',
        header: '#161b22',
        accent: '#00c46f',
        accentText: '#00ff88',
        shadow: '0 4px 6px -1px rgba(0,255,136,0.2), 0 2px 4px -2px rgba(0,255,136,0.1)',
      }
    case 'cyberpunk':
      return {
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        text: '#e0e0f0',
        lineNumbers: '#8f7ada',
        highlight: 'rgba(62,45,103,0.6)',
        border: '#5a4b8d',
        header: 'linear-gradient(90deg, #2e1a47, #443266)',
        accent: '#ff00a0',
        accentText: '#ff00a0',
        shadow: '0 10px 15px -3px rgba(255,0,160,0.2), 0 4px 6px -4px rgba(255,0,160,0.1)',
      }
    default:
      return {
        background: '#18181b',
        text: '#f4f4f5',
        lineNumbers: '#71717a',
        highlight: '#27272a',
        border: '#27272a',
        header: '#27272a',
        accent: '#4f46e5',
        accentText: '#818cf8',
        shadow: '0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -4px rgba(0,0,0,0.1)',
      }
  }
}

function getBlurColor(theme: string): string {
  switch (theme) {
    case 'terminal': return '#34d399'
    case 'cyberpunk': return '#d946ef'
    default: return '#60a5fa'
  }
}

function getFadeLeft(theme: string): string {
  switch (theme) {
    case 'nightowl': return 'rgba(11, 41, 66, 0.8)'
    case 'terminal': return 'rgba(2, 6, 23, 0.8)'
    case 'cyberpunk': return 'rgba(76, 29, 149, 0.8)'
    default: return 'rgba(24, 24, 27, 0.8)'
  }
}

function getFadeRight(theme: string): string {
  switch (theme) {
    case 'nightowl': return 'rgba(11, 41, 66, 0.5)'
    case 'terminal': return 'rgba(2, 6, 23, 0.8)'
    case 'cyberpunk': return 'rgba(76, 29, 149, 0.8)'
    default: return 'rgba(24, 24, 27, 0.8)'
  }
}

export interface AnimatedCodeBlockProps {
  code: string
  language?: string
  theme?: 'dark' | 'terminal' | 'cyberpunk' | 'nightowl'
  typingSpeed?: number
  showLineNumbers?: boolean
  highlightLines?: number[]
  title?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  blurEffect?: boolean
  showControls?: boolean
  onCopy?: () => void
}

export default function AnimatedCodeBlock({
  code,
  language = 'javascript',
  theme = 'dark',
  typingSpeed = 50,
  showLineNumbers = true,
  highlightLines = [],
  title = 'Code Example',
  className,
  autoPlay = false,
  loop = false,
  blurEffect = false,
  showControls = true,
  onCopy,
}: AnimatedCodeBlockProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [copied, setCopied] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showTooltip, setShowTooltip] = useState('')
  const [extraLines, setExtraLines] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const codeContainerRef = useRef<HTMLDivElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const themeStyles = useMemo(() => getThemeStyles(theme), [theme])

  const [highlightedCode, setHighlightedCode] = useState('')
  useEffect(() => {
    try {
      const highlighted = Prism.highlight(
        code,
        Prism.languages[language] || Prism.languages.javascript,
        language,
      )
      setHighlightedCode(highlighted)
    } catch {
      setHighlightedCode(code)
    }
  }, [code, language])

  // Extra lines for fullscreen
  useEffect(() => {
    if (isFullscreen) {
      const updateExtraLines = () => {
        if (codeContainerRef.current && lineNumbersRef.current) {
          const containerHeight = codeContainerRef.current.clientHeight
          const lineHeight = 24
          const codeLines = code.split('\n').length
          const visibleLines = Math.floor(containerHeight / lineHeight)
          setExtraLines(Math.max(0, visibleLines - codeLines))
        }
      }
      updateExtraLines()
      window.addEventListener('resize', updateExtraLines)
      return () => window.removeEventListener('resize', updateExtraLines)
    } else {
      setExtraLines(0)
    }
  }, [isFullscreen, code])

  // Typing timer
  useEffect(() => {
    if (isPlaying && currentPosition < code.length) {
      timerRef.current = setTimeout(() => {
        setCurrentPosition((p) => p + 1)
      }, typingSpeed)
    } else if (isPlaying && currentPosition >= code.length) {
      if (loop) {
        setTimeout(() => setCurrentPosition(0), 1000)
      } else {
        setIsPlaying(false)
        setCompleted(true)
        setIsPaused(false)
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, currentPosition, code, typingSpeed, loop])

  // Fullscreen change
  useEffect(() => {
    const handleFSChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleFSChange)
    return () => document.removeEventListener('fullscreenchange', handleFSChange)
  }, [])

  const restartAnimation = useCallback(() => {
    setCurrentPosition(0)
    setIsPlaying(true)
    setCompleted(false)
    setIsPaused(false)
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPaused(true)
    } else if (completed) {
      restartAnimation()
    } else {
      setIsPaused(false)
    }
    setIsPlaying((p) => !p)
  }, [isPlaying, completed, restartAnimation])

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    onCopy?.()
  }, [code, onCopy])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(() => {})
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }, [])

  const downloadCode = useCallback(() => {
    const el = document.createElement('a')
    const file = new Blob([code], { type: 'text/plain' })
    el.href = URL.createObjectURL(file)
    el.download = `code.${language}`
    document.body.appendChild(el)
    el.click()
    document.body.removeChild(el)
  }, [code, language])

  const codeLines = useMemo(() => code.split('\n'), [code])

  const renderLines = useCallback(() => {
    let remaining = currentPosition
    const result: string[] = []
    for (let i = 0; i < codeLines.length; i++) {
      const line = codeLines[i]
      const lineLen = line.length + 1
      if (remaining <= 0) {
        result.push('')
      } else if (remaining >= lineLen) {
        result.push(line)
        remaining -= lineLen
      } else {
        result.push(line.substring(0, remaining))
        remaining = 0
      }
    }
    return result
  }, [currentPosition, codeLines])

  const displayedLines = useMemo(
    () => (completed ? code.split('\n') : renderLines()),
    [completed, code, renderLines],
  )

  const cursorLineIndex = useMemo(() => {
    if (!isPlaying && !isPaused) return -1
    let chars = 0
    for (let i = 0; i < codeLines.length; i++) {
      chars += codeLines[i].length + 1
      if (currentPosition < chars) return i
    }
    return codeLines.length - 1
  }, [isPlaying, isPaused, currentPosition, codeLines])

  const progressPercentage = useMemo(
    () => Math.min(100, (currentPosition / code.length) * 100),
    [currentPosition, code.length],
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'animated-code-block rounded-lg overflow-hidden flex flex-col w-full border transition-all duration-300',
        isFullscreen && 'fixed inset-0 z-50 rounded-none h-screen',
        className,
      )}
      style={{
        background: themeStyles.background,
        color: themeStyles.text,
        borderColor: themeStyles.border,
        boxShadow: themeStyles.shadow,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        fontSize: '14px',
        lineHeight: '24px',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: getScrollbarStyles(theme) + getPrismThemeStyles(theme) }} />

      {/* Toolbar */}
      <div
        className="flex items-center justify-between p-3 border-b"
        style={{
          background: themeStyles.header,
          borderColor: 'rgba(128,128,128,0.2)',
        }}
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="flex space-x-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <h3 className="text-sm font-medium truncate" style={{ color: themeStyles.text, opacity: 0.9 }}>
            {title}
          </h3>
        </div>
        {showControls && (
          <div className="flex items-center justify-end gap-2 flex-shrink-0">
            {completed ? (
              <button
                onClick={restartAnimation}
                onMouseEnter={() => setShowTooltip('restart')}
                onMouseLeave={() => setShowTooltip('')}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
                aria-label="Repeat animation"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1,4 1,10 7,10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
                {showTooltip === 'restart' && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-50">Restart</div>
                )}
              </button>
            ) : (
              <button
                onClick={togglePlay}
                onMouseEnter={() => setShowTooltip('play')}
                onMouseLeave={() => setShowTooltip('')}
                className={cn('p-1.5 rounded-full hover:bg-white/10 transition-colors relative')}
                style={isPlaying ? { background: themeStyles.accent } : {}}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
                )}
                {showTooltip === 'play' && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-50">{isPlaying ? 'Pause' : 'Play'}</div>
                )}
              </button>
            )}
            <button
              onClick={copyCode}
              onMouseEnter={() => setShowTooltip('copy')}
              onMouseLeave={() => setShowTooltip('')}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
              style={copied ? { background: themeStyles.accent } : {}}
              aria-label="Copy code"
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              )}
              {showTooltip === 'copy' && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-50">{copied ? 'Copied!' : 'Copy'}</div>
              )}
            </button>
            <button
              onClick={downloadCode}
              onMouseEnter={() => setShowTooltip('download')}
              onMouseLeave={() => setShowTooltip('')}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
              aria-label="Download code"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              {showTooltip === 'download' && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-50">Download</div>
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              onMouseEnter={() => setShowTooltip('fullscreen')}
              onMouseLeave={() => setShowTooltip('')}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4,14 10,14 10,20" /><polyline points="20,10 14,10 14,4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,3 21,3 21,9" /><polyline points="9,21 3,21 3,15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
              )}
              {showTooltip === 'fullscreen' && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-50">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</div>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Code Body */}
      <div className="relative overflow-hidden flex-grow flex flex-col">
        {blurEffect && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
            style={{ background: getBlurColor(theme) }}
          />
        )}

        {/* Progress bar */}
        <div className="h-0.5 w-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            className="h-full"
            style={{ background: themeStyles.accent }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>

        <div ref={codeContainerRef} className="relative flex-grow overflow-hidden">
          {/* Fade edges */}
          <div
            className="absolute top-0 right-0 bottom-0 w-12 pointer-events-none z-10 opacity-50"
            style={{ background: `linear-gradient(to left, ${getFadeRight(theme)} 10%, transparent 100%)` }}
          />
          <div
            className="absolute top-0 left-0 bottom-0 w-12 pointer-events-none z-10 opacity-50"
            style={{ background: `linear-gradient(to right, ${getFadeLeft(theme)} 10%, transparent 100%)` }}
          />

          <div className="overflow-auto code-scrollbar h-full">
            <div className="flex min-w-full h-full" style={{ boxSizing: 'border-box' }}>
              {showLineNumbers && (
                <div
                  ref={lineNumbersRef}
                  className="text-xs py-4 px-3 text-right select-none border-r sticky left-0 h-full flex flex-col z-10"
                  style={{
                    color: themeStyles.lineNumbers,
                    borderColor: 'rgba(128,128,128,0.2)',
                    background: themeStyles.background,
                    backgroundAttachment: 'local',
                  }}
                >
                  <div className="flex flex-col">
                    {codeLines.map((_, i) => (
                      <div key={i} className="h-6 flex items-center justify-end" style={{ fontFamily: 'inherit' }}>{i + 1}</div>
                    ))}
                    {Array.from({ length: extraLines }).map((_, i) => (
                      <div key={`extra-${i}`} className="h-6 flex items-center justify-end" style={{ fontFamily: 'inherit' }}>{codeLines.length + i + 1}</div>
                    ))}
                  </div>
                </div>
              )}
              <div className="relative py-4 flex-grow h-full z-1">
                {highlightLines.map((ln) => (
                  <div
                    key={`hl-${ln}`}
                    className="absolute left-0 right-0 h-6"
                    style={{ top: `${(ln - 1) * 24 + 16}px`, background: themeStyles.highlight }}
                  />
                ))}
                <div className="relative z-10 px-4 font-mono text-sm h-full" style={{ fontFamily: 'inherit' }}>
                  {completed ? (
                    <div className="whitespace-pre" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                  ) : (
                    codeLines.map((line, i) => (
                      <div key={i} className="h-6 whitespace-pre" style={{ fontFamily: 'inherit' }}>
                        {displayedLines[i] && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: Prism.highlight(
                                displayedLines[i],
                                Prism.languages[language] || Prism.languages.javascript,
                                language,
                              ),
                            }}
                          />
                        )}
                        {i === cursorLineIndex && (
                          <motion.span
                            className="inline-block w-2 h-5 -mb-0.5"
                            style={{ background: themeStyles.accentText }}
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                          />
                        )}
                      </div>
                    ))
                  )}
                  {Array.from({ length: extraLines }).map((_, i) => (
                    <div key={`ex-${i}`} className="h-6 whitespace-pre">&nbsp;</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="px-4 py-2 text-xs border-t flex justify-between items-center"
        style={{
          background: themeStyles.header,
          borderColor: 'rgba(128,128,128,0.2)',
          color: themeStyles.text,
        }}
      >
        <div className="flex items-center gap-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: isPlaying ? '#22c55e' : '#6b7280' }}
          />
          <span>{isPlaying ? 'Typing...' : completed ? 'Completed' : 'Paused'}</span>
        </div>
        <div style={{ fontFamily: 'system-ui, sans-serif' }}>{Math.round(progressPercentage)}% complete</div>
      </div>

      {/* Fullscreen exit button */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 z-50"
          >
            <button
              onClick={toggleFullscreen}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Exit fullscreen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4,14 10,14 10,20" /><polyline points="20,10 14,10 14,4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
