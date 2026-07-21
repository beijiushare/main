'use client'

import './ScrollIndicator.css'

export default function ScrollIndicator({ className = '', isComplete = false }: { className?: string; isComplete?: boolean }) {
  // 交错淡入淡出：离开的文字立即淡出（0.3s），进入的文字延迟 0.35s 后淡入
  const scrollFade = isComplete ? 'opacity 0.3s ease-in-out' : 'opacity 0.3s ease-in-out 0.35s'
  const doneFade = isComplete ? 'opacity 0.3s ease-in-out 0.35s' : 'opacity 0.3s ease-in-out'

  return (
    <div className={`scroll-indicator ${className}`}>
      <svg
        viewBox="0 0 1024 1024"
        width="24"
        height="24"
        fill="currentColor"
      >
        <path d="M511.29 793.97L156.26 480.04l-56.52 63.92 411.44 363.81L924.2 544.02l-56.4-64.04z" />
        <path d="M924.2 206.95l-56.4-64.04L511.29 456.9 156.26 142.97 99.74 206.9l411.44 363.81z" />
      </svg>
      <span style={{ position: 'relative', display: 'inline-block', width: '4.5em', height: '1.2em', textAlign: 'center' }}>
        <span
          className="scroll-indicator__text"
          style={{
            position: 'absolute', left: 0, right: 0, whiteSpace: 'nowrap',
            opacity: isComplete ? 0 : 1, transition: scrollFade,
          }}
        >向下滚动</span>
        <span
          className="scroll-indicator__text"
          style={{
            position: 'absolute', left: 0, right: 0, whiteSpace: 'nowrap',
            opacity: isComplete ? 1 : 0, transition: doneFade,
          }}
        >完毕</span>
      </span>
    </div>
  )
}
