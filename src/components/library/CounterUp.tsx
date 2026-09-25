'use client'

import { useEffect, useState } from 'react'

export default function CounterUp({ end }: { end: number }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(end * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [end])

  return <>{value.toLocaleString()}</>
}
