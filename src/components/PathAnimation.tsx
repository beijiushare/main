'use client'

import { useRef, useEffect, useMemo, useCallback, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OptionWheel from './OptionWheel'

gsap.registerPlugin(ScrollTrigger)

// 纸飞机飞行路径（双圈轨迹）
const FLIGHT_PATH =
  'M 837.2 287.1 C 804.5 249.8, 788.3 174.7, 739.2 175.3 C 694.1 175.7, 645.8 247.4, 663.4 288.9 C 678.5 324.2, 779.2 258.6, 760.5 225.2 C 729.3 169.7, 647.6 145.1, 584.0 147.5 C 516.3 150.1, 412.9 172.5, 400.1 239.0 C 388.3 300.3, 480.3 370.4, 542.4 363.8 C 589.7 358.7, 609.4 237.3, 564.6 221.5 C 447.4 180.2, 313.9 233.2, 188.5 239.0'
// 路径起点（缩放锚点，保持该点不动）
const PATH_START = { x: 837.2, y: 287.1 }

/* ============ 纯 SVG 图标组件 ============ */

function SvgIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className={className}
      fill="currentColor"
      width="22"
      height="22"
    >
      {children}
    </svg>
  )
}

function IconVCard({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1170 1024" className={className} fill="currentColor" width="22" height="22">
      <path d="M585.142857 646.285714q0-36.571429-5.142857-67.142857t-16.857143-58.857143-34.571428-44.571428-55.428572-16.285715q-3.428571 2.285714-17.142857 10.285715t-21.428571 12.285714T414.285714 492t-24.571428 8.285714-24 2.571429-24-2.571429-24.571429-8.285714-20.285714-10T275.428571 469.714286t-17.142857-10.285715q-32.571429 0-55.428571 16.285715t-34.571429 44.571428-16.857143 58.857143-5.142857 67.142857 21.142857 60.857143 52 24.285714h292.571429q30.857143 0 52-24.285714t21.142857-60.857143zM495.428571 349.142857q0-53.714286-38-91.714286T365.714286 219.428571t-91.714286 38T236 349.142857t38 91.714286T365.714286 478.857143t91.714285-38T495.428571 349.142857z m528.571429 290.857143v-36.571429q0-8-5.142857-13.142857t-13.142857-5.142857h-329.142857q-8 0-13.142858 5.142857t-5.142857 13.142857v36.571429q0 8 5.142857 13.142857t13.142858 5.142857h329.142857q8 0 13.142857-5.142857t5.142857-13.142857z m0-148.571429v-32q0-8.571429-6-14.571428T1003.428571 438.857143h-324.571428q-8.571429 0-14.571429 6T658.285714 459.428571v32q0 8.571429 6 14.571429T678.857143 512h324.571428q8.571429 0 14.571429-6T1024 491.428571z m0-144v-36.571428q0-8-5.142857-13.142857t-13.142857-5.142857h-329.142857q-8 0-13.142858 5.142857t-5.142857 13.142857v36.571428q0 8 5.142857 13.142858t13.142858 5.142857h329.142857q8 0 13.142857-5.142857t5.142857-13.142858z m146.285714-182.857142v694.857142q0 37.714286-26.857143 64.571429t-64.571428 26.857143h-201.142857v-54.857143q0-8-5.142857-13.142857t-13.142858-5.142857h-36.571428q-8 0-13.142857 5.142857t-5.142857 13.142857v54.857143H365.714286v-54.857143q0-8-5.142857-13.142857t-13.142858-5.142857h-36.571428q-8 0-13.142857 5.142857t-5.142857 13.142857v54.857143H91.428571q-37.714286 0-64.571428-26.857143T0 859.428571V164.571429q0-37.714286 26.857143-64.571429t64.571428-26.857143h987.428572q37.714286 0 64.571428 26.857143t26.857143 64.571429z" />
    </svg>
  )
}

function IconCV({ className }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="M897.024 147.456c0-69.632-57.344-126.976-126.976-126.976h-327.68c-20.48 0-36.864 4.096-49.152 12.288-12.288 4.096-28.672 12.288-36.864 20.48L167.936 237.568c-12.288 8.192-20.48 20.48-28.672 36.864-8.192 16.384-12.288 32.768-12.288 53.248v544.768c0 69.632 57.344 126.976 126.976 126.976h516.096c69.632 0 126.976-57.344 126.976-126.976V147.456z m-385.024 147.456c61.44 0 110.592 49.152 110.592 110.592 0 61.44-49.152 110.592-110.592 110.592-61.44 0-110.592-49.152-110.592-110.592 0-61.44 49.152-110.592 110.592-110.592zM659.456 778.24H393.216c-69.632 0-94.208-32.768-77.824-73.728 20.48-53.248 61.44-94.208 110.592-114.688 8.192-4.096 16.384-4.096 24.576 0 40.96 16.384 90.112 12.288 126.976 0 8.192-4.096 16.384-4.096 24.576 0 49.152 24.576 90.112 65.536 110.592 118.784 12.288 32.768-16.384 69.632-53.248 69.632z" />
    </SvgIcon>
  )
}

function IconGithub({ className }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="M512 12.63616c-282.74688 0-512 229.21216-512 512 0 226.22208 146.69824 418.14016 350.12608 485.82656 25.57952 4.73088 35.00032-11.10016 35.00032-24.63744 0-12.20608-0.47104-52.55168-0.69632-95.31392-142.4384 30.96576-172.50304-60.416-172.50304-60.416-23.28576-59.16672-56.85248-74.91584-56.85248-74.91584-46.44864-31.78496 3.50208-31.1296 3.50208-31.1296 51.4048 3.60448 78.47936 52.75648 78.47936 52.75648 45.6704 78.27456 119.76704 55.64416 149.01248 42.55744 4.58752-33.09568 17.85856-55.68512 32.50176-68.46464-113.72544-12.94336-233.2672-56.85248-233.2672-253.0304 0-55.88992 20.00896-101.5808 52.75648-137.4208-5.3248-12.9024-22.85568-64.96256 4.95616-135.49568 0 0 43.008-13.74208 140.84096 52.49024 40.83712-11.34592 84.64384-17.03936 128.16384-17.24416 43.49952 0.2048 87.32672 5.87776 128.24576 17.24416 97.73056-66.2528 140.65664-52.49024 140.65664-52.49024 27.87328 70.53312 10.3424 122.59328 5.03808 135.49568 32.82944 35.86048 52.69504 81.53088 52.69504 137.4208 0 196.64896-119.78752 239.94368-233.79968 252.6208 18.37056 15.89248 34.73408 47.04256 34.73408 94.80192 0 68.5056-0.59392 123.63776-0.59392 140.51328 0 13.6192 9.216 29.5936 35.16416 24.576 203.32544-67.76832 349.83936-259.62496 349.83936-485.76512 0-282.78784-229.23264-512-512-512z" />
    </SvgIcon>
  )
}

function IconWechat({ className }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="M927.817143 456.594286l-82.651429-82.651429v-116.845714a78.445714 78.445714 0 0 0-78.445714-78.445714h-116.845714l-82.651429-82.651429c-30.537143-30.537143-80.274286-30.537143-110.994286 0l-82.651428 82.651429h-116.845714a78.445714 78.445714 0 0 0-78.445715 78.445714v116.845714l-82.651428 82.651429c-30.537143 30.537143-30.537143 80.274286 0 110.994285l82.651428 82.651429v116.845714a78.445714 78.445714 0 0 0 78.445715 78.445715h116.845714l82.651428 82.651428c30.537143 30.537143 80.274286 30.537143 110.994286 0l82.651429-82.651428h116.845714a78.445714 78.445714 0 0 0 78.445714-78.445715v-116.845714l82.651429-82.651429a78.354286 78.354286 0 0 0 0-110.994285z m-214.125714-22.491429L458.971429 649.691429c-7.131429 6.034286-16.091429 9.325714-25.417143 9.325714-1.097143 0-2.194286 0-3.474286-0.182857-10.422857-0.914286-20.114286-5.851429-26.697143-13.897143l-98.011428-117.577143c-13.897143-16.64-11.702857-41.325714 4.937142-55.222857 16.64-13.897143 41.325714-11.52 55.222858 4.937143l72.777142 87.222857 224.731429-190.171429c16.64-13.897143 41.325714-11.885714 55.222857 4.571429 14.08 16.64 12.068571 41.508571-4.571428 55.405714z" />
    </SvgIcon>
  )
}

function IconBlog({ className }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="M143.1 99.8h597.1c44 0 79.6 35.6 79.6 79.6v664c0 44-35.6 79.6-79.6 79.6H143.1c-44 0-79.6-35.6-79.6-79.6v-664c0-44 35.6-79.6 79.6-79.6z" />
      <path d="M501.3 478.2h-252c-18.3 0-33.2 14.9-33.2 33.2s14.9 33.2 33.2 33.2h252.1c18.3 0 33.2-14.9 33.2-33.2s-14.9-33.2-33.3-33.2zM395.2 650.7H249.3c-18.3 0-33.2 14.9-33.2 33.2 0 18.3 14.9 33.2 33.2 33.2h145.9c18.3 0 33.2-14.9 33.2-33.2 0-18.3-14.9-33.2-33.2-33.2zM634 305.8H249.3c-18.3 0-33.2 14.9-33.2 33.2s14.9 33.2 33.2 33.2H634c18.3 0 33.2-14.9 33.2-33.2s-14.9-33.2-33.2-33.2z" />
      <path d="M957 475.7c-1.2-6.1-3-12.2-5.4-17.7l-0.1-0.3-0.2-0.3c-5.8-12.7-13.7-24.8-23.7-35.9-10.4-11.6-20.5-19.9-30.6-25.4-5.3-2.8-10.7-5-16.9-6.9-7.3-2.2-14.5-3.4-22-3.8-1.3 0-2.1-0.1-3-0.1-7.7 0-15.4 1.2-23.1 3.6-8.9 2.8-17.6 7.4-25.6 13.9l-0.5 0.4-0.5 0.4c-3.9 3.3-8.5 7.5-13.5 12.4-4.5 4.5-8.4 8.1-11.6 11.2l-3.3 3.2-0.1-0.1-2.4 2.5-25.7 24.5 1 1-2.1 2.2-90.1 93.2-34 35.1-30.6 31.6c-9.4 9.7-17.2 17.8-23.5 24.5l-10.1 10.6-1.4 1.5c-5.8 6-10.6 11.9-14.2 17.7-3 4.7-5.8 10.1-8.3 15.8-2.4 4.8-4.6 10.7-7.4 19.3-2.4 7.3-4.8 15.3-7.3 24.1-2.4 8.3-4.7 16.4-6.8 24.2-2.8 10.2-4.3 17.4-5.2 23.4-2.9 19.2 0.7 35.7 10.8 48.6 6 7.6 19.1 19.7 42.7 19.7 2.9 0 6-0.2 9.2-0.5l0.8-0.1 0.8-0.1c5-0.8 11.4-2.3 20.7-4.8 7.9-2.1 16.3-4.7 25.7-7.8 8.8-3 17.2-6 25.3-9 8.7-3.4 15.3-6.2 20.4-8.7 6.7-3.1 13.1-7.1 19.1-11.9 4-3.1 7.7-6.3 11-9.3 2.8-2.4 6.2-5.8 12.9-12.7 6.1-6.3 13.5-14.1 22.5-23.5 8.1-8.6 17.5-18.2 29.7-30.5l0.3-0.3 0.2-0.3 33.5-35.1 90-93 29.1-30.1-0.1-0.1 0.3-0.3c2.6-2.3 5.4-5 8.3-8 1.8-1.8 3.9-4 6.3-6.3 2.9-2.9 6.1-6.1 9.7-9.8l0.6-0.6 0.6-0.6c6.6-7.4 11.6-15.7 14.9-24.5 3.2-8.5 4.8-17.5 4.8-26.5 0.1-6.7-0.6-13.3-1.9-19.7z" />
      <path d="M765.2 665.3l-33.5 35.1c-11.1 11.3-21.2 21.6-30.2 31-8.9 9.4-16.3 17.1-22.2 23.2-5.9 6.1-9.4 9.5-10.5 10.4-2.8 2.6-6 5.4-9.6 8.2-3.6 2.9-7.4 5.2-11.3 7-3.9 2-9.6 4.4-17.2 7.4-7.6 2.9-15.4 5.7-23.7 8.4-8.2 2.7-16.1 5.1-23.5 7.1-7.4 2-12.9 3.3-16.6 3.9-1.6 0.2-3.2 0.3-4.5 0.3-5 0-8.6-1.2-10.5-3.7-2.5-3.2-3.2-8.5-2.1-16 0.6-4.1 1.9-9.9 4-17.6 2.1-7.7 4.3-15.6 6.7-23.8 2.4-8.3 4.7-15.9 6.9-22.8s4.1-11.7 5.5-14.3c1.7-4 3.6-7.7 5.7-11s5.1-7 9-11c1.7-1.8 5.6-5.9 11.8-12.4 6.1-6.5 13.8-14.5 23.1-24.1l30.6-31.6 34-35.1 90.1-93.2 78.4 81.5-90.4 93.1z m150.5-158.6c-1.4 3.8-3.6 7.4-6.7 10.8-3.3 3.5-6.4 6.5-9 9.1l-6.9 6.9c-2.2 2.3-4.3 4.3-6.3 6.1l-78.4-81c3.4-3.2 7.4-7 11.9-11.5 4.6-4.5 8.5-8 11.5-10.6 3.9-3.1 8-5.4 12.1-6.7 3.8-1.2 7.5-1.8 11.2-1.8h1.2c4 0.2 8 0.8 11.7 1.9 3.8 1.2 7.1 2.5 9.8 3.9 5.9 3.2 12.4 8.7 19.5 16.6 7.1 7.9 12.6 16.3 16.6 24.9 1.1 2.6 2 5.6 2.7 9.1 0.7 3.5 1.1 7.1 1.1 10.8 0.1 3.9-0.6 7.7-2 11.5z" />
    </SvgIcon>
  )
}

function IconBilibili({ className }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 1 1 60.373333 60.373333l-78.037333 77.952L789.333333 256A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.813334L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 1 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 1 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z" />
    </SvgIcon>
  )
}

/* ============ 链接配置 ============ */

const LINK_ITEMS: { label: string; href: string; Icon: React.FC<{ className?: string }> }[] = [
  { label: 'vCard', href: '/vCard', Icon: IconVCard },
  { label: 'CV', href: '/cv', Icon: IconCV },
  { label: 'GitHub', href: 'https://github.com/beijiushare', Icon: IconGithub },
  { label: '公众号', href: '/WechatPublic', Icon: IconWechat },
  { label: 'Blog', href: 'https://blog.beijiu.top/', Icon: IconBlog },
  { label: 'Bilibili', href: 'https://space.bilibili.com/3494379710842912', Icon: IconBilibili },
]

/* ============ 主组件 ============ */

export default function PathAnimation({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const planeRef = useRef<SVGGElement>(null)
  const linksCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const trail = trailRef.current
    const pathEl = pathRef.current
    const plane = planeRef.current
    const card = linksCardRef.current
    const group = groupRef.current
    if (!section || !trail || !pathEl || !plane || !card || !group) return

    const pathLength = pathEl.getTotalLength()

    // 初始：隐藏拖尾和卡片
    trail.style.strokeDasharray = String(pathLength)
    trail.style.strokeDashoffset = String(pathLength)

    // vh → 像素工具
    const vh = (n: number) => (n / 100) * window.innerHeight
    const sts: ScrollTrigger[] = []

    // ─── 容器渐显 220→260vh（纸飞机起跑前准备好） ───
    const containerAnim = gsap.to(containerRef.current, {
      opacity: 1, visibility: 'visible', ease: 'none', paused: true,
    })
    sts.push(ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop + vh(220),
      end: () => section.offsetTop + vh(260),
      scrub: 0.6,
      animation: containerAnim,
    }))

    // ─── 纸飞机飞行 260→600vh ───
    const planeObj = { p: 0 }
    const planeAnim = gsap.to(planeObj, {
      p: 1, ease: 'none', paused: true,
      onUpdate: () => {
        const p = planeObj.p
        const gap = 0.015

        // 拖尾线条（纸飞机后方 gap 间距处开始绘制轨迹）
        const trailEnd = Math.max(0, p - gap)
        trail.style.strokeDashoffset = String(pathLength * (1 - trailEnd))

        // 纸飞机位置与朝向
        const safeP = Math.min(1, Math.max(0, p))
        const point = pathEl.getPointAtLength(pathLength * safeP)
        // 取前方 1% 求切线方向；终点处（safeP ≥ 0.99）改向后取，避免 dx=dy=0
        const isEnd = safeP >= 0.99
        const nextP = isEnd ? safeP - 0.01 : Math.min(1, safeP + 0.01)
        const next = pathEl.getPointAtLength(pathLength * nextP)
        const dx = isEnd ? point.x - next.x : next.x - point.x
        const dy = isEnd ? point.y - next.y : next.y - point.y
        const len = Math.hypot(dx, dy)
        // 纸飞机自然朝向修正：头→尾部中心连线在 rotate(0) 时指向右上 -57.6°
        // 需补偿此角度使头→尾中心线对齐路径切线方向
        const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI) + 57.6
        const angleRad = angleDeg * Math.PI / 180

        // 纸飞机直接定位在路径点，旋转对齐路径方向
        // "早走一点点"由拖尾 gap（1.5%）实现，不对尾部做额外偏移
        const tx = point.x
        const ty = point.y

        plane.setAttribute('transform', `translate(${tx}, ${ty}) rotate(${angleDeg})`)
      },
    })
    sts.push(ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop + vh(260),
      end: () => section.offsetTop + vh(600),
      scrub: 0.8,
      animation: planeAnim,
    }))

    // ─── 卡片渐显 450→600vh（出现更晚，速度更快，完全显现时间与左移动画不变） ───
    const cardAnim = gsap.fromTo(card,
      { opacity: 0, y: 30, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, ease: 'none', paused: true },
    )
    sts.push(ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop + vh(450),
      end: () => section.offsetTop + vh(600),
      scrub: 0.6,
      animation: cardAnim,
    }))

    // ─── 线条+卡片左移出屏 660→870vh ───
    const groupAnim = gsap.to(group, {
      x: '-120vw', opacity: 0.3, ease: 'none', paused: true,
    })
    sts.push(ScrollTrigger.create({
      trigger: section,
      start: () => section.offsetTop + vh(660),
      end: () => section.offsetTop + vh(870),
      scrub: 0.6,
      animation: groupAnim,
      onUpdate: (self) => {
        if (self.progress > 0 && self.progress < 1) {
          console.log(`🔶 组动画 progress=${self.progress.toFixed(3)}  x=${groupAnim.progress()}`)
        }
      },
    }))

    ScrollTrigger.refresh()

    return () => {
      sts.forEach(st => {
        st.animation?.kill()
        st.kill()
      })
    }
  }, [sectionRef])

  const handleWheelConfirm = useCallback((index: number) => {
    const { href } = LINK_ITEMS[index]
    window.open(href, '_blank', 'noopener')
  }, [])

  // 稳定引用：wheel items 避免每次 render 重新创建（OptionWheel deps 依赖此引用）
  const wheelItems = useMemo(
    () => LINK_ITEMS.map(({ label, Icon }) => ({ label, Icon })),
    []
  )

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none opacity-0 invisible"
      style={{ zIndex: 5 }}
    >
      <div ref={groupRef} className="absolute inset-0">
        {/* SVG 层：飞行路径 + 拖尾 + 纸飞机 */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 900 480"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 以起点为原点缩放至 75%，起点位置不变 */}
          <g transform={`translate(${PATH_START.x}, ${PATH_START.y}) scale(0.75) translate(${-PATH_START.x}, ${-PATH_START.y})`}>
          {/* 拖尾线条（纸飞机带出的纯白轨迹） */}
          <path
            ref={trailRef}
            d={FLIGHT_PATH}
            stroke="#ffffff"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 参考路径（不可见，用于 getPointAtLength） */}
          <path ref={pathRef} d={FLIGHT_PATH} fill="none" opacity="0" />

          {/* 纸飞机 — 初始在画面外，GSAP 首次 onUpdate 将其移至正确位置 */}
          <g ref={planeRef} transform="translate(-9999, -9999)">
            <g transform="scale(0.035) translate(-512, -512)">
              <path
                d="M974.966667 91.46a21.333333 21.333333 0 0 0-21.713334-5.033333l-896 298.666666a21.333333 21.333333 0 0 0-4.226666 38.533334L256 545.413333V832a21.333333 21.333333 0 0 0 36.42 15.086667L448 691.506667l240.913333 240.913333a21.333333 21.333333 0 0 0 35.426667-8.666667l256-810.666666a21.333333 21.333333 0 0 0-5.373333-21.626667zM796.666667 183.606667L277.106667 508.32 114.746667 410.906667zM298.666667 545.16l537.82-336.14-403.873334 437.533333L298.666667 780.5z m395.573333 332.24l-216.666667-216.666667 433.333334-469.426667z"
                fill="#ffffff"
              />
            </g>
          </g>
          </g>
        </svg>
        <div
          ref={linksCardRef}
          className="absolute left-[7%] top-1/2 -translate-y-1/2 w-[340px] h-[55vh] pointer-events-auto opacity-0"
          style={{ zIndex: 6 }}
        >
          <OptionWheel
            items={wheelItems}
            side="left"
            defaultSelected={0}
            textColor="#d4d4d4"
            activeColor="#ffffff"
            fontSize={2}
            spacing={1.6}
            curve={0}
            tilt={0}
            blur={1}
            fade={0.2}
            inset={80}
            loop={false}
            draggable={true}
            onConfirm={handleWheelConfirm}
          />
      </div>
      </div>
    </div>
  )
}
