<template>
  <div class="owncast-login" v-if="!connected">
    <div class="login-panel">
      <h3>🎥 Connect to Owncast</h3>
      <input 
        v-model="serverUrl" 
        type="text" 
        placeholder="Owncast server URL"
        class="server-input"
      />
      <input 
        v-model="adminKey" 
        type="password" 
        placeholder="Admin key (optional)"
        class="admin-input"
      />
      <button @click="connect" class="connect-btn">Connect</button>
    </div>
  </div>
  <div v-else class="connection-status">
    <span class="status-indicator">🟢 Connected to {{ serverUrl }}</span>
    <button @click="disconnect" class="disconnect-btn">Disconnect</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['connected', 'disconnected'])

const connected = ref(false)
const serverUrl = ref('http://localhost:8080')
const adminKey = ref('')

function connect() {
  if (!serverUrl.value) return
  
  // Simulate connection
  connected.value = true
  emit('connected', {
    url: serverUrl.value,
    adminKey: adminKey.value,
    timestamp: Date.now()
  })
}

function disconnect() {
  connected.value = false
  emit('disconnected')
}
</script>

<style scoped>
.owncast-login {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1500;
}

.login-panel {
  background: #111;
  border: 2px solid #0f0;
  padding: 1rem;
  border-radius: 8px;
  color: #0f0;
  font-family: 'Orbitron', sans-serif;
  min-width: 250px;
}

.login-panel h3 {
  margin: 0 0 1rem 0;
  text-align: center;
}

.server-input, .admin-input {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: #000;
  border: 1px solid #0f0;
  color: #0f0;
  font-family: 'Orbitron', sans-serif;
}

.server-input::placeholder, .admin-input::placeholder {
  color: #666;
}

.connect-btn {
  width: 100%;
  background: #0f0;
  color: #000;
  border: none;
  padding: 0.8rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

.connect-btn:hover {
  background: #0c0;
}

.connection-status {
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #0f0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #0f0;
  font-family: 'Orbitron', sans-serif;
  z-index: 1500;
}

.status-indicator {
  margin-right: 1rem;
}

.disconnect-btn {
  background: transparent;
  color: #0f0;
  border: 1px solid #0f0;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.8rem;
}

.disconnect-btn:hover {
  background: #0f0;
  color: #000;
}
</style>
