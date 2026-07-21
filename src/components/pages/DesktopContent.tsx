'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInertialScroll } from '@/hooks/useInertialScroll'
import CursorGrid from '@/components/features/CursorGrid'
import ShinyText from '@/components/ShinyText'
import ScrollIndicator from '@/components/features/ScrollIndicator'
import { AnimatedCodeBlock } from '@/components/ui/animated-code-block'
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas'
import PathAnimation from '@/components/features/PathAnimation'

gsap.registerPlugin(ScrollTrigger)

const bresenhamCode = `void line(int x0, int y0, int x1, int y1) {
    int dx = abs(x1-x0), dy = -abs(y1-y0);
    int sx = x0<x1 ? 1 : -1, sy = y0<y1 ? 1 : -1;
    int err = dx + dy;
    while (1) {
        plot(x0, y0);
        if (x0 == x1 && y0 == y1) break;
        int e2 = 2 * err;
        if (e2 >= dy) { err += dy; x0 += sx; }
        if (e2 <= dx) { err += dx; y0 += sy; }
    }
}`

export default function DesktopContent() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const codeWrapRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const unicornRef = useRef<HTMLDivElement>(null)
  const [showCode, setShowCode] = useState(false)
  const [scrollComplete, setScrollComplete] = useState(false)

  // ─── 物理惯性滚动引擎 ───
  useInertialScroll()

  // ─── 控制台滚动进度日志 ───
  const logScrollRef = useRef<() => void>(() => {})

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const vh = (n: number) => (n / 100) * window.innerHeight
    logScrollRef.current = () => {
      const scrollY = window.scrollY
      const sectionTop = section.offsetTop
      const sectionH = section.offsetHeight
      const p = ((scrollY - sectionTop) / (sectionH - window.innerHeight)).toFixed(3)
      console.log(`📜 scroll=${Math.round(scrollY)}px  p=${p}  vh≈${((scrollY - sectionTop) / (window.innerHeight / 100)).toFixed(0)}`)
    }
    const onScroll = () => logScrollRef.current()
    window.addEventListener('scroll', onScroll)

    // ─── 初始状态 ───
    gsap.set(titleRef.current, { top: '50%', left: '50%', xPercent: -50, yPercent: -50, scale: 1, transformOrigin: 'top left' })
    gsap.set(indicatorRef.current, { xPercent: -50 })
    gsap.set(codeWrapRef.current, { y: '100vh', opacity: 0 })

    const sts: ScrollTrigger[] = []

    // ─── 标题：缩小到左上角 0→180vh ───
    const titleAnim = gsap.to(titleRef.current, {
      top: 20, left: 16, xPercent: 0, yPercent: 0, scale: 0.28,
      transformOrigin: 'top left', ease: 'none', paused: true,
    })
    sts.push(ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop,
      end: () => section.offsetTop + vh(180),
      scrub: 0.6,
      animation: titleAnim,
    }))

    // ─── 独角兽：缩放 0→260vh ───
    const unicornScale = gsap.to(unicornRef.current, {
      scale: 0.7, ease: 'none', paused: true,
    })
    sts.push(ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop,
      end: () => section.offsetTop + vh(260),
      scrub: 0.6,
      animation: unicornScale,
    }))

    // ─── 独角兽：左移淡出 260→440vh ───
    const unicornLeft = gsap.to(unicornRef.current, {
      x: '-70vw', opacity: 0.3, ease: 'none', paused: true,
    })
    sts.push(ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop + vh(260),
      end: () => section.offsetTop + vh(440),
      scrub: 0.6,
      animation: unicornLeft,
    }))

    // ─── 轨道平移（全程）0→1100vh ───
    const trackAnim = gsap.to(trackRef.current, {
      x: '-200vw', ease: 'none', paused: true,
    })
    sts.push(ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop,
      end: () => section.offsetTop + vh(1000),
      scrub: 0.6,
      animation: trackAnim,
    }))

    // ─── 代码块升起 660→840vh ───
    const codeAnim = gsap.to(codeWrapRef.current, {
      y: 0, opacity: 1, ease: 'none', paused: true,
    })
    sts.push(ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop + vh(660),
      end: () => section.offsetTop + vh(840),
      scrub: 0.6,
      animation: codeAnim,
    }))

    // ─── 代码块懒挂载 ───
    ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop + vh(660),
      onEnter: () => setShowCode(true),
      once: true,
    })

    // ─── 滚动到头时文字切换 ───
    ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop + vh(840),
      onEnter: () => setScrollComplete(true),
      onLeaveBack: () => setScrollComplete(false),
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      sts.forEach(st => {
        st.animation?.kill()
        st.kill()
      })
    }
  }, [])

  return (
    <>
      <section ref={sectionRef} className="desktop-section relative h-[1000vh] bg-[#0a0a14]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a14]">
          <div className="relative w-full h-full">

            {/* ---- 第 0 层：CursorGrid 交互网格 ---- */}
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <CursorGrid
              cellSize={70}
              color="#D946EF"
              radius={140}
              falloff="smooth"
              holdTime={400}
              fadeDuration={800}
              lineWidth={1.2}
              maxOpacity={1}
              fillOpacity={0}
              gridOpacity={0}
              cellRadius={0}
              clickPulse
              pulseSpeed={600}
            />
          </div>

          {/* ---- 第 1 层：独角兽 ---- */}
          <div
            ref={unicornRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <PixelatedCanvas
              src="/unicorn.webp"
              width={740}
              height={560}
              cellSize={5}
              dotScale={0.8}
              shape="circle"
              backgroundColor=""
              dropoutStrength={0.4}
              interactive
              distortionStrength={14}
              distortionRadius={80}
              distortionMode="swirl"
              followSpeed={0.2}
              jitterStrength={4}
              jitterSpeed={4}
              sampleAverage
              tintColor="#D946EF"
              tintStrength={0.12}
              objectFit="contain"
              className="pointer-events-auto"
            />
          </div>

          {/* ---- 第 2 层：纸飞机路径动画 + 链接卡片 ---- */}
          <PathAnimation sectionRef={sectionRef} />

          {/* ---- 第 3 层：水平轨道（仅装饰性背景平移） ---- */}
          <div
            ref={trackRef}
            className="absolute inset-0 flex pointer-events-none"
            style={{ zIndex: 10, width: '300vw' }}
          >
            <div className="w-screen h-full" />
            <div className="w-screen h-full" />
            <div className="w-screen h-full" />
          </div>

          {/* ---- 第 3.5 层：代码块（独立于轨道，居中升起） ---- */}
          <div
            ref={codeWrapRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
            style={{ zIndex: 15 }}
          >
            <div
              className="w-full max-w-[580px] px-8"
              style={{ pointerEvents: showCode ? 'auto' : 'none' }}
            >
              {showCode && (
                <AnimatedCodeBlock
                  code={bresenhamCode}
                  theme="dark"
                  title="bresenham.c"
                  typingSpeed={40}
                  showLineNumbers
                  autoPlay
                  loop
                  language="c"
                  highlightLines={[2, 4, 9, 10]}
                  className="code-block-scroll"
                />
              )}
            </div>
          </div>

          {/* ---- 第 4 层：标题 ---- */}
          <div
            ref={titleRef}
            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <h1 className="hero-title">
              <ShinyText
                text="✨BEIJIU.TOP"
                speed={3}
                color="rgba(200,200,200,0.85)"
                shineColor="#ffffff"
                spread={150}
                direction="left"
              />
            </h1>
          </div>

          {/* ---- 向下滚动指示器 ---- */}
          <div
            ref={indicatorRef}
            className="absolute z-30 bottom-8 left-1/2"
          >
            <ScrollIndicator isComplete={scrollComplete} />
          </div>

          </div>

        </div>
      </section>

      <style>{`
        .hero-title {
          margin: 0;
          font-size: clamp(80px, 12vw, 160px);
          font-weight: 800;
          letter-spacing: 4px;
          font-family: 'ZSFT-342', 'Segoe UI', system-ui, -apple-system, sans-serif;
          user-select: none;
          line-height: 1;
          white-space: nowrap;
        }
        .code-block-scroll { width: 100%; }
      `}</style>
    </>
  )
}
