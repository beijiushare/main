<template>
  <span
    v-if="!disabled"
    ref="elRef"
    class="shiny-text"
    :class="className"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >{{ text }}</span>
  <span v-else class="shiny-text" :class="className" :style="{ color }">{{ text }}</span>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  speed: { type: Number, default: 2 },
  className: { type: String, default: '' },
  color: { type: String, default: '#b5b5b5' },
  shineColor: { type: String, default: '#ffffff' },
  spread: { type: Number, default: 120 },
  yoyo: { type: Boolean, default: false },
  pauseOnHover: { type: Boolean, default: false },
  direction: { type: String, default: 'left', validator: v => ['left', 'right'].includes(v) },
  delay: { type: Number, default: 0 }
})

const elRef = ref(null)
const isPaused = ref(false)

let animId = null
let startTime = null

function applyStyle(p) {
  const el = elRef.value
  if (!el) return

  const bgPct = props.direction === 'left' ? p : 100 - p
  const bgPos = `${150 - bgPct * 2}% center`

  el.style.cssText = `
    display: inline-block;
    background-image: linear-gradient(${props.spread}deg, ${props.color} 0%, ${props.color} 35%, ${props.shineColor} 50%, ${props.color} 65%, ${props.color} 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position: ${bgPos};
  `
}

function animate(timestamp) {
  if (isPaused.value) {
    applyStyle(0)
    animId = requestAnimationFrame(animate)
    return
  }

  if (startTime === null) startTime = timestamp
  const elapsed = timestamp - startTime

  const animDuration = props.speed * 1000
  const delayDuration = props.delay * 1000
  let p

  if (props.yoyo) {
    const cycleDuration = animDuration + delayDuration
    const fullCycle = cycleDuration * 2
    const cycleTime = elapsed % fullCycle

    if (cycleTime < animDuration) {
      p = (cycleTime / animDuration) * 100
    } else if (cycleTime < cycleDuration) {
      p = 100
    } else if (cycleTime < cycleDuration + animDuration) {
      p = 100 - ((cycleTime - cycleDuration) / animDuration) * 100
    } else {
      p = 0
    }
  } else {
    const cycleDuration = animDuration + delayDuration
    const cycleTime = elapsed % cycleDuration

    if (cycleTime < animDuration) {
      p = (cycleTime / animDuration) * 100
    } else {
      p = 100
    }
  }

  applyStyle(p)
  animId = requestAnimationFrame(animate)
}

onMounted(() => {
  applyStyle(0)
  animId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (animId) cancelAnimationFrame(animId)
})

function onMouseEnter() {
  if (props.pauseOnHover) isPaused.value = true
}

function onMouseLeave() {
  if (props.pauseOnHover) isPaused.value = false
}
</script>

<style scoped>
.shiny-text {
  display: inline-block;
}
</style>
