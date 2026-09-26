import type { NavLinkItem } from '@/data/navLinks'

export default function LinkRowList({
  items,
  openInNewTab,
}: {
  items: readonly NavLinkItem[]
  openInNewTab: boolean
}) {
  return items.map(({ label, href, Icon }) => (
    <a
      key={label}
      href={href}
      target={openInNewTab || href.startsWith('http') ? '_blank' : undefined}
      rel={openInNewTab || href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="mobile-link-row"
    >
      <Icon />
      <span>{label}</span>
    </a>
  ))
}
