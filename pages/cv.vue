<template>
  <div class="cv-page">
    <h1>Hello World</h1>
    <p>CV 页面开发中...</p>
    <NuxtLink to="/" class="back">← 返回首页</NuxtLink>
  </div>
</template>

<style scoped>
.cv-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: sans-serif;
}

.back {
  margin-top: 24px;
  color: #666;
  text-decoration: none;
}

.back:hover {
  color: #000;
}
</style>
