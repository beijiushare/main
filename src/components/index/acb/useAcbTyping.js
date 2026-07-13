/**
 * useAcbTyping — 打字动画状态机
 * 逐像素匹配原版行为
 *
 * 返回：
 *   isPlaying, isPaused, completed, currentPosition
 *   progressPct, displayedLines, cursorLineIndex, isActive
 *   togglePlay, restartAnimation
 */
import { ref, computed, watch, onBeforeUnmount } from 'vue'

export function useAcbTyping(code, typingSpeed, autoPlay, loop) {
  const isPlaying = ref(false)
  const isPaused = ref(false)
  const completed = ref(false)
  const currentPosition = ref(0)

  let timer = null

  // ── Derived ──
  const codeLines = computed(() => code.value.split('\n'))
  const totalChars = computed(() => code.value.length)

  const progressPct = computed(() =>
    Math.min(100, (currentPosition.value / totalChars.value) * 100)
  )

  // ── renderLines — 原版 renderLines() 逐字符匹配 ──
  function renderLines() {
    let remaining = currentPosition.value
    const result = []
    for (let i = 0; i < codeLines.value.length; i++) {
      const line = codeLines.value[i]
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
  }

  const displayedLines = computed(() =>
    completed.value ? codeLines.value : renderLines()
  )

  // ── cursorLineIndex — 原版 getCursorLineIndex() ──
  const cursorLineIndex = computed(() => {
    if (!isPlaying.value && !isPaused.value) return -1
    let chars = 0
    for (let i = 0; i < codeLines.value.length; i++) {
      chars += codeLines.value[i].length + 1
      if (currentPosition.value < chars) return i
    }
    return codeLines.value.length - 1
  })

  const isActive = computed(() => isPlaying.value || isPaused.value)

  // ── statusLabel — 原版行为 ──
  const statusLabel = computed(() => {
    if (isPlaying.value) return 'Typing...'
    if (completed.value) return 'Completed'
    return 'Paused'
  })

  // ── Typing timer（递归 setTimeout，匹配原版 useEffect 模式） ──
  function scheduleNext() {
    if (!isPlaying.value || completed.value) {
      timer = null
      return
    }

    if (currentPosition.value >= totalChars.value) {
      if (loop.value) {
        // 循环模式：保持 isPlaying=true，1 秒后重置
        timer = setTimeout(() => {
          currentPosition.value = 0
        }, 1000)
      } else {
        completed.value = true
        isPlaying.value = false
        isPaused.value = false
        timer = null
      }
      return
    }

    const jitter = (Math.random() - 0.5) * typingSpeed.value * 0.5
    const delay = typingSpeed.value + jitter

    timer = setTimeout(() => {
      currentPosition.value++
      scheduleNext()
    }, delay)
  }

  // ── 监听 isPlaying 启停（原版 useEffect 等价） ──
  watch(isPlaying, (playing) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (playing && !completed.value) {
      scheduleNext()
    }
  })

  // ── Controls ──
  function togglePlay() {
    if (isPlaying.value) {
      isPaused.value = true
      isPlaying.value = false
    } else if (completed.value) {
      restartAnimation()
    } else {
      isPaused.value = false
      isPlaying.value = true
    }
  }

  function restartAnimation() {
    currentPosition.value = 0
    completed.value = false
    isPlaying.value = true
    isPaused.value = false
  }

  // ── Auto play ──
  if (autoPlay.value) {
    isPlaying.value = true
  }

  // ── Cleanup ──
  onBeforeUnmount(() => {
    if (timer) clearTimeout(timer)
  })

  return {
    isPlaying,
    isPaused,
    completed,
    currentPosition,
    codeLines,
    totalChars,
    progressPct,
    displayedLines,
    cursorLineIndex,
    isActive,
    statusLabel,
    togglePlay,
    restartAnimation,
  }
}
