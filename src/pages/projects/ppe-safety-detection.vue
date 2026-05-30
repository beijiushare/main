<template>
  <div class="page">
    <div class="hero">
      <div class="hero-bg">
        <div class="hero-glow"></div>
      </div>
      <div class="hero-body">
        <div class="hero-tags">
          <span class="tag">v1.2.2</span>
          <span class="tag tag-flutter">Flutter 3.11</span>
          <span class="tag tag-yoloe">YOLOE-v8S</span>
        </div>
        <h1 class="hero-title">PPE合规通</h1>
        <p class="hero-sub">移动端安全检测应用，基于 YOLOE-v8S 轻量化</p>
      </div>
    </div>

    <div class="body-wrap">
      <section class="card">
        <h2 class="card-title">项目概述</h2>
        <p class="card-text">
          专为建筑工地、工业厂区等场景设计。通过手机摄像头实时检测人员安全防护装备的穿戴情况，违规时自动告警与截图取证。模型完全本地部署，无需网络连接。
        </p>
      </section>

      <section class="card">
        <h2 class="card-title">核心功能</h2>
        <div class="grid-3">
          <div class="func-item">
            <div class="func-icon func-icon-cam">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
            <span class="func-label">实时检测</span>
          </div>
          <div class="func-item">
            <div class="func-icon func-icon-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            </div>
            <span class="func-label">十类识别</span>
          </div>
          <div class="func-item">
            <div class="func-icon func-icon-alert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <span class="func-label">违规告警</span>
          </div>
          <div class="func-item">
            <div class="func-icon func-icon-cap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <span class="func-label">自动截图</span>
          </div>
          <div class="func-item">
            <div class="func-icon func-icon-data">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
            </div>
            <span class="func-label">数据看板</span>
          </div>
          <div class="func-item">
            <div class="func-icon func-icon-off">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
            </div>
            <span class="func-label">离线运行</span>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="card-title">检测类别</h2>
        <div class="class-grid">
          <div class="cls cls-safe">
            <div class="cls-badge cls-badge-safe">合规</div>
            <span class="cls-name">安全帽</span>
          </div>
          <div class="cls cls-violation">
            <div class="cls-badge cls-badge-vio">违规</div>
            <span class="cls-name">无安全帽</span>
          </div>
          <div class="cls cls-safe">
            <div class="cls-badge cls-badge-safe">合规</div>
            <span class="cls-name">口罩</span>
          </div>
          <div class="cls cls-violation">
            <div class="cls-badge cls-badge-vio">违规</div>
            <span class="cls-name">无口罩</span>
          </div>
          <div class="cls cls-safe">
            <div class="cls-badge cls-badge-safe">合规</div>
            <span class="cls-name">反光背心</span>
          </div>
          <div class="cls cls-violation">
            <div class="cls-badge cls-badge-vio">违规</div>
            <span class="cls-name">无反光背心</span>
          </div>
          <div class="cls cls-neutral">
            <div class="cls-badge cls-badge-nl">中性</div>
            <span class="cls-name">人</span>
          </div>
          <div class="cls cls-neutral">
            <div class="cls-badge cls-badge-nl">中性</div>
            <span class="cls-name">安全锥</span>
          </div>
          <div class="cls cls-neutral">
            <div class="cls-badge cls-badge-nl">中性</div>
            <span class="cls-name">工程机械</span>
          </div>
          <div class="cls cls-neutral">
            <div class="cls-badge cls-badge-nl">中性</div>
            <span class="cls-name">车辆</span>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="card-title">模型技术方案</h2>
        <div class="metric-grid">
          <div class="metric">
            <div class="metric-value">YOLOE-v8S</div>
            <div class="metric-label">模型架构</div>
          </div>
          <div class="metric">
            <div class="metric-value">TFLite f16</div>
            <div class="metric-label">推理引擎</div>
          </div>
          <div class="metric">
            <div class="metric-value">5.90 MB</div>
            <div class="metric-label">模型体积</div>
          </div>
          <div class="metric">
            <div class="metric-value">3.01M</div>
            <div class="metric-label">参数量</div>
          </div>
          <div class="metric">
            <div class="metric-value">8.2 G</div>
            <div class="metric-label">FLOPs</div>
          </div>
          <div class="metric">
            <div class="metric-value">640&times;640</div>
            <div class="metric-label">输入尺寸</div>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="card-title">性能表现</h2>
        <div class="perf-group">
          <div class="perf-item">
            <div class="perf-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div class="perf-body">
              <div class="perf-row">
                <span class="perf-label">PC（CPU）</span>
                <span class="perf-value">79.34 <small>ms/帧</small></span>
              </div>
              <div class="perf-row">
                <span class="perf-label">Android 移动端</span>
                <span class="perf-value">~100 <small>ms/帧</small></span>
              </div>
            </div>
          </div>
          <div class="perf-divider"></div>
          <div class="perf-item">
            <div class="perf-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
            </div>
            <div class="perf-body">
              <div class="perf-row">
                <span class="perf-label">操作系统</span>
                <span class="perf-value">Android 10+</span>
              </div>
              <div class="perf-row">
                <span class="perf-label">运行内存</span>
                <span class="perf-value">&ge;2 GB</span>
              </div>
              <div class="perf-row">
                <span class="perf-label">存储空间</span>
                <span class="perf-value">&ge;10 GB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="card-title">轻量化实现路径</h2>
        <div class="timeline">
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-body">
              <div class="tl-title">架构选型优化</div>
              <div class="tl-desc">采用 YOLOE-v8S 轻量化 CSPDarknet 骨干网络，从设计源头降低计算复杂度</div>
            </div>
          </div>
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-body">
              <div class="tl-title">Float16 量化压缩</div>
              <div class="tl-desc">模型权重从 float32 量化为 float16，体积减半，精度损失控制在 1-2%</div>
            </div>
          </div>
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-body">
              <div class="tl-title">场景专一化</div>
              <div class="tl-desc">仅训练 10 类 PPE 目标，分类头复杂度降低 87.5%</div>
            </div>
          </div>
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-body">
              <div class="tl-title">推理引擎优化</div>
              <div class="tl-desc">TensorFlow Lite 算子融合、内存优化、GPU/NPU 硬件加速</div>
            </div>
          </div>
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-body">
              <div class="tl-title">知识蒸馏</div>
              <div class="tl-desc">以 YOLOE-L 大模型为教师，检测精度提升 2-5 个百分点</div>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="card-title">应用架构</h2>
        <div class="arch">
          <div class="arch-row">
            <div class="arch-tag arch-tag-top">顶层</div>
            <div class="arch-layer">
              <span class="arch-name">UI 层</span>
              <span class="arch-detail">MainPage · MonitorPage · DataPage · AboutPage</span>
            </div>
          </div>
          <div class="arch-row">
            <div class="arch-tag">中间层</div>
            <div class="arch-layer">
              <span class="arch-name">组件层</span>
              <span class="arch-detail">Camera YUV · CustomPainter · SettingsSheet</span>
            </div>
          </div>
          <div class="arch-row">
            <div class="arch-tag">中间层</div>
            <div class="arch-layer">
              <span class="arch-name">推理层</span>
              <span class="arch-detail">TensorFlow Lite float16</span>
            </div>
          </div>
          <div class="arch-row">
            <div class="arch-tag arch-tag-bot">底层</div>
            <div class="arch-layer">
              <span class="arch-name">模型层</span>
              <span class="arch-detail">YOLOE-v8S（5.90 MB）</span>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="card-title">多架构打包</h2>
        <div class="chip-list">
          <div class="chip">
            <div class="chip-name">arm64-v8a</div>
            <div class="chip-desc">主流设备 · 性能最优</div>
          </div>
          <div class="chip">
            <div class="chip-name">armeabi-v7a</div>
            <div class="chip-desc">老旧设备 · 兼容性强</div>
          </div>
          <div class="chip">
            <div class="chip-name">Universal</div>
            <div class="chip-desc">全架构 · 兼容性最好</div>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="card-title">违规处理机制</h2>
        <img class="flow-img" src="/projects/yoloe_ppe_流程图.webp" alt="违规处理机制流程图">
      </section>

      <div class="footer">
        <button class="btn-back" @click="goHome">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          关于作者
        </button>
        <p class="footer-motto">PPE合规通 · 让安全防护检测更智能</p>
      </div>
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
/* ===== Reset ===== */
.page {
  min-height: 100vh;
  background: #f0f2f5;
  padding-bottom: 32px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ===== Hero ===== */
.hero {
  position: relative;
  padding: 48px 20px 40px;
  background: linear-gradient(160deg, #0b1628 0%, #142642 40%, #1a3050 100%);
  overflow: hidden;
  text-align: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  top: -60%;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(97,232,234,0.08) 0%, transparent 70%);
  border-radius: 50%;
}

.hero-body {
  position: relative;
  z-index: 1;
}

.hero-tags {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.tag {
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.06);
}

.tag-flutter {
  background: rgba(42,171,238,0.18);
  color: #6bc9f5;
  border-color: rgba(42,171,238,0.15);
}

.tag-yoloe {
  background: rgba(0,191,165,0.18);
  color: #5ddbc8;
  border-color: rgba(0,191,165,0.15);
}

.hero-title {
  font-size: 34px;
  font-weight: 800;
  color: #61E8EA;
  margin: 0 0 10px;
  letter-spacing: 3px;
}

.hero-sub {
  font-size: 14px;
  color: rgba(255,255,255,0.55);
  margin: 0;
  line-height: 1.5;
  max-width: 300px;
  margin: 0 auto;
}

/* ===== Body Wrap ===== */
.body-wrap {
  padding: 0 14px;
  margin-top: -16px;
  position: relative;
  z-index: 2;
}

/* ===== Card ===== */
.card {
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02);
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #0b1628;
  margin: 0 0 14px;
}

.card-text {
  font-size: 14px;
  line-height: 1.75;
  color: #555;
  margin: 0;
}

/* ===== Feature Grid ===== */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.func-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 4px;
  border-radius: 12px;
  background: #f7f9fc;
}

.func-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.func-icon svg {
  width: 100%;
  height: 100%;
}

.func-icon-cam { background: #dbf0ff; color: #1a8cff; }
.func-icon-tag { background: #e0f7fa; color: #00acc1; }
.func-icon-alert { background: #fff0e0; color: #ff6d00; }
.func-icon-cap { background: #e8f5e9; color: #43a047; }
.func-icon-data { background: #f3e5f5; color: #8e24aa; }
.func-icon-off { background: #e0e0e0; color: #616161; }

.func-label {
  font-size: 12px;
  font-weight: 600;
  color: #333;
}

/* ===== Class Grid ===== */
.class-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cls {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #f7f9fc;
}

.cls-safe { border-left: 3px solid #43a047; }
.cls-violation { border-left: 3px solid #e53935; }
.cls-neutral { border-left: 3px solid #1e88e5; }

.cls-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.cls-badge-safe { background: #e8f5e9; color: #2e7d32; }
.cls-badge-vio { background: #ffebee; color: #c62828; }
.cls-badge-nl { background: #e3f2fd; color: #1565c0; }

.cls-name {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

/* ===== Metric Grid ===== */
.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.metric {
  text-align: center;
  padding: 14px 6px;
  border-radius: 10px;
  background: #f7f9fc;
}

.metric-value {
  font-size: 15px;
  font-weight: 800;
  color: #0b1628;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 11px;
  color: #999;
  font-weight: 500;
}

/* ===== Performance ===== */
.perf-group {
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
}

.perf-item {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
}

.perf-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  padding: 8px;
  border-radius: 10px;
  background: #f0f4ff;
  color: #1a8cff;
}

.perf-icon svg {
  width: 100%;
  height: 100%;
}

.perf-body {
  flex: 1;
  min-width: 0;
}

.perf-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}

.perf-label {
  font-size: 13px;
  color: #666;
}

.perf-value {
  font-size: 14px;
  font-weight: 700;
  color: #0b1628;
  text-align: right;
}

.perf-value small {
  font-weight: 400;
  font-size: 11px;
  color: #999;
}

.perf-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 0 16px;
}

/* ===== Timeline ===== */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-left: 14px;
}

.tl-item {
  display: flex;
  gap: 14px;
  padding-bottom: 18px;
  position: relative;
}

.tl-item::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 16px;
  bottom: 0;
  width: 2px;
  background: #e8ecf0;
}

.tl-item:last-child::before {
  display: none;
}

.tl-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #61E8EA;
  flex-shrink: 0;
  margin-top: 3px;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 0 3px rgba(97,232,234,0.15);
}

.tl-body {
  flex: 1;
  min-width: 0;
}

.tl-title {
  font-size: 14px;
  font-weight: 600;
  color: #0b1628;
  margin-bottom: 2px;
}

.tl-desc {
  font-size: 13px;
  color: #888;
  line-height: 1.6;
}

/* ===== Architecture ===== */
.arch {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.arch-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.arch-tag {
  font-size: 10px;
  font-weight: 700;
  color: #999;
  writing-mode: vertical-lr;
  letter-spacing: 1px;
  padding: 6px 3px;
  border-radius: 4px;
  background: #f0f2f5;
  text-align: center;
  flex-shrink: 0;
}

.arch-tag-top {
  color: #1a8cff;
  background: #e8f0fe;
}

.arch-tag-bot {
  color: #43a047;
  background: #e8f5e9;
}

.arch-layer {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 8px;
  background: #f7f9fc;
  border: 1px solid #eef1f5;
  gap: 8px;
}

.arch-name {
  font-size: 13px;
  font-weight: 600;
  color: #0b1628;
  white-space: nowrap;
}

.arch-detail {
  font-size: 11px;
  color: #999;
  text-align: right;
  line-height: 1.4;
}

/* ===== Flow Image ===== */
.flow-img {
  width: 100%;
  display: block;
  border-radius: 8px;
}

/* ===== Chip ===== */
.chip-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  background: #f7f9fc;
  border: 1px solid #f0f2f5;
}

.chip-name {
  font-size: 14px;
  font-weight: 600;
  color: #0b1628;
  font-family: "SF Mono", "Fira Code", "Consolas", monospace;
}

.chip-desc {
  font-size: 12px;
  color: #999;
  text-align: right;
}

/* ===== Process Flow ===== */
.proc {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.proc-node {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #555;
  padding: 8px 14px;
  border-radius: 10px;
  background: #f7f9fc;
  border: 1px solid #f0f2f5;
}

.proc-node-vio {
  background: #fff5f5;
  border-color: #ffcdd2;
  color: #c62828;
}

.proc-node-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.proc-node-end {
  background: #f1f8e9;
  border-color: #c5e1a5;
  color: #33691e;
}

.proc-node-text {
  display: flex;
  align-items: center;
  gap: 6px;
}

.proc-icon {
  font-size: 14px;
  line-height: 1;
}

.proc-tag {
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 3px;
  background: rgba(198,40,40,0.1);
  color: #c62828;
}

.proc-arrow {
  font-size: 16px;
  color: #ccc;
  line-height: 1;
}

.proc-arrow-h {
  font-size: 14px;
  color: #ccc;
  line-height: 1;
}

.proc-split {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.proc-side {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ===== Footer ===== */
.footer {
  text-align: center;
  padding: 20px 0 8px;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  background: #0b1628;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(11,22,40,0.12);
}

.btn-back:active {
  transform: scale(0.97);
}

.footer-motto {
  margin-top: 14px;
  font-size: 12px;
  color: #bbb;
}

/* ===== Desktop ===== */
@media (min-width: 769px) {
  .page {
    padding-bottom: 48px;
  }

  .body-wrap {
    max-width: 600px;
    margin: -16px auto 0;
  }

  .hero {
    padding: 60px 20px 52px;
  }

  .hero-title {
    font-size: 40px;
  }

  .hero-sub {
    font-size: 15px;
    max-width: 360px;
  }

  .card {
    padding: 24px;
    margin-bottom: 14px;
    border-radius: 16px;
  }

  .card-title {
    font-size: 17px;
    margin-bottom: 16px;
  }

  .grid-3 {
    gap: 12px;
  }

  .func-item {
    padding: 16px 8px;
  }

  .metric-grid {
    gap: 10px;
  }

  .metric {
    padding: 16px 10px;
  }

  .chip-list {
    flex-direction: row;
    gap: 10px;
  }

  .chip {
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 14px;
  }

  .chip-desc {
    text-align: left;
  }

  .proc-side {
    gap: 8px;
  }

  .btn-back:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 16px rgba(11,22,40,0.18);
  }
}
</style>
