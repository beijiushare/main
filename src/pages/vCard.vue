<template>
  <div class="page-wrapper">
    <div class="page-container">
      <div class="toolbar">
        <NuxtLink to="/" class="back-link">← 返回首页</NuxtLink>
        <button class="lang-toggle" @click="toggleLang">{{ isZh ? 'EN' : '中' }}</button>
        <button class="save-btn" @click="saveAsImage">保存</button>
      </div>
      <div class="card-wrapper" ref="cardWrapperRef">
        <VCardContent ref="vCardContentRef" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2canvas from 'html2canvas'

const cardWrapperRef = ref(null)
const vCardContentRef = ref(null)
const isZh = ref(true)

function toggleLang() {
  isZh.value = !isZh.value
  if (vCardContentRef.value) {
    vCardContentRef.value.isZh = isZh.value
  }
}

async function saveAsImage() {
  if (!cardWrapperRef.value) return
  const el = cardWrapperRef.value
  const canvas = await html2canvas(el, {
    scale: 3,
    useCORS: true,
    backgroundColor: '#f5f5f5',
    onclone: (clonedDoc) => {
      const wrapper = clonedDoc.querySelector('.card-wrapper')
      if (wrapper) {
        wrapper.style.padding = '16px'
        wrapper.style.background = '#f5f5f5'
      }
      const grid = clonedDoc.querySelector('.grid-layout')
      if (grid) {
        grid.style.height = 'auto'
        grid.style.marginTop = '-8px'
        grid.style.marginBottom = '-9px'
      }
      const qrcodeGrid = clonedDoc.querySelector('.qrcode-grid')
      if (qrcodeGrid) {
        qrcodeGrid.style.marginLeft = '0px'
      }
      const name = clonedDoc.querySelector('.name')
      if (name) {
        name.style.marginBottom = '0px'
      }
      const bio = clonedDoc.querySelector('.bio')
      if (bio) {
        bio.style.marginBottom = '0px'
      }
      const qrcodeSection = clonedDoc.querySelector('.qrcode-section')
      if (qrcodeSection) {
        qrcodeSection.style.marginLeft = '-16px'
      }
    }
  })
  const link = document.createElement('a')
  link.download = 'Beijiu_vCard.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}
</style>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.page-container {
  display: grid;
  width: 500px;
}

.back-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.back-link:hover {
  color: #000;
}

.toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  margin-left: 12px;
  margin-right: 12px;
}

.save-btn {
  background: none;
  border: none;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

.save-btn:hover {
  color: #000;
}

.lang-toggle {
  background: none;
  border: none;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.lang-toggle:hover {
  border-color: #999;
  color: #333;
}

@media (max-width: 768px) {
  .page-container {
    width: 95%;
  }
}
</style>
