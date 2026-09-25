'use client'

import DesktopContent from '@/components/pages/DesktopContent'
import MobileContent from '@/components/pages/MobileContent'
import { useIsDesktop } from '@/hooks/useIsDesktop'

export default function HomePage() {
  const isDesktop = useIsDesktop()

  if (isDesktop === null) {
    return <div className="min-h-[100dvh] bg-[#0a0a14]" aria-label="加载中" />
  }

  return isDesktop ? <DesktopContent /> : <MobileContent />
}
