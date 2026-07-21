'use client'

import ShinyText from '../ShinyText'
import { PixelatedCanvas } from '../ui/pixelated-canvas'

import IconVcard from '../icons/IconVcard'
import IconCv from '../icons/IconCv'
import IconGithub from '../icons/IconGithub'
import IconWechatPublic from '../icons/IconWechatPublic'
import IconBlog from '../icons/IconBlog'
import IconBilibili from '../icons/IconBilibili'

const LINK_ROWS = [
  { label: 'vCard', href: '/vCard', Icon: IconVcard },
  { label: 'CV', href: '/cv', Icon: IconCv },
  { label: 'GitHub', href: 'https://github.com/beijiushare', Icon: IconGithub },
  { label: '公众号', href: '/WechatPublic', Icon: IconWechatPublic },
  { label: 'Blog', href: 'https://blog.beijiu.top/', Icon: IconBlog },
  { label: 'Bilibili', href: 'https://space.bilibili.com/3494379710842912', Icon: IconBilibili },
]


export default function MobileContent() {
  return (
    <div className="mobile-content">
      {/* ---- 标题 ---- */}
      <div className="mobile-header">
        <ShinyText
          text="BEIJIU.TOP"
          speed={3}
          color="rgba(200,200,200,0.85)"
          shineColor="#ffffff"
          spread={150}
          direction="left"
        />
      </div>

      {/* ---- 独角兽 ---- */}
      <div className="mobile-unicorn">
        <PixelatedCanvas
          src="/unicorn.webp"
          width={280}
          height={212}
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
        />
      </div>

      {/* ---- 链接卡片 ---- */}
      <div className="mobile-card-wrapper">
        <div className="mobile-link-card">
          {LINK_ROWS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-link-row"
              >
                <Icon />
                <span>{label}</span>
              </a>
            ))}
          </div>
      </div>

      {/* ---- The end. ---- */}
      <div className="mobile-end">
        <span>The end.</span>
      </div>

      {/* ---- 自适应垫片：大屏多出溢出，小屏不占空间 ---- */}
      <div className="mobile-spacer" />

      <style>{`
        .mobile-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 48px 20px 64px;
          gap: 32px;
          height: 100vh;
          overflow-y: auto;
          background: #0a0a14;
        }

        /* ---- 标题区 ---- */
        .mobile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }
        .mobile-header .shiny-text {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: 4px;
          font-family: 'ZSFT-342', 'Segoe UI', system-ui, sans-serif;
        }

        /* ---- 独角兽 ---- */
        .mobile-unicorn {
          width: 100%;
          max-width: 320px;
          display: flex;
          justify-content: center;
        }

        /* ---- 光效卡片 ---- */
        .mobile-card-wrapper {
          width: 60%;
          max-width: 228px;
        }
        .mobile-link-card {
          display: flex;
          flex-direction: column;
          padding: 4px 0;
        }
        .mobile-link-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 20px;
          color: rgba(255,255,255,0.75);
          font-size: 15px;
          font-weight: 500;
          font-family: 'Segoe UI', system-ui, sans-serif;
          text-decoration: none;
          transition: color 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .mobile-link-row:not(:last-child) {
          border-bottom: 1px solid rgba(255,255,255,0.15);
        }
        .mobile-link-row:active {
          color: #fff;
        }
        .mobile-link-row svg {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          color: rgba(255,255,255,0.5);
        }

        /* ---- The end. ---- */
        .mobile-end {
          padding: 20px 0 40px;
          color: rgba(255,255,255,0.25);
          font-size: 14px;
          letter-spacing: 2px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .mobile-spacer {
          flex-shrink: 0;
          height: max(0px, calc(100vh - 780px));
        }
      `}</style>
    </div>
  )
}
