'use client'

import { useRef, useCallback, useEffect } from 'react'
import './BorderGlow.css'

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 40, s: 80, l: 80 }
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) }
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  const vars: Record<string, string> = {}
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`
  }
  return vars
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven']
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors: string[]) {
  const vars: Record<string, string> = {}
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)]
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return vars
}

interface BorderGlowProps {
  children: React.ReactNode
  className?: string
  edgeSensitivity?: number
  glowColor?: string
  backgroundColor?: string
  borderRadius?: number
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  colors?: string[]
  fillOpacity?: number
}

export default function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const getCenterOfElement = useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect()
    return [width / 2, height / 2] as const
  }, [])

  const getEdgeProximity = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el)
    const dx = x - cx
    const dy = y - cy
    let kx = dx !== 0 ? cx / Math.abs(dx) : Infinity
    let ky = dy !== 0 ? cy / Math.abs(dy) : Infinity
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
  }, [getCenterOfElement])

  const getCursorAngle = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el)
    const dx = x - cx
    const dy = y - cy
    if (dx === 0 && dy === 0) return 0
    const radians = Math.atan2(dy, dx)
    let degrees = radians * (180 / Math.PI) + 90
    if (degrees < 0) degrees += 360
    return degrees
  }, [getCenterOfElement])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const edge = getEdgeProximity(card, x, y)
    const angle = getCursorAngle(card, x, y)

    card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`)
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
  }, [getEdgeProximity, getCursorAngle])

  // 鼠标离开时保持光效（不归零）
  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    // 保持 60% 的默认光效
    card.style.setProperty('--edge-proximity', '60')
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    // 初始默认光效
    card.style.setProperty('--edge-proximity', '60')
    card.style.setProperty('--cursor-angle', '45deg')
  }, [])

  const glowVars = buildGlowVars(glowColor, glowIntensity)

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...glowVars,
        ...buildGradientVars(colors),
      } as React.CSSProperties}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  )
}
