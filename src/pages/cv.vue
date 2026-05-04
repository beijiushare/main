<template>
  <div class="cv-wrapper">
    <div v-if="isMobile" class="mobile-overlay"></div>
    <div class="cv-container">
      <CvToolbar />
      <CvContent />
    </div>
    <div v-if="isMobile" class="mobile-warning">
      <p>页面不适合小屏，请转至桌面端查看</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth < 768
})
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}

@media print {
  @page {
    margin: 0;
  }

  html,
  body {
    background: #fff;
    margin: 0;
    padding: 0;
  }

  body * {
    visibility: hidden;
  }

  .cv-content,
  .cv-content * {
    visibility: visible;
  }
}
</style>

<style scoped>
.cv-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  box-sizing: border-box;
}

.cv-container {
  width: 60%;
  max-width: 900px;
  min-width: 0;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.336);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 998;
}

.mobile-warning {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 999;
}

@media print {
  .cv-wrapper {
    padding: 0;
    display: block;
  }
  .cv-container {
    width: 100%;
  }
  .mobile-warning {
    display: none;
  }
}
</style>
