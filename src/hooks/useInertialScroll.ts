'use client'

import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * 物理惯性滚动引擎
 *
 * 替换浏览器原生触控板/鼠标滚轮滚动为惯性物理模型：
 * - 速度累积（加速度 × 摩擦系数）
 * - 摩擦衰减（每帧 × 0.94）
 * - 边界限幅（0 ~ maxScroll）
 * - 每帧调用 ScrollTrigger.update() 保持 GSAP 同步
 */
export function useInertialScroll() {
  useEffect(() => {
    const physics = {
      velocity: 0,
      position: window.scrollY,
      maxVelocity: 60,
      acceleration: 0.2,
      friction: 0.94,
      threshold: 0.5,
    }
    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const onPhysicsWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY
      physics.velocity = Math.min(
        physics.maxVelocity,
        Math.max(-physics.maxVelocity, physics.velocity + delta * physics.acceleration),
      )
    }
    document.addEventListener('wheel', onPhysicsWheel, { passive: false })

    let rafId: number
    const tick = () => {
      physics.velocity *= physics.friction
      if (Math.abs(physics.velocity) < physics.threshold) {
        physics.velocity = 0
      }
      if (physics.velocity !== 0) {
        physics.position += physics.velocity
        if (physics.position <= 0 || physics.position >= maxScroll()) {
          physics.position = Math.max(0, Math.min(maxScroll(), physics.position))
          physics.velocity = 0
        }
        window.scrollTo(0, Math.round(physics.position))
        ScrollTrigger.update()
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('wheel', onPhysicsWheel)
    }
  }, [])
}
