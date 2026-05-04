<template>
  <div class="cv-toolbar">
    <NuxtLink to="/" class="toolbar-back">← 返回首页</NuxtLink>
    <button class="toolbar-print" @click="print">打印</button>
  </div>
</template>

<script setup>
function print() {
  const originTitle = document.title
  document.title = 'Beijiu_CV'
  window.print()
  document.title = originTitle
}
</script>

<style scoped>
.cv-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 24px;
}

.toolbar-back {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.toolbar-back:hover {
  color: #000;
}

.toolbar-print {
  background: none;
  border: none;
  font-size: 14px;
  color: #444;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-print:hover {
  border-color: #999;
  background: #f5f5f5;
}

@media print {
  .cv-toolbar {
    display: none;
  }
}

@media (max-width: 768px) {
  .toolbar-print {
    display: none;
  }
}
</style>
