<template>
  <div class="acb-status-bar">
    <div class="acb-status-left">
      <span class="acb-status-dot" :class="isPlaying ? 'dot-green' : 'dot-gray'" />
      <span>{{ statusLabel }}</span>
    </div>
    <span>{{ Math.round(progressPct) }}% complete</span>
  </div>
</template>

<script setup>
defineProps({
  isPlaying: { type: Boolean, default: false },
  statusLabel: { type: String, default: 'Paused' },
  progressPct: { type: Number, default: 0 },
})
</script>

<style scoped>
.acb-status-bar {
  padding: 8px 16px;
  font-size: 12px;
  border-top: 1px solid rgba(128,128,128,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--acb-header-bg);
  color: var(--acb-text);
  font-family: system-ui, sans-serif;
}

.acb-status-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.acb-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.dot-green { background:#22c55e; }
.dot-gray { background:#6b7280; }
</style>
