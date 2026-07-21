'use client'

import './MobileContent.css'
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
    </div>
  )
}
