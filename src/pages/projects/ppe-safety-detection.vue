<template>
  <div class="page">
    <div class="content">
      <h1 class="title">PPE安全视觉检测</h1>
      <p class="status">页面开发中</p>
      <button class="btn" @click="goHome">关于作者</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8f4fd;
}

.content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.title {
  font-size: 48px;
  font-weight: 700;
  color: #2D3A4A;
  margin: 0;
}

.status {
  font-size: 24px;
  color: #666;
  margin: 0;
}

.btn {
  padding: 12px 32px;
  font-size: 18px;
  background: #61E8EA;
  border: none;
  border-radius: 8px;
  color: #180000;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn:hover {
  transform: scale(1.05);
}
</style>
