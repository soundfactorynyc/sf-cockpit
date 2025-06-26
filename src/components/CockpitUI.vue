<template>
  <div class="cockpit">
    <h1>🔥 SoundFactory Cockpit is Live</h1>
    <div class="fx-controls">
      <button 
        v-for="btn in fxButtons" 
        :key="btn.id"
        @click="triggerEffect(btn.id)" 
        class="fx-btn"
      >
        {{ btn.emoji }} {{ btn.id.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['effect-triggered'])

const fxButtons = ref([
  { id: 'fireball', emoji: '🔥' },
  { id: 'moneyBeam', emoji: '💸' },
  { id: 'danceExplosion', emoji: '💃' },
  { id: 'mindBlast', emoji: '🧠' },
  { id: 'chaosShock', emoji: '💥' }
])

function triggerEffect(effect) {
  emit('effect-triggered', { effect })
}
</script>

<style scoped>
.cockpit {
  min-height: 100vh;
  background: #000;
  color: #00ff99;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.fx-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 800px;
  width: 100%;
  padding: 0 2rem;
}

.fx-btn {
  background: linear-gradient(45deg, #001a00, #003300);
  border: 2px solid #00ff99;
  color: #00ff99;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-family: 'Orbitron', sans-serif;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.fx-btn:hover {
  background: linear-gradient(45deg, #003300, #006600);
  box-shadow: 0 0 20px #00ff99;
  transform: translateY(-2px);
}

.fx-btn:active {
  transform: translateY(0);
  box-shadow: 0 0 10px #00ff99;
}
</style>

<style>
body {
  margin: 0;
  background: #000;
}
</style>
