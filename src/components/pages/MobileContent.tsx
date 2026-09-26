'use client'

import './MobileContent.css'
import ShinyText from '@/components/ShinyText'
import UnicornCanvas from '@/components/features/UnicornCanvas'
import LinkRowList from '@/components/features/LinkRowList'
import { NAV_LINKS } from '@/data/navLinks'
import { MOBILE_LINK_MAP_LINKS } from '@/data/links'
import { SHINY_TEXT_PROPS } from '@/data/site'

export default function MobileContent() {
  return (
    <div className="mobile-content">
      {/* ---- 标题 ---- */}
      <div className="mobile-header">
        <ShinyText {...SHINY_TEXT_PROPS} />
      </div>

      {/* ---- 独角兽 ---- */}
      <div className="mobile-unicorn">
        <UnicornCanvas width={280} height={212} />
      </div>

      {/* ---- 链接卡片 ---- */}
      <div className="mobile-card-wrapper">
        <div className="mobile-link-card">
          <LinkRowList items={NAV_LINKS} openInNewTab />
        </div>
      </div>

      <div className="mobile-link-map">
        {MOBILE_LINK_MAP_LINKS.map(({ label, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ))}
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
