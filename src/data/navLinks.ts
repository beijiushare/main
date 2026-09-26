import IconVcard from '@/components/icons/IconVcard'
import IconCv from '@/components/icons/IconCv'
import IconGithub from '@/components/icons/IconGithub'
import IconWechatPublic from '@/components/icons/IconWechatPublic'
import IconBlog from '@/components/icons/IconBlog'
import IconBilibili from '@/components/icons/IconBilibili'
import IconChannel from '@/components/icons/IconChannel'
import IconLibrary from '@/components/icons/IconLibrary'

export type NavLinkItem = {
  label: string
  href: string
  display?: string
  Icon: React.ComponentType<{ className?: string }>
  sameTab?: boolean
}

export const NAV_LINKS: readonly NavLinkItem[] = [
  { label: 'vCard', href: '/vCard', display: 'https://www.beijiu.top/vCard', Icon: IconVcard, sameTab: true },
  { label: '碎语', href: 'https://channel.beijiu.top/', display: 'https://channel.beijiu.top/', Icon: IconChannel },
  { label: 'GitHub', href: 'https://github.com/beijiushare', display: 'https://github.com/beijiushare', Icon: IconGithub },
  { label: '书与影', href: '/library', display: 'https://www.beijiu.top/library', Icon: IconLibrary, sameTab: true },
  { label: '公众号', href: '/WechatPublic', display: 'https://www.beijiu.top/WechatPublic', Icon: IconWechatPublic, sameTab: true },
  { label: 'Bilibili', href: 'https://space.bilibili.com/3745019517210321', display: 'https://space.bilibili.com/3745019517210321', Icon: IconBilibili },
]

export const LINK_MAP_EXTRA_LINKS: readonly NavLinkItem[] = [
  { label: 'CV', href: '/cv', display: 'https://www.beijiu.top/cv', Icon: IconCv, sameTab: true },
  { label: 'Blog', href: 'https://blog.beijiu.top/', display: 'https://blog.beijiu.top/', Icon: IconBlog },
]
