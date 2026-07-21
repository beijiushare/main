'use client'

import { useState, useEffect } from 'react'
import DesktopContent from '@/components/DesktopContent'
import MobileContent from '@/components/MobileContent'

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
