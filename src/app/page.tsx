'use client'

import { useState, useEffect } from 'react'
import DesktopContent from '@/components/pages/DesktopContent'
import MobileContent from '@/components/pages/MobileContent'

export default function HomePage() {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 769)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isDesktop ? <DesktopContent /> : <MobileContent />
}
