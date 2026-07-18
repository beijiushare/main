'use client'

import { PixelatedCanvas } from '@/components/ui/pixelated-canvas'

export default function TestPage() {
  return (
    <div className="flex h-screen bg-[#0a0a14] text-zinc-300">
      <div className="flex-1 flex items-center justify-center">
        <PixelatedCanvas
          src="/unicorn.webp"
          width={540}
          height={420}
          cellSize={5}
          dotScale={0.8}
          shape="circle"
          backgroundColor="#000000"
          dropoutStrength={0.4}
          interactive
          distortionStrength={7}
          distortionRadius={80}
          distortionMode="swirl"
          followSpeed={0.2}
          jitterStrength={4}
          jitterSpeed={4}
          sampleAverage
          tintColor="#FFFFFF"
          tintStrength={0.2}
          className="rounded-xl border border-neutral-800 shadow-lg"
        />
      </div>
    </div>
  )
}
