'use client'

import { useLayoutEffect, useRef } from 'react'
import './DesktopContent.css'
import './MobileContent.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorGrid from '@/components/features/CursorGrid'
import ScrollIndicator from '@/components/features/ScrollIndicator'
import ShinyText from '@/components/ShinyText'
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas'
import SpotlightCard from '@/components/ui/SpotlightCard'
import IconVcard from '@/components/icons/IconVcard'
import IconCv from '@/components/icons/IconCv'
import IconGithub from '@/components/icons/IconGithub'
import IconWechatPublic from '@/components/icons/IconWechatPublic'
import IconBlog from '@/components/icons/IconBlog'
import IconBilibili from '@/components/icons/IconBilibili'
import { LINK_MAP_GROUPS } from '@/data/links'

gsap.registerPlugin(ScrollTrigger)

const LINK_ROWS = [
  { label: 'vCard', href: '/vCard', Icon: IconVcard },
  { label: 'CV', href: '/cv', Icon: IconCv },
  { label: 'GitHub', href: 'https://github.com/beijiushare', Icon: IconGithub },
  { label: '公众号', href: '/WechatPublic', Icon: IconWechatPublic },
  { label: 'Blog', href: 'https://blog.beijiu.top/', Icon: IconBlog },
  { label: 'Bilibili', href: 'https://space.bilibili.com/3745019517210321', Icon: IconBilibili },
]

export default function DesktopContent() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const context = gsap.context(() => {
      gsap.to(track, {
        x: '-100vw',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => context.revert()
  }, [])

  return (
    <main className="desktop-section bg-[#0a0a14]">
      <section ref={sectionRef} className="relative h-[200dvh]">
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          <div ref={trackRef} className="flex h-full w-[200vw]">
            <section className="relative h-full w-screen shrink-0 overflow-hidden">
              <div className="absolute inset-0 z-0">
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

              <div className="relative z-10 grid h-full grid-cols-[1fr_4fr_2fr_1fr]">
                <div aria-hidden="true" />
                <div className="relative flex min-w-0 items-center justify-center">
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <PixelatedCanvas
                      src="/unicorn.webp"
                      width={592}
                      height={448}
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

                  <div className="relative z-10 flex items-center justify-center">
                    <h1 className="hero-title">
                      <ShinyText
                        text="BEIJIU.TOP"
                        speed={3}
                        color="rgba(200,200,200,0.85)"
                        shineColor="#ffffff"
                        spread={150}
                        direction="left"
                      />
                    </h1>
                  </div>
                </div>

                <nav className="flex min-h-[100dvh] flex-col items-center justify-center" aria-label="主要链接">
                  <div className="mobile-card-wrapper">
                    <div className="mobile-link-card desktop-link-card">
                      {LINK_ROWS.map(({ label, href, Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="mobile-link-row"
                        >
                          <Icon />
                          <span>{label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
                <div aria-hidden="true" />
              </div>

              <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
                <ScrollIndicator />
              </div>
            </section>

            <section className="flex h-full w-screen shrink-0 items-center justify-end pr-[10vw]">
              <SpotlightCard className="link-map-card">
                <div className="link-map-grid" aria-label="链接地图">
                  {LINK_MAP_GROUPS.map((group) => (
                    <div key={group.id} aria-label={group.name}>
                      {group.links.map(({ display, href }) => (
                        <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                          {display}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
