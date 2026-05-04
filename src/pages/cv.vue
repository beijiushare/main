<template>
  <div class="cv-wrapper">
    <div class="cv-container">
      <CvToolbar />
      <CvContent />
    </div>
  </div>
</template>

<script setup>
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

@media (max-width: 768px) {
  .cv-wrapper {
    padding: 16px 0;
  }
  .cv-container {
    width: 95%;
  }
}

@media print {
  .cv-wrapper {
    padding: 0;
    display: block;
  }
  .cv-container {
    width: 100%;
  }
}
</style>
