<template>
  <div class="cv-content">
    <div class="cv-page">
      <header class="cv-header">
        <h1 class="cv-name">张三(排版测试数据)</h1>
        <p class="cv-title">高级前端工程师(2026-5-4更新)</p>
        <div class="cv-contact">
          <span>138-0000-0000</span>
          <span>zhangsan@email.com</span>
          <span>github.com/zhangsan</span>
          <span>北京 · 5年经验</span>
        </div>
      </header>

      <section class="cv-section">
        <h2 class="section-title">个人简介</h2>
        <p class="section-body">
          拥有5年前端开发经验，专注于 Vue.js
          生态与性能优化。具备大型企业级项目架构设计能力，
          善于团队协作与技术分享。热衷于探索前沿技术并落地到实际项目中。
        </p>
      </section>

      <section class="cv-section">
        <h2 class="section-title">工作经历</h2>

        <div class="cv-entry">
          <div class="entry-header">
            <span class="entry-title">高级前端工程师</span>
            <span class="entry-org">ABC科技有限公司</span>
            <span class="entry-date">2022.06 - 至今</span>
          </div>
          <ul class="entry-details">
            <li>
              主导公司核心产品前端架构重构，将工程从 jQuery 迁移至 Vue 3 +
              TypeScript，首屏加载性能提升 45%
            </li>
            <li>
              设计并实现组件库 Coco UI，覆盖 60+ 业务组件，被 3 个团队复用
            </li>
            <li>
              搭建前端监控体系，通过性能埋点、错误追踪等手段将线上问题发现时间缩短
              80%
            </li>
            <li>
              推动前端代码规范与 CI/CD 流程建设，团队代码 Review 通过率提升至
              95%
            </li>
          </ul>
        </div>

        <div class="cv-entry">
          <div class="entry-header">
            <span class="entry-title">前端工程师</span>
            <span class="entry-org">XYZ信息技术有限公司</span>
            <span class="entry-date">2020.03 - 2022.05</span>
          </div>
          <ul class="entry-details">
            <li>
              负责企业级 SaaS 平台的 Web 端开发，基于 Vue 2 + Element UI 完成
              20+ 业务模块
            </li>
            <li>
              开发可视化表单构建器，支持拖拽配置，上线后表单搭建效率提升 60%
            </li>
            <li>
              优化大数据量表格渲染性能，采用虚拟滚动方案处理 10 万+ 数据行
            </li>
          </ul>
        </div>
      </section>

      <section class="cv-section">
        <h2 class="section-title">教育背景</h2>
        <div class="cv-entry">
          <div class="entry-header">
            <span class="entry-title">计算机科学与技术 本科</span>
            <span class="entry-org">北京理工大学</span>
            <span class="entry-date">2016.09 - 2020.06</span>
          </div>
          <ul class="entry-details">
            <li>GPA 3.7/4.0，专业排名前 10%</li>
            <li>校级优秀毕业生，两次获国家励志奖学金</li>
          </ul>
        </div>
      </section>
    </div>
    <div class="cv-page">
      <section class="cv-section">
        <h2 class="section-title">专业技能</h2>
        <div class="skills-grid">
          <span class="skill-tag">Vue 2/3</span>
          <span class="skill-tag">React</span>
          <span class="skill-tag">TypeScript</span>
          <span class="skill-tag">JavaScript</span>
          <span class="skill-tag">Node.js</span>
          <span class="skill-tag">Webpack / Vite</span>
          <span class="skill-tag">CSS / SCSS</span>
          <span class="skill-tag">Tailwind CSS</span>
          <span class="skill-tag">Git / CI</span>
          <span class="skill-tag">Docker</span>
        </div>
      </section>

      <section class="cv-section">
        <h2 class="section-title">项目经验</h2>

        <div class="cv-entry">
          <div class="entry-header">
            <span class="entry-title">企业级低代码平台</span>
            <span class="entry-date">2023.01 - 2024.03</span>
          </div>
          <ul class="entry-details">
            <li>作为前端负责人，主导核心架构设计与开发，团队 6 人</li>
            <li>基于 Vue 3 + Vite + Pinia 构建，支持可视化拖拽生成业务页面</li>
            <li>设计插件化架构，支持第三方扩展组件接入</li>
          </ul>
        </div>

        <div class="cv-entry">
          <div class="entry-header">
            <span class="entry-title">数据可视化大屏系统</span>
            <span class="entry-date">2021.06 - 2022.01</span>
          </div>
          <ul class="entry-details">
            <li>基于 ECharts + Vue 实现实时数据大屏展示，支持多主题切换</li>
            <li>通过 WebSocket 实现毫秒级数据推送与更新</li>
            <li>支持屏幕自适应，兼容 4K 及以下分辨率</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.cv-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: "Times New Roman", "宋体", serif;
}

.cv-page {
  background: #fff;
  color: #333;
  font-size: 14px;
  line-height: 1.6;
  padding: 40px 48px 0;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  aspect-ratio: 210 / 297;
  overflow: hidden;
}

.cv-page:last-child {
  margin-bottom: 0;
}

.cv-header {
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 2px solid #222;
  margin-bottom: 24px;
}

.cv-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 4px;
  letter-spacing: 4px;
}

.cv-title {
  font-size: 16px;
  color: #666;
  margin: 0 0 12px;
}

.cv-contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;
  font-size: 13px;
  color: #555;
}

.cv-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #222;
  margin: 0 0 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid #ddd;
}

.section-body {
  margin: 0;
  text-align: justify;
}

.cv-entry {
  margin-bottom: 16px;
}

.cv-entry:last-child {
  margin-bottom: 0;
}

.entry-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
  margin-bottom: 6px;
}

.entry-title {
  font-weight: 600;
  font-size: 14px;
}

.entry-org {
  color: #555;
  font-size: 13px;
}

.entry-date {
  margin-left: auto;
  font-size: 13px;
  color: #888;
  white-space: nowrap;
}

.entry-details {
  margin: 0;
  padding-left: 18px;
}

.entry-details li {
  margin-bottom: 4px;
  text-align: justify;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 13px;
  color: #444;
}

@media print {
  .cv-content {
    gap: 0;
  }
  .cv-page {
    padding: 40px 48px 20px;
    box-shadow: none;
    border-radius: 0;
    aspect-ratio: auto;
    overflow: visible;
    page-break-after: always;
  }
  .cv-page:last-child {
    page-break-after: auto;
  }
}

@media (max-width: 768px) {
  .cv-content {
    padding: 24px 20px;
  }
  .cv-name {
    font-size: 22px;
  }
  .entry-date {
    margin-left: 0;
    width: 100%;
  }
}
</style>
