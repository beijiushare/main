import Link from 'next/link'
import type { NavLinkItem } from '@/data/navLinks'

export default function LinkRowList({
  items,
  openInNewTab,
}: {
  items: readonly NavLinkItem[]
  openInNewTab: boolean
}) {
  return items.map(({ label, href, Icon, sameTab }) => {
    const shouldOpenInNewTab = !sameTab && (openInNewTab || href.startsWith('http'))

    const content = (
      <>
        <Icon />
        <span>{label}</span>
      </>
    )

    if (href.startsWith('/')) {
      return (
        <Link key={label} href={href} className="mobile-link-row">
          {content}
        </Link>
      )
    }

    return (
      <a
        key={label}
        href={href}
        target={shouldOpenInNewTab ? '_blank' : undefined}
        rel={shouldOpenInNewTab ? 'noopener noreferrer' : undefined}
        className="mobile-link-row"
      >
        {content}
      </a>
    )
  })
}
