'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
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

import { useAcbTyping } from './useAcbTyping'
import { getAcbTheme } from './acbThemes'
import { getAcbScrollbarCSS, getAcbPrismCSS } from './acbPrismStyles'
import AcbToolbar from './AcbToolbar'
import AcbCodeArea from './AcbCodeArea'
import AcbStatusBar from './AcbStatusBar'

interface AnimatedCodeBlockProps {
  code: string
  language?: string
  theme?: string
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
  className = '',
  autoPlay = false,
  loop = false,
  blurEffect = false,
  showControls = true,
  onCopy,
}: AnimatedCodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const typing = useAcbTyping(code, typingSpeed, autoPlay, loop)

  const themeCfg = useMemo(() => getAcbTheme(theme), [theme])

  // Highlight full code
  const highlightedCode = useMemo(() => {
    try {
      const lang = Prism.languages[language] || Prism.languages.javascript
      return Prism.highlight(code, lang, language)
    } catch {
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    }
  }, [code, language])

  // Fullscreen tracking
  useEffect(() => {
    function onFSChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFSChange)
    return () => document.removeEventListener('fullscreenchange', onFSChange)
  }, [])

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      onCopy?.()
    }).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = code
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      onCopy?.()
    })
  }, [code, onCopy])

  const downloadCode = useCallback(() => {
    const a = document.createElement('a')
    const file = new Blob([code], { type: 'text/plain' })
    a.href = URL.createObjectURL(file)
    a.download = `code.${language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [code, language])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(() => {})
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }, [])

  const scrollbarCSS = getAcbScrollbarCSS(theme, themeCfg.scrollbarThumb)
  const prismCSS = getAcbPrismCSS(theme)

  return (
    <>
      <div
        ref={containerRef}
        className={`${theme} acb${isFullscreen ? ' acb-fullscreen' : ''}${className ? ' ' + className : ''}`}
      >
        <AcbToolbar
          title={title}
          showControls={showControls}
          isPlaying={typing.isPlaying}
          completed={typing.completed}
          copied={copied}
          isFullscreen={isFullscreen}
          onTogglePlay={typing.togglePlay}
          onRestart={typing.restartAnimation}
          onCopy={copyCode}
          onDownload={downloadCode}
          onToggleFullscreen={toggleFullscreen}
        />

        <AcbCodeArea
          code={code}
          codeLines={typing.codeLines}
          language={language}
          theme={theme}
          showLineNumbers={showLineNumbers}
          highlightLines={highlightLines}
          blurEffect={blurEffect}
          isFullscreen={isFullscreen}
          completed={typing.completed}
          displayedLines={typing.displayedLines}
          cursorLineIndex={typing.cursorLineIndex}
          isActive={typing.isActive}
          progressPct={typing.progressPct}
          highlightedCode={highlightedCode}
        />

        <AcbStatusBar
          isPlaying={typing.isPlaying}
          statusLabel={typing.statusLabel}
          progressPct={typing.progressPct}
        />

        {/* Fullscreen exit button */}
        {isFullscreen && (
          <div className="acb-fs-exit">
            <button className="acb-fs-btn" onClick={toggleFullscreen} aria-label="Exit fullscreen">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4,14 10,14 10,20" /><polyline points="20,10 14,10 14,4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .acb {
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          width: 100%;
          border: 1px solid var(--acb-border);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          font-size: 14px;
          line-height: 24px;
          background: var(--acb-bg);
          color: var(--acb-text);
          box-shadow: var(--acb-shadow);
          transition: all 0.3s;
        }

        .acb, .acb * { box-sizing: border-box; }

        /* Theme variables */
        .dark {
          --acb-bg: #18181b; --acb-solid-bg: #18181b; --acb-text: #f4f4f5;
          --acb-line-num: #71717a; --acb-hl-bg: #27272a; --acb-border: #27272a;
          --acb-header-bg: #27272a; --acb-accent: #4f46e5; --acb-accent-text: #818cf8;
          --acb-shadow: 0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -4px rgba(0,0,0,0.1);
          --acb-fade-left: rgba(24,24,27,0.8); --acb-fade-right: rgba(24,24,27,0.8);
          --acb-blur-color: #60a5fa;
        }

        .terminal {
          --acb-bg: #0d1117; --acb-solid-bg: #0d1117; --acb-text: #00ff88;
          --acb-line-num: #009966; --acb-hl-bg: rgba(0,59,47,0.6); --acb-border: #1f2a30;
          --acb-header-bg: #161b22; --acb-accent: #00c46f; --acb-accent-text: #00ff88;
          --acb-shadow: 0 4px 6px -1px rgba(0,255,136,0.2), 0 2px 4px -2px rgba(0,255,136,0.1);
          --acb-fade-left: rgba(2,6,23,0.8); --acb-fade-right: rgba(2,6,23,0.8);
          --acb-blur-color: #34d399;
        }

        .cyberpunk {
          --acb-bg: linear-gradient(135deg, #0f0c29, #302b63, #24243e); --acb-solid-bg: #1a153a;
          --acb-text: #e0e0f0; --acb-line-num: #8f7ada; --acb-hl-bg: rgba(62,45,103,0.6);
          --acb-border: #5a4b8d; --acb-header-bg: linear-gradient(90deg, #2e1a47, #443266);
          --acb-accent: #ff00a0; --acb-accent-text: #ff00a0;
          --acb-shadow: 0 10px 15px -3px rgba(255,0,160,0.2), 0 4px 6px -4px rgba(255,0,160,0.1);
          --acb-fade-left: rgba(76,29,149,0.8); --acb-fade-right: rgba(76,29,149,0.8);
          --acb-blur-color: #d946ef;
        }

        .nightowl {
          --acb-bg: #011627; --acb-solid-bg: #011627; --acb-text: #d6deeb;
          --acb-line-num: #5f7e97; --acb-hl-bg: #1d3b53; --acb-border: #1e2d3d;
          --acb-header-bg: #0b2942; --acb-accent: #82aaff; --acb-accent-text: #82aaff;
          --acb-shadow: 0 4px 6px -1px rgba(130,170,255,0.2), 0 2px 4px -2px rgba(130,170,255,0.1);
          --acb-fade-left: rgba(11,41,66,0.8); --acb-fade-right: rgba(11,41,66,0.5);
          --acb-blur-color: #60a5fa;
        }

        .acb-fullscreen {
          position: fixed !important; inset: 0 !important; z-index: 50 !important;
          border-radius: 0 !important; height: 100vh !important;
        }

        .acb-fs-exit {
          position: fixed; top: 16px; right: 16px; z-index: 60;
        }

        .acb-fs-btn {
          background: rgba(0,0,0,0.5); border: none; color: white; width: 36px; height: 36px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          cursor: pointer; backdrop-filter: blur(4px); transition: background 0.2s;
        }

        .acb-fs-btn:hover { background: rgba(0,0,0,0.7); }

        .acb-fade-enter-active { animation: acb-fade-in 0.2s ease-out; }
        .acb-fade-leave-active { animation: acb-fade-in 0.2s ease-in reverse; }

        @keyframes acb-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        :deep(.token) { font-family: inherit; }
        :deep(.token.operator) { background: transparent; }
        :deep(.token.bold) { font-weight: bold; }
        :deep(.token.italic) { font-style: italic; }

        ${scrollbarCSS}
        ${prismCSS}
      `}</style>
    </>
  )
}
