export const LINK_MAP_GROUPS = [
  {
    id: 'personal',
    name: '个人',
    links: [
      {
        label: '碎语',
        href: 'https://channel.beijiu.top/',
        display: '碎语：https://channel.beijiu.top/',
      },
      {
        label: '书与影',
        href: 'https://library.beijiu.top/',
        display: '书与影：https://library.beijiu.top/',
      },
    ],
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
] as const

export const MOBILE_LINK_MAP_LINKS = LINK_MAP_GROUPS.flatMap((group) => group.links)
