'use client'

import { useState } from 'react'

interface AcbToolbarProps {
  title: string
  showControls: boolean
  isPlaying: boolean
  completed: boolean
  copied: boolean
  isFullscreen: boolean
  onTogglePlay: () => void
  onRestart: () => void
  onCopy: () => void
  onDownload: () => void
  onToggleFullscreen: () => void
}

export default function AcbToolbar(props: AcbToolbarProps) {
  const [tip, setTip] = useState('')

  return (
    <>
      <div className="acb-toolbar">
        <div className="acb-toolbar-left">
          <div className="acb-dots">
            <span className="acb-dot acb-dot-red" />
            <span className="acb-dot acb-dot-yellow" />
            <span className="acb-dot acb-dot-green" />
          </div>
          <h3 className="acb-title">{props.title}</h3>
        </div>

        {props.showControls && (
          <div className="acb-controls">
            {props.completed ? (
              <button
                className="acb-btn"
                onClick={props.onRestart}
                onMouseEnter={() => setTip('restart')}
                onMouseLeave={() => setTip('')}
                aria-label="Repeat animation"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1,4 1,10 7,10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
                {tip === 'restart' && <div className="acb-tip">Restart</div>}
              </button>
            ) : (
              <button
                className={`acb-btn${props.isPlaying ? ' acb-btn-accent' : ''}`}
                onClick={props.onTogglePlay}
                onMouseEnter={() => setTip('play')}
                onMouseLeave={() => setTip('')}
                aria-label={props.isPlaying ? 'Pause' : 'Play'}
              >
                {props.isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
                )}
                {tip === 'play' && <div className="acb-tip">{props.isPlaying ? 'Pause' : 'Play'}</div>}
              </button>
            )}

            <button
              className={`acb-btn${props.copied ? ' acb-btn-accent' : ''}`}
              onClick={props.onCopy}
              onMouseEnter={() => setTip('copy')}
              onMouseLeave={() => setTip('')}
              aria-label="Copy code"
            >
              {props.copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              )}
              {tip === 'copy' && <div className="acb-tip">{props.copied ? 'Copied!' : 'Copy'}</div>}
            </button>

            <button
              className="acb-btn"
              onClick={props.onDownload}
              onMouseEnter={() => setTip('download')}
              onMouseLeave={() => setTip('')}
              aria-label="Download code"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              {tip === 'download' && <div className="acb-tip">Download</div>}
            </button>

            <button
              className="acb-btn"
              onClick={props.onToggleFullscreen}
              onMouseEnter={() => setTip('fullscreen')}
              onMouseLeave={() => setTip('')}
              aria-label={props.isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {props.isFullscreen ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4,14 10,14 10,20" /><polyline points="20,10 14,10 14,4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,3 21,3 21,9" /><polyline points="9,21 3,21 3,15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
              )}
              {tip === 'fullscreen' && <div className="acb-tip">{props.isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</div>}
            </button>
          </div>
        )}
      </div>
      <style>{`
        .acb-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: var(--acb-header-bg);
          border-bottom: 1px solid rgba(128,128,128,0.2);
          user-select: none;
        }
        .acb-toolbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
          flex: 1;
        }
        .acb-dots { display: flex; gap: 6px; flex-shrink: 0; }
        .acb-dot { width: 12px; height: 12px; border-radius: 50%; }
        .acb-dot-red { background: #ff5f57; }
        .acb-dot-yellow { background: #ffbd2e; }
        .acb-dot-green { background: #28c840; }
        .acb-title {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: var(--acb-text);
          opacity: 0.9;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: inherit;
        }
        .acb-controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .acb-btn {
          position: relative;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--acb-text);
          opacity: 0.6;
          cursor: pointer;
          border-radius: 50%;
          transition: opacity 0.15s, background 0.15s;
          padding: 0;
        }
        .acb-btn:hover { opacity: 1; background: rgba(255,255,255,0.1); }
        .acb-btn-accent { opacity: 1; background: var(--acb-accent); }
        .acb-btn-accent:hover { opacity: 0.9; background: var(--acb-accent); }
        .acb-tip {
          position: absolute;
          bottom: -32px;
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 8px;
          background: black;
          color: white;
          font-size: 12px;
          border-radius: 4px;
          white-space: nowrap;
          z-index: 100;
          font-family: system-ui, sans-serif;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}
