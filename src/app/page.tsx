'use client'

import { useState, useEffect } from 'react'
import DesktopContent from '@/components/pages/DesktopContent'
import MobileContent from '@/components/pages/MobileContent'

export default function HomePage() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 769)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isDesktop === null) {
    return <div className="min-h-[100dvh] bg-[#0a0a14]" aria-label="加载中" />
  }

  return isDesktop ? <DesktopContent /> : <MobileContent />
}
