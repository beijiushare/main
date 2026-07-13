<template>
  <div class="acb-body">
    <!-- 光晕叠加层（原版 opacity-[0.05] mix-blend-overlay） -->
    <div v-if="blurEffect" class="acb-blur-overlay" />

    <!-- 进度条（原版 h-0.5 bg-black/20 dark:bg-white/10） -->
    <div class="acb-progress-track">
      <div class="acb-progress-bar" :style="{ width: progressPct + '%' }" />
    </div>

    <!-- 代码容器：overflow-hidden 包裹 scroll + 边缘渐变 -->
    <div ref="codeContainerRef" class="acb-code-container">
      <!-- 边缘渐变遮罩（原版 absolute top-0 bottom-0 w-12 z-10 opacity-50） -->
      <div class="acb-fade-left" />
      <div class="acb-fade-right" />

      <!-- 滚动区（原版 overflow-auto code-scrollbar h-full） -->
      <div ref="scrollRef" class="acb-scroll code-scrollbar">
        <div class="acb-scroll-inner">
          <!-- 行号列（原版 sticky -left-1 h-full flex flex-col z-10） -->
          <div v-if="showLineNumbers" ref="lineNumsRef" class="acb-ln-col">
            <div>
              <div v-for="(_, i) in codeLines" :key="i" class="acb-ln-item">{{ i + 1 }}</div>
              <div v-for="(_, i) in extraLines" :key="'e' + i" class="acb-ln-item">{{ codeLines.length + i + 1 }}</div>
            </div>
          </div>

          <!-- 代码区（原版 relative py-4 flex-grow h-full z-1） -->
          <div ref="codeRef" class="acb-code-col">
            <!-- 高亮行指示线 -->
            <div
              v-for="ln in highlightLines"
              :key="'hl-' + ln"
              class="acb-hl-line"
              :style="{ top: (ln - 1) * 24 + 16 + 'px' }"
            />

            <!-- 代码内容（原版 relative z-10 px-4 font-mono text-sm） -->
            <div class="acb-code-content">
              <!-- 完成态：显示完整高亮代码 -->
              <template v-if="completed">
                <div class="acb-full-code" v-html="highlightedCode" />
              </template>
              <!-- 打字态：逐行显示 -->
              <template v-else>
                <div v-for="(line, i) in codeLines" :key="i" class="acb-code-row">
                  <span v-if="displayedLines[i]" v-html="highlightLine(displayedLines[i])" />
                  <span v-if="i === cursorLineIndex && isActive" class="acb-cursor" />
                </div>
              </template>
              <!-- 全屏补齐行 -->
              <div v-for="(_, i) in extraLines" :key="'ex' + i" class="acb-code-row">&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { getAcbTheme } from './acbThemes'

const props = defineProps({
  code: { type: String, default: '' },
  codeLines: { type: Array, default: () => [] },
  language: { type: String, default: 'javascript' },
  theme: { type: String, default: 'dark' },
  showLineNumbers: { type: Boolean, default: true },
  highlightLines: { type: Array, default: () => [] },
  blurEffect: { type: Boolean, default: false },
  isFullscreen: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  displayedLines: { type: Array, default: () => [] },
  cursorLineIndex: { type: Number, default: -1 },
  isActive: { type: Boolean, default: false },
  progressPct: { type: Number, default: 0 },
  highlightedCode: { type: String, default: '' },
  extraLines: { type: Number, default: 0 },
})

const emit = defineEmits(['update:extraLines'])

const codeRef = ref(null)
const scrollRef = ref(null)
const lineNumsRef = ref(null)
const codeContainerRef = ref(null)

// 全屏额外行数
watch([() => props.isFullscreen, () => props.code], () => {
  if (props.isFullscreen) {
    nextTick(() => updateExtraLines())
  } else {
    emit('update:extraLines', 0)
  }
})

function updateExtraLines() {
  if (!codeContainerRef.value || !lineNumsRef.value) return
  const h = codeContainerRef.value.clientHeight
  const lines = props.codeLines.length
  const visible = Math.floor(h / 24)
  emit('update:extraLines', Math.max(0, visible - lines))
}

// 对外暴露 updateExtraLines 供 resize 使用
defineExpose({ updateExtraLines, codeContainerRef })

// Prism 单行高亮
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

function highlightLine(line) {
  if (!line) return ''
  try {
    const lang = Prism.languages[props.language] || Prism.languages.javascript
    return Prism.highlight(line, lang, props.language)
  } catch {
    return line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}
</script>

<style scoped>
/* ══════ Body ══════ */
.acb-body {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

/* ══ 光晕叠加 ══ */
.acb-blur-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: overlay;
  z-index: 1;
  background: var(--acb-blur-color, var(--acb-accent));
}

/* ══ 进度条 ══ */
.acb-progress-track {
  height: 2px;
  width: 100%;
  background: rgba(255,255,255,0.1);
  flex-shrink: 0;
}

.acb-progress-bar {
  height: 100%;
  background: var(--acb-accent);
  transition: width 0.1s linear;
}

/* ══ 代码容器 ══ */
.acb-code-container {
  position: relative;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* ══ 边缘渐变遮罩 ══ */
.acb-fade-left,
.acb-fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 48px;
  pointer-events: none;
  z-index: 10;
  opacity: 0.5;
}

.acb-fade-left {
  left: 0;
  background: linear-gradient(to right, var(--acb-fade-left, rgba(24,24,27,0.8)) 10%, transparent);
}

.acb-fade-right {
  right: 0;
  background: linear-gradient(to left, var(--acb-fade-right, var(--acb-fade-left)) 10%, transparent);
}

/* ══ 滚动区 ══ */
.acb-scroll {
  height: 100%;
  overflow: auto;
}

.acb-scroll-inner {
  display: flex;
  min-width: 100%;
  height: 100%;
}

/* ══ 行号列 ══ */
.acb-ln-col {
  padding: 16px 12px;
  text-align: right;
  user-select: none;
  border-right: 1px solid rgba(128,128,128,0.2);
  flex-shrink: 0;
  position: sticky;
  left: 0;
  z-index: 10;
  height: 100%;
  background: var(--acb-solid-bg, var(--acb-bg));
}

.acb-ln-item {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
  color: var(--acb-line-num);
  font-family: inherit;
}

/* ══ 代码列 ══ */
.acb-code-col {
  position: relative;
  flex: 1;
  padding: 16px 0;
}

/* 高亮行 */
.acb-hl-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 24px;
  background: var(--acb-hl-bg, rgba(255,255,255,0.05));
  pointer-events: none;
  z-index: 0;
}

/* 代码内容 */
.acb-code-content {
  position: relative;
  z-index: 1;
  padding: 0 16px;
  font-size: 14px;
  font-family: inherit;
  line-height: 24px;
}

.acb-code-row {
  height: 24px;
  white-space: pre;
  font-family: inherit;
}

.acb-full-code {
  white-space: pre;
  font-family: inherit;
}

/* ══ 光标 ══ */
.acb-cursor {
  display: inline-block;
  width: 8px;
  height: 20px;
  margin-bottom: -2px;
  background: var(--acb-accent-text);
  animation: cursor-blink 0.8s ease-in-out infinite;
  vertical-align: text-bottom;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
