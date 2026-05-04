<template>
  <div class="page">
    <div class="backimg-wrapper"><IndexBackimg /></div>
    <div class="overlay">
      <h1 class="title">Beijiu</h1>
      <IndexDesktopLinks />
    </div>
  </div>
  <div class="mobile-page">
    <div class="mobile-overlay">
      <h1 class="title">Beijiu</h1>
      <IndexMobileLinks />
    </div>
  </div>
</template>

<script setup></script>

<style>
html,
body {
  margin: 0;
}
</style>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.overlay {
  position: relative;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.title {
  font-size: 80px;
  font-weight: 700;
  color: #1d1d1d;
  text-shadow: 0 2px 20px rgba(77, 57, 3, 0.29);
  margin: 0;
  letter-spacing: 8px;
  user-select: none;
}

.mobile-page {
  display: none;
}

.mobile-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
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
  .title {
    font-size: 40px;
  }
}
</style>
