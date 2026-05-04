<template>
  <div class="card">
    <div class="header">
      <div class="left">
        <div class="title">唯北有斗</div>
        <div class="subtitle">微信公众号：BeijiuX_blog</div>
      </div>
      <div class="right">
        <img v-if="qrDataUrl" :src="qrDataUrl" alt="微信公众号二维码" class="qrcode" />
      </div>
    </div>
    <p class="card-text">
      这是一段示例文字。暂时不知道写啥。Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt adipisci, cumque ea quae accusamus voluptatem, dolores, qui quasi odio ipsa natus. Dolor nihil eligendi eveniet facilis ratione blanditiis, possimus minus!
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'

const qrDataUrl = ref('')

onMounted(async () => {
  qrDataUrl.value = await QRCode.toDataURL('http://weixin.qq.com/r/mp/XBcLE5PE8s6Nrddw90JO', {
    width: 100,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  })
})
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #000000;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.left {
  flex: 1;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: #666;
}

.right {
  flex-shrink: 0;
  margin-left: 20px;
}

.qrcode {
  width: 80px;
  height: 80px;
  border-radius: 4px;
}

.card-text {
  margin: 0;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  text-align: justify;
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .right {
    margin-left: 0;
    margin-top: 16px;
  }

  .qrcode {
    width: 100px;
    height: 100px;
  }
}
</style>
