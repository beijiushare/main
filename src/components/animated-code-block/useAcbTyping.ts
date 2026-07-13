import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

interface UseAcbTypingReturn {
  isPlaying: boolean
  isPaused: boolean
  completed: boolean
  currentPosition: number
  codeLines: string[]
  progressPct: number
  displayedLines: string[]
  cursorLineIndex: number
  isActive: boolean
  statusLabel: string
  togglePlay: () => void
  restartAnimation: () => void
}

export function useAcbTyping(
  code: string,
  typingSpeed: number,
  autoPlay: boolean,
  loop: boolean
): UseAcbTypingReturn {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isPaused, setIsPaused] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isPlayingRef = useRef(isPlaying)
  const completedRef = useRef(completed)
  const currentPositionRef = useRef(currentPosition)

  // Keep refs in sync
  isPlayingRef.current = isPlaying
  completedRef.current = completed
  currentPositionRef.current = currentPosition

  const codeLines = useMemo(() => code.split('\n'), [code])
  const totalChars = code.length

  const progressPct = Math.min(100, (currentPosition / totalChars) * 100)

  const renderLines = useCallback(() => {
    let remaining = currentPosition
    const result: string[] = []
    for (let i = 0; i < codeLines.length; i++) {
      const line = codeLines[i]
      const lineLen = line.length + 1 // +1 for newline
      if (remaining <= 0) {
        result.push('')
      } else if (remaining >= lineLen) {
        result.push(line)
        remaining -= lineLen
      } else {
        result.push(line.slice(0, remaining))
        remaining = 0
      }
    }
    return result
  }, [currentPosition, codeLines])

  const displayedLines = completed ? codeLines : renderLines()

  const cursorLineIndex = useMemo(() => {
    if (!isPlaying && !isPaused) return -1
    let chars = 0
    for (let i = 0; i < codeLines.length; i++) {
      chars += codeLines[i].length + 1
      if (currentPosition < chars) return i
    }
    return codeLines.length - 1
  }, [currentPosition, codeLines, isPlaying, isPaused])

  const isActive = isPlaying || isPaused

  const statusLabel = isPlaying ? 'Typing...' : completed ? 'Completed' : 'Paused'

  // Schedule next character
  useEffect(() => {
    if (!isPlaying || completed) {
      timerRef.current = null
      return
    }

    if (currentPosition >= totalChars) {
      if (loop) {
        timerRef.current = setTimeout(() => {
          setCurrentPosition(0)
        }, 1000)
      } else {
        setCompleted(true)
        setIsPlaying(false)
        setIsPaused(false)
      }
      return
    }

    const jitter = (Math.random() - 0.5) * typingSpeed * 0.5
    const delay = typingSpeed + jitter

    timerRef.current = setTimeout(() => {
      setCurrentPosition(prev => prev + 1)
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPlaying, completed, currentPosition, totalChars, typingSpeed, loop])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPaused(true)
      setIsPlaying(false)
    } else if (completed) {
      setCurrentPosition(0)
      setCompleted(false)
      setIsPlaying(true)
      setIsPaused(false)
    } else {
      setIsPaused(false)
      setIsPlaying(true)
    }
  }, [isPlaying, completed])

  const restartAnimation = useCallback(() => {
    setCurrentPosition(0)
    setCompleted(false)
    setIsPlaying(true)
    setIsPaused(false)
  }, [])

  return {
    isPlaying,
    isPaused,
    completed,
    currentPosition,
    codeLines,
    progressPct,
    displayedLines,
    cursorLineIndex,
    isActive,
    statusLabel,
    togglePlay,
    restartAnimation,
  }
}
