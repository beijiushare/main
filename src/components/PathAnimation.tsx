'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, FileText, QrCode, ExternalLink, Play, User } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// 纸飞机飞行路径（蜿蜒的 S 形，从左到右）
const FLIGHT_PATH =
  'M 30 340 C 120 160, 180 500, 290 340 C 370 240, 410 440, 510 320 C 570 260, 610 370, 730 280'

const LINK_ITEMS = [
  { label: 'vCard', href: '/vCard', icon: User },
  { label: 'CV', href: '/cv', icon: FileText },
  { label: 'GitHub', href: 'https://github.com/beijiushare', icon: Github },
  { label: '公众号', href: '/WechatPublic', icon: QrCode },
  { label: 'Blog', href: 'https://blog.beijiu.top/', icon: ExternalLink },
  { label: 'Bilibili', href: 'https://space.bilibili.com/3494379710842912', icon: Play },
]

export default function PathAnimation({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const planeRef = useRef<SVGGElement>(null)
  const linksCardRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const trail = trailRef.current
    const pathEl = pathRef.current
    const plane = planeRef.current
    const card = linksCardRef.current
    if (!section || !trail || !pathEl || !plane || !card) return

    const pathLength = pathEl.getTotalLength()

    // 初始：隐藏拖尾和卡片
    trail.style.strokeDasharray = String(pathLength)
    trail.style.strokeDashoffset = String(pathLength)

    const ctx = gsap.context(() => {
      // ─── 纸飞机沿路径飞行（由滚动驱动，scrub: 1.5 产生后延性） ───
      gsap.to({ p: 0 }, {
        p: 1,
        scrollTrigger: {
          trigger: section,
          start: '+=160vh',
          end: '+=300vh',
          scrub: 1.5,
        },
        onUpdate: function () {
          const p = this.targets()[0].p as number
          const gap = 0.05 // 线条比箭头短 5% 的路径长度

          // 拖尾线条：画到 (p - gap) 位置
          const trailEnd = Math.max(0, p - gap)
          trail.style.strokeDashoffset = pathLength * (1 - trailEnd)

          // 纸飞机位置
          const safeP = Math.min(1, Math.max(0, p))
          const point = pathEl.getPointAtLength(pathLength * safeP)
          const nextP = Math.min(1, safeP + 0.003)
          const next = pathEl.getPointAtLength(pathLength * nextP)
          const angle = Math.atan2(next.y - point.y, next.x - point.x) * (180 / Math.PI)

          plane.setAttribute(
            'transform',
            `translate(${point.x}, ${point.y}) rotate(${angle})`,
          )
        },
      })

      // ─── 链接卡片渐显（路径快结束时） ───
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: '+=270vh',
            end: '+=300vh',
            scrub: 1,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [sectionRef])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    >
      {/* SVG 层：飞行路径 + 拖尾 + 纸飞机 */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 拖尾线条（白色半透明） */}
        <path
          ref={trailRef}
          d={FLIGHT_PATH}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 参考路径（不可见，用于 getPointAtLength） */}
        <path ref={pathRef} d={FLIGHT_PATH} fill="none" opacity="0" />

        {/* 纸飞机 */}
        <g ref={planeRef}>
          <g transform="scale(0.035) translate(-512, -512)">
            <path
              d="M974.966667 91.46a21.333333 21.333333 0 0 0-21.713334-5.033333l-896 298.666666a21.333333 21.333333 0 0 0-4.226666 38.533334L256 545.413333V832a21.333333 21.333333 0 0 0 36.42 15.086667L448 691.506667l240.913333 240.913333a21.333333 21.333333 0 0 0 35.426667-8.666667l256-810.666666a21.333333 21.333333 0 0 0-5.373333-21.626667zM796.666667 183.606667L277.106667 508.32 114.746667 410.906667zM298.666667 545.16l537.82-336.14-403.873334 437.533333L298.666667 780.5z m395.573333 332.24l-216.666667-216.666667 433.333334-469.426667z"
              fill="#ffffff"
            />
          </g>
        </g>
      </svg>

      {/* HTML 层：链接卡片 */}
      <div
        ref={linksCardRef}
        className="absolute right-[6%] top-1/2 -translate-y-1/2 pointer-events-auto opacity-0"
        style={{ zIndex: 6 }}
      >
        <div className="bg-[#0a0a14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-3 gap-3">
            {LINK_ITEMS.map((link) => {
              const Icon = link.icon
              const isExternal = link.href.startsWith('http')
              const Comp = isExternal ? 'a' : 'a'
              const extraProps = isExternal
                ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
                : {}
              return (
                <a
                  key={link.label}
                  href={link.href}
                  {...extraProps}
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Icon
                    size={22}
                    className="text-white/60 group-hover:text-white transition-colors"
                  />
                  <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
