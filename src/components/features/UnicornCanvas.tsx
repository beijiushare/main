'use client'

import { PixelatedCanvas } from '@/components/ui/pixelated-canvas'
import { UNICORN_CANVAS_PROPS } from '@/data/site'

export default function UnicornCanvas({
  width,
  height,
  className,
}: {
  width: number
  height: number
  className?: string
}) {
  return <PixelatedCanvas {...UNICORN_CANVAS_PROPS} width={width} height={height} className={className} />
}
