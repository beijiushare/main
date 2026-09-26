import { useEffect, useState } from 'react'

export function useAutoSize({ xs, sm }: { xs: number; sm: number }) {
  const [size, setSize] = useState(sm)

  useEffect(() => {
    const update = () => setSize(window.innerWidth >= 640 ? sm : xs)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [sm, xs])

  return size
}
