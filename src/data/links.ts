import { LINK_MAP_EXTRA_LINKS, NAV_LINKS, type NavLinkItem } from '@/data/navLinks'

type LinkMapItem = {
  label: string
  href: string
  display: string
  absoluteUrl: string
}

type LinkMapGroup = {
  id: string
  name: string
  links: readonly LinkMapItem[]
}

function toLinkMapItem({ label, href, display }: NavLinkItem): LinkMapItem {
  return {
    label,
    href,
    display: label,
    absoluteUrl: display || href,
  }
}

export const LINK_MAP_GROUPS: readonly LinkMapGroup[] = [
  {
    id: 'personal',
    name: '个人',
    links: [...NAV_LINKS, ...LINK_MAP_EXTRA_LINKS].map(toLinkMapItem),
  },
  {
    id: 'tools',
    name: '工具',
    links: [],
  },
  {
    id: 'entertainment',
    name: '娱乐',
    links: [],
  },
]

export const MOBILE_LINK_MAP_LINKS = LINK_MAP_GROUPS.flatMap((group) => group.links)
