'use client'

interface AcbStatusBarProps {
  isPlaying: boolean
  statusLabel: string
  progressPct: number
}

export default function AcbStatusBar({ isPlaying, statusLabel, progressPct }: AcbStatusBarProps) {
  return (
    <>
      <div className="acb-status-bar">
        <div className="acb-status-left">
          <span className={`acb-status-dot ${isPlaying ? 'dot-green' : 'dot-gray'}`} />
          <span>{statusLabel}</span>
        </div>
        <span>{Math.round(progressPct)}% complete</span>
      </div>
      <style>{`
        .acb-status-bar {
          padding: 8px 16px;
          font-size: 12px;
          border-top: 1px solid rgba(128,128,128,0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--acb-header-bg);
          color: var(--acb-text);
          font-family: system-ui, sans-serif;
        }
        .acb-status-left { display: flex; align-items: center; gap: 6px; }
        .acb-status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .dot-green { background: #22c55e; }
        .dot-gray { background: #6b7280; }
      `}</style>
    </>
  )
}
