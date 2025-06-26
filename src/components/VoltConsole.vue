<template>
  <section class="volt-console">
    <h2 class="console-title">⚡ VOLT AGENTS CONSOLE</h2>
    <div class="agent-grid">
      <div 
        v-for="agent in agents" 
        :key="agent.id" 
        class="agent-card" 
        :class="{ active: agent.active }"
      >
        <h3>{{ agent.name }}</h3>
        <p>{{ agent.description }}</p>

        <button @click="toggle(agent)">
          {{ agent.active ? '🟢 Active' : '🔴 Inactive' }}
        </button>

        <ul class="trigger-list">
          <li v-for="(trigger, index) in agent.triggers" :key="index">
            → {{ trigger.when || trigger.on }} ➝ <code>{{ trigger.action }}</code>
          </li>
        </ul>

        <button 
          v-if="agent.manual"
          class="manual-fire"
          @click="fire(agent.manual)"
        >
          🔥 Fire Manual: {{ agent.manual }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VOLT_AGENTS } from '../volt/agents/index.js'

const agents = ref([])

onMounted(() => {
  agents.value = Object.values(VOLT_AGENTS).map(agent => ({
    ...agent,
    active: true,
    manual: agent.triggers?.[0]?.action?.includes('triggerFX')
      ? agent.triggers[0].action.match(/triggerFX\('(.+?)'\)/)?.[1]
      : null
  }))
})

function toggle(agent) {
  agent.active = !agent.active
}

function fire(effect) {
  if (window && typeof window.triggerFX === 'function') {
    window.triggerFX(effect)
  } else {
    console.warn('FX trigger unavailable:', effect)
  }
}
</script>

<style scoped>
.volt-console {
  padding: 24px;
  background: #0c0c0f;
  color: #00ff88;
  font-family: 'Courier New', monospace;
}
.console-title {
  font-size: 20px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.agent-card {
  border: 1px solid #222;
  padding: 16px;
  border-radius: 8px;
  background: #111;
  transition: 0.2s ease;
}
.agent-card.active {
  border-color: #00ff88;
  box-shadow: 0 0 12px rgba(0, 255, 136, 0.3);
}
.agent-card h3 {
  margin-top: 0;
}
.agent-card button {
  margin-top: 10px;
  background: #00ff88;
  color: #000;
  font-weight: bold;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.trigger-list {
  font-size: 12px;
  margin-top: 12px;
  background: #1a1a1a;
  padding: 8px;
  border-radius: 4px;
}
.manual-fire {
  margin-top: 8px;
  background: #ff0066;
  color: #fff;
}
</style>

