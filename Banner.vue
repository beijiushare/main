<template>
  <div
    ref="containerRef"
    class="banner-container"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-for="(layer, idx) in layers"
      :key="idx"
      class="banner-layer"
    >
      <video
        v-if="layer.resources[0] && isVideo(layer.resources[0].src)"
        :src="layer.resources[0].src"
        :ref="el => setLayerRef(idx, el)"
        class="banner-resource"
        muted
        loop
        autoplay
        playsinline
        @loadedmetadata="handleLoad(idx, $event)"
      ></video>
      <img
        v-else-if="layer.resources[0]"
        :src="layer.resources[0].src"
        :ref="el => setLayerRef(idx, el)"
        class="banner-resource"
        @load="handleLoad(idx, $event)"
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref(null)
const layers = ref([])
const layerRefs = ref([])
const layerMetrics = ref([])
const normalizedDisplacementX = ref(0)
const lastRendered = ref(NaN)
const pointerAnchorX = ref(0)
const isActive = ref(false)
const containerHeight = ref(155)
const bannerHeightScale = ref(1)

let rafId = 0
let resetAnimRafId = 0

function isVideo(src) {
  return /\.(webm|mp4)$/i.test(src)
}

function setLayerRef(idx, el) {
  layerRefs.value[idx] = el
}

function handleLoad(idx, event) {
  const target = event.target
  const width = target.naturalWidth || target.videoWidth || 0
  const height = target.naturalHeight || target.videoHeight || 0
  layerMetrics.value[idx] = { width, height }
  applyLayerDimensions(idx)
  scheduleRender(true)
}

function applyLayerDimensions(idx) {
  const el = layerRefs.value[idx]
  const metrics = layerMetrics.value[idx]
  const layer = layers.value[idx]
  if (!el || !metrics || !layer) return

  const scale = layer.scale?.initial ?? 1
  const w = metrics.width * bannerHeightScale.value * scale
  const h = metrics.height * bannerHeightScale.value * scale
  el.style.width = `${w}px`
  el.style.height = `${h}px`
}

function handleMouseEnter(e) {
  isActive.value = true
  pointerAnchorX.value = e.clientX
  cancelAnimationFrame(rafId)
  cancelAnimationFrame(resetAnimRafId)
}

function handleMouseMove(e) {
  if (!containerRef.value) return
  if (!isActive.value) {
    isActive.value = true
    pointerAnchorX.value = e.clientX
  }
  normalizedDisplacementX.value = (e.clientX - pointerAnchorX.value) / containerRef.value.clientWidth
  scheduleRender()
}

function handleMouseLeave() {
  startResetAnimation()
}

function handleResize() {
  if (!containerRef.value) return
  containerHeight.value = containerRef.value.clientHeight || 155
  bannerHeightScale.value = containerHeight.value / 155
  for (let i = 0; i < layerRefs.value.length; i++) {
    applyLayerDimensions(i)
  }
  scheduleRender(true)
}

function startResetAnimation() {
  isActive.value = false
  pointerAnchorX.value = 0
  cancelAnimationFrame(rafId)
  cancelAnimationFrame(resetAnimRafId)

  const start = normalizedDisplacementX.value
  if (Math.abs(start) < 0.0001) {
    normalizedDisplacementX.value = 0
    scheduleRender(true)
    return
  }

  const startTime = performance.now()
  const duration = 200

  function animate(now) {
    const elapsed = now - startTime
    if (elapsed < duration) {
      normalizedDisplacementX.value = start * (1 - elapsed / duration)
      renderFrame()
      resetAnimRafId = requestAnimationFrame(animate)
    } else {
      normalizedDisplacementX.value = 0
      lastRendered.value = NaN
      renderFrame()
      resetAnimRafId = 0
    }
  }

  resetAnimRafId = requestAnimationFrame(animate)
}

function scheduleRender(force = false) {
  cancelAnimationFrame(rafId)
  if (force) lastRendered.value = NaN
  rafId = requestAnimationFrame(renderFrame)
}

function makeCurve(curve) {
  if (!curve) return x => x
  const bezierFn = cubicBezier(curve[0], curve[1], curve[2], curve[3])
  return x => (x > 0 ? bezierFn(x) : -bezierFn(-x))
}

function cubicBezier(mX1, mY1, mX2, mY2) {
  const samples = new Float32Array(11)
  for (let i = 0; i < 11; i++) {
    samples[i] = calcBezier(i / 10, mX1, mX2)
  }

  return function(x) {
    if (x === 0 || x === 1) return x
    let start = 0
    for (let i = 1; i < 11; i++) {
      if (samples[i] >= x) { start = (i - 1) / 10; break }
    }
    const guess = start + ((x - samples[Math.round(start * 10)]) / (samples[Math.round(start * 10) + 1] - samples[Math.round(start * 10)])) / 10
    return calcBezier(guess, mY1, mY2)
  }
}

function calcBezier(t, a1, a2) {
  return ((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t * t + 3 * a1 * t
}

function renderFrame() {
  if (lastRendered.value === normalizedDisplacementX.value) return
  lastRendered.value = normalizedDisplacementX.value

  const dx = normalizedDisplacementX.value

  for (let i = 0; i < layers.value.length; i++) {
    const el = layerRefs.value[i]
    const layer = layers.value[i]
    if (!el || !layer) continue

    const scaleCurve = makeCurve(layer.scale?.offsetCurve)
    const rotateCurve = makeCurve(layer.rotate?.offsetCurve)
    const translateCurve = makeCurve(layer.translate?.offsetCurve)
    const blurCurve = makeCurve(layer.blur?.offsetCurve)
    const opacityCurve = makeCurve(layer.opacity?.offsetCurve)

    const scaleInit = layer.scale?.initial ?? 1
    const scale = (layer.scale?.dynamic ?? 1) + (layer.scale?.offset ?? 0) * scaleCurve(dx)

    const rotate = (layer.rotate?.initial ?? 0) + (layer.rotate?.offset ?? 0) * rotateCurve(dx)

    const txInit = layer.translate?.initial?.[0] ?? 0
    const tyInit = layer.translate?.initial?.[1] ?? 0
    const txOffset = layer.translate?.offset?.[0] ?? 0
    const tyOffset = layer.translate?.offset?.[1] ?? 0
    const tx = (txInit + txOffset * translateCurve(dx)) * bannerHeightScale.value * scaleInit
    const ty = (tyInit + tyOffset * translateCurve(dx)) * bannerHeightScale.value * scaleInit

    el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotate}deg) scale(${scale})`

    if (layer.blur) {
      const blurVal = Math.max(0, (layer.blur.initial ?? 0) + (layer.blur.offset ?? 0) * blurCurve(dx))
      el.style.filter = blurVal < 0.0001 ? '' : `blur(${blurVal}px)`
    } else {
      el.style.filter = ''
    }

    if (layer.opacity) {
      const opInit = layer.opacity.initial ?? 1
      const opOffset = layer.opacity.offset ?? 0
      let opacity = opInit + opOffset * opacityCurve(dx)
      if (layer.opacity.wrap === 'clamp' || !layer.opacity.wrap) {
        opacity = Math.max(0, Math.min(1, opacity))
      }
      el.style.opacity = String(opacity)
    } else {
      el.style.opacity = ''
    }
  }
}

onMounted(async () => {
  try {
    const res = await fetch('/banner/data.json')
    const data = await res.json()
    if (data.type === 'multi-layer' && data.multiLayer?.version === 2) {
      layers.value = data.multiLayer.layers
      layerRefs.value = new Array(data.multiLayer.layers.length)
      layerMetrics.value = new Array(data.multiLayer.layers.length)
    }
  } catch (e) {
    console.error('Banner 加载失败:', e)
  }

  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  cancelAnimationFrame(resetAnimRafId)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.banner-container {
  position: relative;
  width: 100%;
  height: 155px;
  overflow: hidden;
  background: #e8f4fd;
  flex-shrink: 0;
}
.banner-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.banner-resource {
  position: absolute;
  object-fit: cover;
  will-change: transform, opacity, filter;
}
</style>
