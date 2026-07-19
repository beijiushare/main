'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorGrid from '@/components/CursorGrid'
import ShinyText from '@/components/ShinyText'
import MobileLinks from '@/components/MobileLinks'
import ScrollIndicator from '@/components/ScrollIndicator'
import { AnimatedCodeBlock } from '@/components/ui/animated-code-block'
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas'
import PathAnimation from '@/components/PathAnimation'

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

export default function HomePage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const codeWrapRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const unicornRef = useRef<HTMLDivElement>(null)
  const [showCode, setShowCode] = useState(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // 初始化 GSAP 内控状态
      gsap.set(titleRef.current, { xPercent: -50, yPercent: -50, scale: 1, transformOrigin: 'top left' })
      gsap.set(indicatorRef.current, { xPercent: -50 })
      gsap.set(codeWrapRef.current, { y: '100vh', opacity: 0 })

      // ─── 标题：居中 → 左上角 (0 → 80vh) ───
      gsap.to(titleRef.current, {
        top: 20,
        left: 16,
        xPercent: 0,
        yPercent: 0,
        scale: 0.28,
        transformOrigin: 'top left',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=80vh',
          scrub: 0.5,
        },
      })

      // ─── 独角兽：缩小 (0 → 120vh) ───
      gsap.to(unicornRef.current, {
        scale: 0.7,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120vh',
          scrub: 0.5,
        },
      })

      // ─── 独角兽：左移淡出 (80 → 450vh) 慢速 ───
      gsap.to(unicornRef.current, {
        x: '-70vw',
        opacity: 0.3,
        scrollTrigger: {
          trigger: section,
          start: '+=80vh',
          end: '+=450vh',
          scrub: 0.5,
        },
      })

      // ─── 水平轨道：向左平移 200vw (0 → 450vh) ───
      gsap.to(trackRef.current, {
        x: '-200vw',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=450vh',
          scrub: 0.5,
        },
      })

      // ─── 代码块：从下方升起 (380 → 430vh) ───
      gsap.to(codeWrapRef.current, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: '+=380vh',
          end: '+=430vh',
          scrub: 0.5,
        },
      })

      // ─── 懒挂载 AnimatedCodeBlock ───
      ScrollTrigger.create({
        trigger: section,
        start: '+=370vh',
        onEnter: () => setShowCode(true),
        once: true,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ========== 桌面端 ========== */}
      {/*
        h-[400vh] 提供 4 屏滚动空间
        子元素 position:sticky 让内容始终钉在视口内
        GSAP 跟踪 section 的滚动位置驱动动画（不用 GSAP pin）
      */}
      <section ref={sectionRef} className="desktop-section relative h-[500vh] bg-[#0a0a14]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a14]">

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
              distortionStrength={7}
              distortionRadius={80}
              distortionMode="swirl"
              followSpeed={0.2}
              jitterStrength={4}
              jitterSpeed={4}
              sampleAverage
              tintColor="#D946EF"
              tintStrength={0.12}
              objectFit="contain"
            />
          </div>

          {/* ---- 第 2 层：纸飞机路径动画 + 链接卡片 ---- */}
          <PathAnimation sectionRef={sectionRef} />

          {/* ---- 第 3 层：水平轨道 ---- */}
          <div
            ref={trackRef}
            className="absolute inset-0 flex pointer-events-none"
            style={{ zIndex: 10, width: '300vw' }}
          >
            <div className="w-screen h-full" />
            <div className="w-screen h-full relative overflow-hidden">
              <div
                ref={codeWrapRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-auto opacity-0"
              >
                <div className="w-full max-w-[580px] px-8">
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
            </div>
            <div className="w-screen h-full" />
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
            <ScrollIndicator />
          </div>

        </div>
      </section>

      {/* ========== 移动端 ========== */}
      <div className="mobile-page">
        <div className="mobile-hint">请转至桌面端获取更佳体验</div>
        <div className="mobile-overlay">
          <h1 className="mobile-title">Beijiu</h1>
          <MobileLinks />
        </div>
      </div>

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
        .mobile-page { display: none; }
        .mobile-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }
        .mobile-title {
          font-size: 80px;
          font-weight: 1000;
          font-family: serif;
          color: #2D3A4A;
          text-shadow: 0 1px 3px rgba(255,255,255,0.6);
          margin: 0;
          letter-spacing: 8px;
          user-select: none;
        }
        .mobile-hint {
          position: fixed;
          top: 0; left: 0; right: 0;
          background: #333333c5;
          color: #fff;
          text-align: center;
          padding: 12px;
          font-size: 14px;
          z-index: 100;
        }
        @media (max-width: 768px) {
          .desktop-section { display: none; }
          .mobile-page {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            background: #0a0a14;
          }
          .mobile-title { font-size: 40px; }
        }
      `}</style>
    </>
  )
}
