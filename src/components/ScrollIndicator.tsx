'use client'

import './ScrollIndicator.css'

export default function ScrollIndicator({ className = '' }: { className?: string }) {
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
      <span className="scroll-indicator__text">向下滚动</span>
    </div>
  )
}
