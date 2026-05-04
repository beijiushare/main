<template>
  <div class="card">
    <div class="grid-layout">
      <div class="content-section">
        <h1 class="name">{{ isZh ? '程欣' : 'Xin Cheng' }}</h1>
        <p class="bio" v-if="isZh">
          <span>一个意义的逃兵，一个</span><span class="small">没能</span><span>脱离低级趣味的人，喜欢折腾无用之物，热衷在“不是正事”的事情里找乐子。永远保持学习，永远拥抱变化，永远不放弃说“不”……</span>
        </p>
        <p class="bio" v-else>
          <span>A deserter of meaning, a person </span><span class="small">never</span><span> quite above vulgar tastes — who loves fiddling with useless things and finds joy in what is “not proper business.” Forever learning, forever embracing change, and forever refusing to give up saying “no”…</span>
        </p>
      </div>

      <div class="qrcode-section">
        <div class="qrcode-grid">
          <div class="qrcode-item" v-for="item in platformList" :key="item.name">
            <img v-if="item.qrDataUrl" :src="item.qrDataUrl" :alt="isZh ? item.name : item.nameEn" class="qrcode-img" />
            <div v-else class="qrcode-placeholder"></div>
            <span class="platform-name">{{ isZh ? item.name : item.nameEn }}</span>
          </div>
        </div>
      </div>

      <div class="decoration-section">
        <div class="shape-bg"></div>
        <div class="shape shape-offset"></div>
        <div class="shape"></div>
        <IconProfile :size="128" color="white" />
        <div class="shape-gray"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'
import IconProfile from '~/components/svg/IconProfile.vue'

const isZh = ref(true)

const platformList = ref([
  { name: '个人主页', nameEn: 'Homepage', url: 'https://www.beijiu.top/', qrDataUrl: '' },
  { name: 'GitHub', nameEn: 'GitHub', url: 'https://github.com/beijiushare', qrDataUrl: '' },
  { name: '邮箱', nameEn: 'Email', url: 'beijiushare@foxmail.com 或 beijiushare@outlook.com', qrDataUrl: '' },
  { name: 'B站', nameEn: 'Bilibili', url: 'https://space.bilibili.com/3494379710842912', qrDataUrl: '' },
  { name: '微信公众号', nameEn: 'WeChatPublic', url: 'http://weixin.qq.com/r/mp/XBcLE5PE8s6Nrddw90JO', qrDataUrl: '' },
])

onMounted(async () => {
  for (const item of platformList.value) {
    item.qrDataUrl = await QRCode.toDataURL(item.url, {
      width: 72,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
  }
})

defineExpose({ isZh })
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  padding-top: 12px;
  padding-bottom: 1px;
  padding-left: 28px;
  padding-right: 10px;
  border: 1px solid #000000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  height: auto;
  min-height: 320px;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 0.5fr 0.7fr repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 338px;
  margin-top: -8px;
  margin-bottom: -9px;
}

.content-section {
  grid-area: 2 / 1 / 4 / 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  height: 119px;
  width: 296px;
}

.name {
  margin: 0;
  margin-bottom: -15px;
  font-size: 32px;
  font-weight: 700;
  color: #1d1d1d;
}

.bio {
  margin: 0;
  margin-bottom: -4px;
  font-size: 14px;
  line-height: 1.8;
  color: #555;
}

.bio .small {
  font-size: 8px;
}

.qrcode-section {
  grid-area: 4 / 1 / 6 / 6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 0px;
  margin: 0px 0px;
  height: 137px;
}

.qrcode-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 500px;
  margin-top: 33px;
  margin-right: 0px;
  margin-left: -14px;
}

.qrcode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.qrcode-img {
  width: 72px;
  height: 72px;
  border-radius: 8px;
}

.qrcode-placeholder {
  width: 72px;
  height: 72px;
  background: #f5f5f5;
  border-radius: 8px;
}

.platform-name {
  font-size: 12px;
  color: #666;
}

.decoration-section {
  grid-area: 1 / 4 / 4 / 6;
  position: relative;
  display: flex;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 0px;
  width: 166px;
}

.shape {
  border-radius: 33% 67% 70% 30% / 30% 30% 70% 70%;
  background: linear-gradient(135deg, #8ed2fc9f, #c1afd2d5,#f78da877);
  position: absolute;
  width: 162px;
  height: 177px;
  margin-right: -5px;
  margin-left: -5px;
  margin-top: 0px;
  margin-bottom: 0px;
  z-index: 1;
}

.shape-offset {
  border-radius: 33% 67% 70% 30% / 30% 30% 70% 70%;
  background: #ccc;
  position: absolute;
  width: 80%;
  height: 80%;
  max-width: 200px;
  max-height: 200px;
  z-index: -1;
  top: 5px;
  left: 5px;
}

.shape-gray {
  border-radius: 33% 67% 70% 30% / 30% 30% 70% 70%;
  background: #4d4d4d22;
  position: absolute;
  width: 162px;
  height: 177px;
  z-index: 0;
  transform: rotate(25deg);
  top: 10px;
  left: -5px;
}

@media (max-width: 768px) {
  .card {
    transform: rotate(90deg);
    min-height: auto;
    margin-top: 15px;
  }
}
</style>
