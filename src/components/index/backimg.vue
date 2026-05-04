<template>
  <div ref="containerRef" class="backimg-container">
    <div v-for="(layer, idx) in layers" :key="idx" class="backimg-layer">
      <video
        v-if="isVideo(layer.src)"
        :src="layer.src"
        :ref="el => setLayerRef(idx, el)"
        class="backimg-resource"
        muted
        loop
        autoplay
        playsinline
        @loadedmetadata="onLoad(idx)"
      ></video>
      <img
        v-else
        :src="layer.src"
        :ref="el => setLayerRef(idx, el)"
        class="backimg-resource"
        @load="onLoad(idx)"
      >
    </div>
  </div>
  <Loading v-if="!ready" />
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref(null)
const layers = ref([])
const layerRefs = ref([])

const mouseX = ref(0)
const mouseY = ref(0)
const containerW = ref(1920)
const containerH = ref(1080)
const loadedCount = ref(0)
const ready = ref(false)

let rafId = 0

function isVideo(src) {
  return /\.(webm|mp4)$/i.test(src)
}

function setLayerRef(idx, el) {
  layerRefs.value[idx] = el
}

function onLoad(idx) {
  const el = layerRefs.value[idx]
  if (!el) return
  const w = el.naturalWidth || el.videoWidth || 0
  const h = el.naturalHeight || el.videoHeight || 0
  if (w && h) {
    el.style.width = containerH.value * (w / h) + 'px'
    el.style.height = containerH.value + 'px'
    loadedCount.value++
    tryShow()
  }
}

function tryShow() {
  if (layers.value.length > 0 && loadedCount.value >= layers.value.length) {
    scheduleRender()
  }
}

function onMouseMove(e) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
  scheduleRender()
}

function handleResize() {
  if (!containerRef.value) return
  containerW.value = containerRef.value.clientWidth
  containerH.value = containerRef.value.clientHeight
  for (let i = 0; i < layerRefs.value.length; i++) {
    const el = layerRefs.value[i]
    if (!el) continue
    const w = el.naturalWidth || el.videoWidth || 0
    const h = el.naturalHeight || el.videoHeight || 0
    if (w && h) {
      el.style.width = containerH.value * (w / h) + 'px'
      el.style.height = containerH.value + 'px'
    }
  }
}

function scheduleRender() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(renderFrame)
}

function renderFrame() {
  const cw = containerW.value
  const ch = containerH.value
  const cx = cw / 2
  const cy = ch / 2

  const nx = Math.max(-1, Math.min(1, (mouseX.value - cx) / cx))
  const ny = Math.max(-1, Math.min(1, (mouseY.value - cy) / cy))
  const dist = Math.min(Math.sqrt(nx * nx + ny * ny), 1)
  const mouseAngle = Math.atan2(ny, nx)

  for (let i = 0; i < layers.value.length; i++) {
    const el = layerRefs.value[i]
    const layer = layers.value[i]
    if (!el || !layer) continue

    const angleRad = ((layer.angle || 0) * Math.PI) / 180
    const layerAngle = mouseAngle + angleRad

    const maxDist = layer.distance ?? 0
    const mvx = Math.cos(layerAngle) * dist * maxDist * cw / 2
    const mvy = Math.sin(layerAngle) * dist * maxDist * ch / 2

    const px = (layer.x || 0) * cw / 2
    const py = (layer.y || 0) * ch / 2

    const baseS = layer.scale ?? 1
    const zoomS = layer.zoom ?? baseS
    const s = baseS + (zoomS - baseS) * dist

    el.style.transform = `translate(${px + mvx}px, ${py + mvy}px) scale(${s})`
  }

  if (!ready.value) {
    ready.value = true
  }
}

onMounted(async () => {
  try {
    const res = await fetch('/backimg/data.json')
    const data = await res.json()
    if (data.type === 'multi-layer') {
      layers.value = data.multiLayer.layers
      layerRefs.value = new Array(data.multiLayer.layers.length)
    }
  } catch (e) {
    console.error('加载失败:', e)
  }
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style scoped>
.backimg-container {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #e8f4fd;
}
.backimg-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.backimg-resource {
  position: absolute;
  object-fit: cover;
  will-change: transform;
}
</style>
