<template>
  <!-- 桌面端 -->
  <div class="page">
    <div class="backdrop">
      <SideRays
        :speed="2.5"
        ray-color1="#EAB308"
        ray-color2="#96c8ff"
        :intensity="2.8"
        :spread="2"
        origin="top-right"
        :tilt="0"
        :saturation="1.5"
        :blend="0.75"
        :falloff="1.6"
        :opacity="1.0"
      />
    </div>
    <div class="foreground">
      <div class="top-section">
        <div class="header-bar">
          <div class="identity-zone">
            <h1 class="title">
              <ShinyText
                text="✨BEIJIU.TOP"
                :speed="3"
                color="rgba(210,210,210,0.6)"
                shine-color="#ffffff"
                :spread="150"
                direction="left"
              />
            </h1>
          </div>
          <div class="utility-zone">
            <!-- 待设计 -->
          </div>
        </div>
        <div class="top-spacer">
          <!-- 占位 -->
        </div>
      </div>
      <div class="body-zone">
        <div class="body-left">
          <AnimatedCodeBlock
            :code="demoCode"
            theme="terminal"
            title="fetch-data.jsx"
            :typing-speed="50"
            :show-line-numbers="true"
            :auto-play="true"
            :loop="true"
            language="typescript"
            :highlight-lines="[1, 4, 10]"
            class="code-block-left"
          />
        </div>
        <div class="body-right">
          <!-- 待设计 -->
        </div>
      </div>
    </div>
  </div>

  <!-- 移动端（保持原样） -->
  <div class="mobile-page">
    <div class="mobile-hint">请转至桌面端获取更佳体验</div>
    <div class="mobile-overlay">
      <h1 class="mobile-title">Beijiu</h1>
      <IndexMobileLinks />
    </div>
  </div>
</template>

<script setup>
import SideRays from '~/components/index/SideRays.vue'
import ShinyText from '~/components/index/ShinyText.vue'
import IndexMobileLinks from '~/components/index/MobileLinks.vue'
import AnimatedCodeBlock from '~/components/index/AnimatedCodeBlock.vue'

const demoCode = `import { useState, useEffect } from 'react';

function useDataFetching(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}`

useHead({
  style: [
    { children: `@font-face{font-family:"ZSFT-342";src:url("https://fontsapi.zeoseven.com/342/main.woff2") format("woff2");font-style:normal;font-weight:400;font-display:swap;}` },
  ],
})
</script>

<style>
html,
body {
  margin: 0;
  font-family: 'ZSFT-342', sans-serif;
  font-weight: normal;
}
</style>

<style scoped>
/* ===== 桌面端 ===== */
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 1;
  background: #0a0a14;
}

.foreground {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 上段 1/3 */
.top-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid rgba(255,255,255,0.15);
}

.header-bar {
  flex: 3;
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(255,255,255,0.3);
}

.top-spacer {
  flex: 1;
  border: 1px solid rgba(255,255,255,0.1);
}

.identity-zone {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 2px;
  border: 1px solid rgba(255,255,255,0.15);
}

.utility-zone {
  flex: 1;
  border: 1px solid rgba(255,255,255,0.15);
}

.title {
  margin: 0;
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 800;
  letter-spacing: 4px;
  font-family: 'ZSFT-342', 'Segoe UI', system-ui, -apple-system, sans-serif;
  user-select: none;
}

/* 下段 2/3，左右 6:5 */
.body-zone {
  flex: 2;
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(255,255,255,0.3);
}

.body-left {
  flex: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.15);
}

.code-block-left {
  width: 100%;
  max-width: 560px;
}

.body-right {
  flex: 5;
  border: 1px solid rgba(255,255,255,0.15);
}

/* ===== 移动端（原样） ===== */
.mobile-page {
  display: none;
}

.mobile-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.mobile-title {
  font-size: 80px;
  font-weight: 1000;
  font-family: serif;
  color: #2D3A4A;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.6);
  margin: 0;
  letter-spacing: 8px;
  user-select: none;
}

.mobile-hint {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #333333c5;
  color: #fff;
  text-align: center;
  padding: 12px;
  font-size: 14px;
  z-index: 100;
}

@media (max-width: 768px) {
  .page {
    display: none;
  }
  .mobile-page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .mobile-title {
    font-size: 40px;
  }
}
</style>
