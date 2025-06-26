<template>
  <div class="viewer-count">
    <div class="count-display">
      <span class="icon">👥</span>
      <span class="number">{{ viewerCount }}</span>
      <span class="label">viewers</span>
    </div>
    <div class="stats">
      <div class="stat">
        <span class="stat-value">{{ peakViewers }}</span>
        <span class="stat-label">peak</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ totalViews }}</span>
        <span class="stat-label">total</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['viewer-update'])

const viewerCount = ref(42)
const peakViewers = ref(89)
const totalViews = ref(1247)

let updateInterval = null

function updateViewers() {
  // Simulate viewer count fluctuation
  const change = Math.floor(Math.random() * 11) - 5 // -5 to +5
  const newCount = Math.max(0, viewerCount.value + change)
  
  viewerCount.value = newCount
  
  // Update peak if necessary
  if (newCount > peakViewers.value) {
    peakViewers.value = newCount
  }
  
  // Increment total views occasionally
  if (Math.random() > 0.8) {
    totalViews.value += Math.floor(Math.random() * 3) + 1
  }
  
  emit('viewer-update', {
    current: viewerCount.value,
    peak: peakViewers.value,
    total: totalViews.value
  })
}

onMounted(() => {
  // Update viewer count every 3-8 seconds
  updateInterval = setInterval(() => {
    updateViewers()
  }, Math.random() * 5000 + 3000)
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})

// Expose method to manually set viewer count
function setViewerCount(count) {
  viewerCount.value = count
}

defineExpose({ setViewerCount })
</script>

<style scoped>
.viewer-count {
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #0f0;
  border-radius: 8px;
  padding: 1rem;
  color: #0f0;
  font-family: 'Orbitron', sans-serif;
  z-index: 1500;
  min-width: 150px;
}

.count-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.icon {
  font-size: 1.2rem;
}

.number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0ff;
}

.label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.stats {
  display: flex;
  gap: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #0f0;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 0.9rem;
  font-weight: bold;
  color: #ff0;
}

.stat-label {
  font-size: 0.7rem;
  opacity: 0.7;
  text-transform: uppercase;
}

/* Animation for viewer count changes */
.number {
  transition: all 0.3s ease;
}

.viewer-count:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
}
</style>
