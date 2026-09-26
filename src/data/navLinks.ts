import IconVcard from '@/components/icons/IconVcard'
import IconCv from '@/components/icons/IconCv'
import IconGithub from '@/components/icons/IconGithub'
import IconWechatPublic from '@/components/icons/IconWechatPublic'
import IconBlog from '@/components/icons/IconBlog'
import IconBilibili from '@/components/icons/IconBilibili'

export type NavLinkItem = {
  label: string
  href: string
  Icon: React.ComponentType<{ className?: string }>
}

export const NAV_LINKS: readonly NavLinkItem[] = [
  { label: 'vCard', href: '/vCard', Icon: IconVcard },
  { label: 'CV', href: '/cv', Icon: IconCv },
  { label: 'GitHub', href: 'https://github.com/beijiushare', Icon: IconGithub },
  { label: '公众号', href: '/WechatPublic', Icon: IconWechatPublic },
  { label: 'Blog', href: 'https://blog.beijiu.top/', Icon: IconBlog },
  { label: 'Bilibili', href: 'https://space.bilibili.com/3745019517210321', Icon: IconBilibili },
]
