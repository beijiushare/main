'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'beijiu-library-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function LibraryThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initialTheme = getInitialTheme()
    setTheme(initialTheme)
    setMounted(true)
    document.documentElement.dataset.libraryTheme = initialTheme
  }, [])

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    const applyTheme = () => {
      root.dataset.libraryTheme = nextTheme
      setTheme(nextTheme)
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    }
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> }
    }

    if (!transitionDocument.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTheme()
      return
    }

    const transition = transitionDocument.startViewTransition(applyTheme)
    transition.ready.then(() => {
      const radius = Math.hypot(
        Math.max(event.clientX, window.innerWidth - event.clientX),
        Math.max(event.clientY, window.innerHeight - event.clientY),
      )
      const clipPath = [
        `circle(0% at ${event.clientX}px ${event.clientY}px)`,
        `circle(${radius}px at ${event.clientX}px ${event.clientY}px)`,
      ]
      const isDark = nextTheme === 'dark'

      root.animate(
        { clipPath: isDark ? clipPath.slice().reverse() : clipPath },
        {
          duration: 500,
          fill: 'forwards',
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
        },
      )
    })
  }

  return (
    <button
      type="button"
      className="library-theme-toggle"
      onClick={toggleTheme}
      aria-label={mounted ? `切换到${theme === 'dark' ? '浅色' : '深色'}模式` : '切换主题'}
      title={mounted ? `切换到${theme === 'dark' ? '浅色' : '深色'}模式` : '切换主题'}
    >
      {mounted && theme === 'dark' ? <Sun className="library-theme-icon" /> : <Moon className="library-theme-icon" />}
    </button>
  )
}
