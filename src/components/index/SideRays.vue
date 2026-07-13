<template>
  <div ref="containerRef" class="side-rays-container" :class="className" />
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Renderer, Program, Triangle, Mesh } from 'ogl'

const props = defineProps({
  speed: { type: Number, default: 2.5 },
  rayColor1: { type: String, default: '#EAB308' },
  rayColor2: { type: String, default: '#96c8ff' },
  intensity: { type: Number, default: 2 },
  spread: { type: Number, default: 2 },
  origin: {
    type: String,
    default: 'top-right',
    validator: v => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(v)
  },
  tilt: { type: Number, default: 0 },
  saturation: { type: Number, default: 1.5 },
  blend: { type: Number, default: 0.75 },
  falloff: { type: Number, default: 1.6 },
  opacity: { type: Number, default: 1.0 },
  className: { type: String, default: '' }
})

const containerRef = ref(null)

const hexToRgb = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1]
}

const originToFlip = origin => {
  switch (origin) {
    case 'top-left': return [1, 0]
    case 'bottom-right': return [0, 1]
    case 'bottom-left': return [1, 1]
    default: return [0, 0]
  }
}

// WebGL state
let renderer = null
let uniforms = null
let mesh = null
let animId = null
let observer = null
let isVisible = false
let resizeHandler = null
let containerEl = null

const vert = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`

const frag = `precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  return clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0) *
    clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
  if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad);
  float sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

  float halfSpread = iSpread * 0.275;
  vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
  vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

  vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
  vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);

  vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

  float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
  color.rgb *= brightness;

  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);

  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`

function initWebGL() {
  if (!containerEl) return

  renderer = new Renderer({
    dpr: Math.min(window.devicePixelRatio, 2),
    alpha: true
  })

  const gl = renderer.gl
  gl.canvas.style.width = '100%'
  gl.canvas.style.height = '100%'

  // Clear container and append canvas
  while (containerEl.firstChild) containerEl.removeChild(containerEl.firstChild)
  containerEl.appendChild(gl.canvas)

  const [flipX, flipY] = originToFlip(props.origin)
  uniforms = {
    iTime: { value: 0 },
    iResolution: { value: [1, 1] },
    iSpeed: { value: props.speed },
    iRayColor1: { value: hexToRgb(props.rayColor1) },
    iRayColor2: { value: hexToRgb(props.rayColor2) },
    iIntensity: { value: props.intensity },
    iSpread: { value: props.spread },
    iFlipX: { value: flipX },
    iFlipY: { value: flipY },
    iTilt: { value: props.tilt },
    iSaturation: { value: props.saturation },
    iBlend: { value: props.blend },
    iFalloff: { value: props.falloff },
    iOpacity: { value: props.opacity }
  }

  const geometry = new Triangle(gl)
  const program = new Program(gl, { vertex: vert, fragment: frag, uniforms })
  mesh = new Mesh(gl, { geometry, program })

  function updateSize() {
    if (!containerEl || !renderer) return
    renderer.dpr = Math.min(window.devicePixelRatio, 2)
    const { clientWidth: w, clientHeight: h } = containerEl
    renderer.setSize(w, h)
    if (uniforms) {
      uniforms.iResolution.value = [w * renderer.dpr, h * renderer.dpr]
    }
  }

  resizeHandler = updateSize
  window.addEventListener('resize', updateSize)
  updateSize()

  function loop(t) {
    if (!renderer || !uniforms || !mesh) return
    uniforms.iTime.value = t * 0.001
    try {
      renderer.render({ scene: mesh })
      animId = requestAnimationFrame(loop)
    } catch (e) {
      // silently stop
    }
  }

  animId = requestAnimationFrame(loop)
}

function cleanup() {
  if (animId) {
    cancelAnimationFrame(animId)
    animId = null
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  if (renderer) {
    try {
      const loseCtx = renderer.gl.getExtension('WEBGL_lose_context')
      if (loseCtx) loseCtx.loseContext()
      const canvas = renderer.gl.canvas
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
    } catch (e) { /* ignore */ }
    renderer = null
    uniforms = null
    mesh = null
  }
}

// Observe visibility
onMounted(() => {
  containerEl = containerRef.value
  if (!containerEl) return

  observer = new IntersectionObserver(
    entries => {
      const entry = entries[0]
      isVisible = entry.isIntersecting
      if (isVisible) {
        initWebGL()
      } else {
        cleanup()
      }
    },
    { threshold: 0.1 }
  )

  observer.observe(containerEl)
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  cleanup()
  containerEl = null
})

// Watch for prop changes
watch(
  () => [props.speed, props.rayColor1, props.rayColor2, props.intensity, props.spread, props.origin, props.tilt, props.saturation, props.blend, props.falloff, props.opacity],
  () => {
    if (!uniforms) return
    const u = uniforms
    u.iSpeed.value = props.speed
    u.iRayColor1.value = hexToRgb(props.rayColor1)
    u.iRayColor2.value = hexToRgb(props.rayColor2)
    u.iIntensity.value = props.intensity
    u.iSpread.value = props.spread
    const [flipX, flipY] = originToFlip(props.origin)
    u.iFlipX.value = flipX
    u.iFlipY.value = flipY
    u.iTilt.value = props.tilt
    u.iSaturation.value = props.saturation
    u.iBlend.value = props.blend
    u.iFalloff.value = props.falloff
    u.iOpacity.value = props.opacity
  }
)
</script>

<style scoped>
.side-rays-container {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none;
  z-index: 3;
  overflow: hidden;
}
</style>
