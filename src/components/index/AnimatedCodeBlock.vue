<template>
  <div
    ref="containerRef"
    class="acb"
    :class="[theme, { 'acb-fullscreen': isFullscreen }, className]"
  >
    <!-- Toolbar -->
    <AcbToolbar
      :title="title"
      :show-controls="showControls"
      :is-playing="typing.isPlaying.value"
      :completed="typing.completed.value"
      :copied="copied"
      :is-fullscreen="isFullscreen"
      @toggle-play="typing.togglePlay()"
      @restart="typing.restartAnimation()"
      @copy="copyCode"
      @download="downloadCode"
      @toggle-fullscreen="toggleFullscreen"
    />

    <!-- Code Area -->
    <AcbCodeArea ref="codeAreaRef"
      :code="code"
      :code-lines="typing.codeLines.value"
      :language="language"
      :theme="theme"
      :show-line-numbers="showLineNumbers"
      :highlight-lines="highlightLines"
      :blur-effect="blurEffect"
      :is-fullscreen="isFullscreen"
      :completed="typing.completed.value"
      :displayed-lines="typing.displayedLines.value"
      :cursor-line-index="typing.cursorLineIndex.value"
      :is-active="typing.isActive.value"
      :progress-pct="typing.progressPct.value"
      :highlighted-code="highlightedCode"
      :extra-lines="extraLines"
      @update:extra-lines="extraLines = $event"
    />

    <!-- Status Bar -->
    <AcbStatusBar
      :is-playing="typing.isPlaying.value"
      :status-label="typing.statusLabel.value"
      :progress-pct="typing.progressPct.value"
    />

    <!-- Fullscreen 退出按钮 -->
    <Transition name="acb-fade">
      <div v-if="isFullscreen" class="acb-fs-exit">
        <button class="acb-fs-btn" @click="toggleFullscreen" aria-label="Exit fullscreen">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,14 10,14 10,20" /><polyline points="20,10 14,10 14,4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'

import { useAcbTyping } from './acb/useAcbTyping'
import { getAcbTheme } from './acb/acbThemes'
import { getAcbScrollbarCSS, getAcbPrismCSS } from './acb/acbPrismStyles'

const props = defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: 'javascript' },
  theme: { type: String, default: 'dark' },
  typingSpeed: { type: Number, default: 50 },
  showLineNumbers: { type: Boolean, default: true },
  highlightLines: { type: Array, default: () => [] },
  title: { type: String, default: 'Code Example' },
  className: { type: String, default: '' },
  autoPlay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  blurEffect: { type: Boolean, default: false },
  showControls: { type: Boolean, default: true },
})

const emit = defineEmits(['onCopy'])

// ─── Ref wrappers for composable props ───
const codeRef = computed(() => props.code)
const typingSpeedRef = computed(() => props.typingSpeed)
const autoPlayRef = computed(() => props.autoPlay)
const loopRef = computed(() => props.loop)

// ─── Typing animation ───
const typing = useAcbTyping(codeRef, typingSpeedRef, autoPlayRef, loopRef)

// ─── State ───
const copied = ref(false)
const isFullscreen = ref(false)
const extraLines = ref(0)
const highlightedCode = ref('')
const containerRef = ref(null)
const codeAreaRef = ref(null)

// ─── 主题配置 ───
const themeCfg = computed(() => getAcbTheme(props.theme))

// ─── 高亮全量代码 ───
watch([codeRef, () => props.language], () => {
  try {
    const lang = Prism.languages[props.language] || Prism.languages.javascript
    highlightedCode.value = Prism.highlight(props.code, lang, props.language)
  } catch {
    highlightedCode.value = props.code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }
}, { immediate: true })

// ─── useHead 注入动态样式 ───
useHead({
  style: [
    {
      key: 'acb-theme',
      children: computed(() => {
        const t = props.theme
        const cfg = themeCfg.value
        return getAcbScrollbarCSS(t, cfg.scrollbarThumb) + getAcbPrismCSS(t)
      }),
    },
  ],
})

// ─── 复制 ───
function copyCode() {
  navigator.clipboard.writeText(props.code).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
    emit('onCopy')
  }).catch(() => {
    const ta = document.createElement('textarea')
    ta.value = props.code
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
    emit('onCopy')
  })
}

function downloadCode() {
  const a = document.createElement('a')
  const file = new Blob([props.code], { type: 'text/plain' })
  a.href = URL.createObjectURL(file)
  a.download = `code.${props.language}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// ─── 全屏 ───
function toggleFullscreen() {
  if (!document.fullscreenElement && containerRef.value) {
    containerRef.value.requestFullscreen().catch(() => {})
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}

function onFSChange() {
  isFullscreen.value = !!document.fullscreenElement
}

function onResize() {
  if (isFullscreen.value && codeAreaRef.value) {
    codeAreaRef.value.updateExtraLines()
  }
}

// ─── Lifecycle ───
onMounted(() => {
  document.addEventListener('fullscreenchange', onFSChange)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', onFSChange)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
/* ══════ Base ══════ */
.acb {
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--acb-border);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 14px;
  line-height: 24px;
  background: var(--acb-bg);
  color: var(--acb-text);
  box-shadow: var(--acb-shadow);
  transition: all 0.3s;
}

.acb,
.acb * { box-sizing: border-box; }

/* ══ 主题变量 —— 在元素上通过 .dark / .terminal / .cyberpunk / .nightowl 激活 ══ */
.dark {
  --acb-bg: #18181b;
  --acb-solid-bg: #18181b;
  --acb-text: #f4f4f5;
  --acb-line-num: #71717a;
  --acb-hl-bg: #27272a;
  --acb-border: #27272a;
  --acb-header-bg: #27272a;
  --acb-accent: #4f46e5;
  --acb-accent-text: #818cf8;
  --acb-shadow: 0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -4px rgba(0,0,0,0.1);
  --acb-fade-left: rgba(24,24,27,0.8);
  --acb-fade-right: rgba(24,24,27,0.8);
  --acb-blur-color: #60a5fa;
}

.terminal {
  --acb-bg: #0d1117;
  --acb-solid-bg: #0d1117;
  --acb-text: #00ff88;
  --acb-line-num: #009966;
  --acb-hl-bg: rgba(0,59,47,0.6);
  --acb-border: #1f2a30;
  --acb-header-bg: #161b22;
  --acb-accent: #00c46f;
  --acb-accent-text: #00ff88;
  --acb-shadow: 0 4px 6px -1px rgba(0,255,136,0.2), 0 2px 4px -2px rgba(0,255,136,0.1);
  --acb-fade-left: rgba(2,6,23,0.8);
  --acb-fade-right: rgba(2,6,23,0.8);
  --acb-blur-color: #34d399;
}

.cyberpunk {
  --acb-bg: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  --acb-solid-bg: #1a153a;
  --acb-text: #e0e0f0;
  --acb-line-num: #8f7ada;
  --acb-hl-bg: rgba(62,45,103,0.6);
  --acb-border: #5a4b8d;
  --acb-header-bg: linear-gradient(90deg, #2e1a47, #443266);
  --acb-accent: #ff00a0;
  --acb-accent-text: #ff00a0;
  --acb-shadow: 0 10px 15px -3px rgba(255,0,160,0.2), 0 4px 6px -4px rgba(255,0,160,0.1);
  --acb-fade-left: rgba(76,29,149,0.8);
  --acb-fade-right: rgba(76,29,149,0.8);
  --acb-blur-color: #d946ef;
}

.nightowl {
  --acb-bg: #011627;
  --acb-solid-bg: #011627;
  --acb-text: #d6deeb;
  --acb-line-num: #5f7e97;
  --acb-hl-bg: #1d3b53;
  --acb-border: #1e2d3d;
  --acb-header-bg: #0b2942;
  --acb-accent: #82aaff;
  --acb-accent-text: #82aaff;
  --acb-shadow: 0 4px 6px -1px rgba(130,170,255,0.2), 0 2px 4px -2px rgba(130,170,255,0.1);
  --acb-fade-left: rgba(11,41,66,0.8);
  --acb-fade-right: rgba(11,41,66,0.5);
  --acb-blur-color: #60a5fa;
}

/* ══ Fullscreen ══ */
.acb-fullscreen {
  position: fixed !important;
  inset: 0 !important;
  z-index: 50 !important;
  border-radius: 0 !important;
  height: 100vh !important;
}

/* ══ Fullscreen 退出按钮 ══ */
.acb-fs-exit {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 60;
}

.acb-fs-btn {
  background: rgba(0,0,0,0.5);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background 0.2s;
}

.acb-fs-btn:hover { background: rgba(0,0,0,0.7); }

/* ══ Transition ══ */
.acb-fade-enter-active { animation: acb-fade-in 0.2s ease-out; }
.acb-fade-leave-active { animation: acb-fade-in 0.2s ease-in reverse; }

@keyframes acb-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ══ Prism token override ══ */
:deep(.token) { font-family: inherit; }
:deep(.token.operator) { background: transparent; }
:deep(.token.bold) { font-weight: bold; }
:deep(.token.italic) { font-style: italic; }
</style>
