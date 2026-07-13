'use client'

import { useEffect, useRef, useCallback } from 'react'
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

interface AcbCodeAreaProps {
  code: string
  codeLines: string[]
  language: string
  theme: string
  showLineNumbers: boolean
  highlightLines: number[]
  blurEffect: boolean
  isFullscreen: boolean
  completed: boolean
  displayedLines: string[]
  cursorLineIndex: number
  isActive: boolean
  progressPct: number
  highlightedCode: string
}

function highlightLine(line: string, language: string): string {
  if (!line) return ''
  try {
    const lang = Prism.languages[language] || Prism.languages.javascript
    return Prism.highlight(line, lang, language)
  } catch {
    return line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}

export default function AcbCodeArea(props: AcbCodeAreaProps) {
  const codeContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="acb-body">
        {props.blurEffect && <div className="acb-blur-overlay" />}

        <div className="acb-progress-track">
          <div className="acb-progress-bar" style={{ width: `${props.progressPct}%` }} />
        </div>

        <div ref={codeContainerRef} className="acb-code-container">
          <div className="acb-fade-left" />
          <div className="acb-fade-right" />

          <div className="acb-scroll code-scrollbar">
            <div className="acb-scroll-inner">
              {props.showLineNumbers && (
                <div className="acb-ln-col">
                  <div>
                    {props.codeLines.map((_, i) => (
                      <div key={i} className="acb-ln-item">{i + 1}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="acb-code-col">
                {props.highlightLines.map((ln) => (
                  <div
                    key={'hl-' + ln}
                    className="acb-hl-line"
                    style={{ top: `${(ln - 1) * 24 + 16}px` }}
                  />
                ))}

                <div className="acb-code-content">
                  {props.completed ? (
                    <div className="acb-full-code" dangerouslySetInnerHTML={{ __html: props.highlightedCode }} />
                  ) : (
                    props.codeLines.map((line, i) => (
                      <div key={i} className="acb-code-row">
                        {props.displayedLines[i] && (
                          <span dangerouslySetInnerHTML={{ __html: highlightLine(props.displayedLines[i], props.language) }} />
                        )}
                        {i === props.cursorLineIndex && props.isActive && (
                          <span className="acb-cursor" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .acb-body {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-height: 0;
        }
        .acb-blur-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.05;
          mix-blend-mode: overlay;
          z-index: 1;
          background: var(--acb-blur-color, var(--acb-accent));
        }
        .acb-progress-track {
          height: 2px;
          width: 100%;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        .acb-progress-bar {
          height: 100%;
          background: var(--acb-accent);
          transition: width 0.1s linear;
        }
        .acb-code-container {
          position: relative;
          flex: 1;
          overflow: hidden;
          min-height: 0;
        }
        .acb-fade-left, .acb-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 48px;
          pointer-events: none;
          z-index: 10;
          opacity: 0.5;
        }
        .acb-fade-left {
          left: 0;
          background: linear-gradient(to right, var(--acb-fade-left, rgba(24,24,27,0.8)) 10%, transparent);
        }
        .acb-fade-right {
          right: 0;
          background: linear-gradient(to left, var(--acb-fade-right, var(--acb-fade-left)) 10%, transparent);
        }
        .acb-scroll {
          height: 100%;
          overflow: auto;
        }
        .acb-scroll-inner {
          display: flex;
          min-width: 100%;
          height: 100%;
        }
        .acb-ln-col {
          padding: 16px 12px;
          text-align: right;
          user-select: none;
          border-right: 1px solid rgba(128,128,128,0.2);
          flex-shrink: 0;
          position: sticky;
          left: 0;
          z-index: 10;
          height: 100%;
          background: var(--acb-solid-bg, var(--acb-bg));
        }
        .acb-ln-item {
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 12px;
          color: var(--acb-line-num);
          font-family: inherit;
        }
        .acb-code-col {
          position: relative;
          flex: 1;
          padding: 16px 0;
        }
        .acb-hl-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 24px;
          background: var(--acb-hl-bg, rgba(255,255,255,0.05));
          pointer-events: none;
          z-index: 0;
        }
        .acb-code-content {
          position: relative;
          z-index: 1;
          padding: 0 16px;
          font-size: 14px;
          font-family: inherit;
          line-height: 24px;
        }
        .acb-code-row {
          height: 24px;
          white-space: pre;
          font-family: inherit;
        }
        .acb-full-code {
          white-space: pre;
          font-family: inherit;
        }
        .acb-cursor {
          display: inline-block;
          width: 8px;
          height: 20px;
          margin-bottom: -2px;
          background: var(--acb-accent-text);
          animation: cursor-blink 0.8s ease-in-out infinite;
          vertical-align: text-bottom;
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  )
}
