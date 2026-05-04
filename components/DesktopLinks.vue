<template>
  <div class="links">
    <NuxtLink to="/cv" class="link">
      <IconCv />CV
    </NuxtLink>
    <a
      href="https://github.com/beijiushare"
      target="_blank"
      rel="noopener noreferrer"
      class="link"
    >
      <IconGithub />GitHub
    </a>
    <a
      href="https://baidu.com"
      target="_blank"
      rel="noopener noreferrer"
      class="link"
    >
      <IconWechat />微信公众号
    </a>
    <a
      href="https://blog.beijiu.top/"
      target="_blank"
      rel="noopener noreferrer"
      class="link"
    >
      <IconBlog />Blog
    </a>
    <a
      href="https://baidu.com"
      target="_blank"
      rel="noopener noreferrer"
      class="link"
    >
      测试3
    </a>
    <a
      href="https://baidu.com"
      target="_blank"
      rel="noopener noreferrer"
      class="link"
    >
      测试4
    </a>
  </div>
</template>

<script setup>
import IconCv from '~/components/svg/IconCv.vue'
import IconGithub from '~/components/svg/IconGithub.vue'
import IconWechat from '~/components/svg/IconWechat.vue'
import IconBlog from '~/components/svg/IconBlog.vue'
</script>

<style scoped>
.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0px;
  max-width: 600px;
}

.link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  padding: 12px 28px;
  border-radius: 0px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #444444;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.25s ease;
  user-select: none;
}

.link:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.link-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin-right: 6px;
}
</style>
