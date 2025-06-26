<template>
  <div class="chat-box">
    <div class="chat-header">
      <h4>💬 Live Chat</h4>
      <span class="chat-count">{{ messages.length }} messages</span>
    </div>
    
    <div class="chat-messages" ref="messagesContainer">
      <div 
        v-for="msg in messages" 
        :key="msg.id"
        :class="['message', `message-${msg.type}`]"
      >
        <span class="username">{{ msg.username }}:</span>
        <span class="text">{{ msg.text }}</span>
        <span class="timestamp">{{ formatTime(msg.timestamp) }}</span>
      </div>
    </div>
    
    <div class="chat-input">
      <input 
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
        class="message-input"
      />
      <button @click="sendMessage" class="send-btn">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { scanMessageForFX } from '../volt/ChatReactionEngine.js'

const emit = defineEmits(['message-sent', 'fx-triggered'])

const props = defineProps({
  fxRef: Object
})

const messages = ref([
  { id: 1, username: 'StreamBot', text: 'Welcome to SoundFactory! 🎵', type: 'system', timestamp: Date.now() },
  { id: 2, username: 'Viewer1', text: 'This is amazing! 🔥', type: 'user', timestamp: Date.now() + 1000 },
  { id: 3, username: 'Viewer2', text: 'Love the effects! money rain please', type: 'user', timestamp: Date.now() + 2000 }
])

const newMessage = ref('')
const messagesContainer = ref(null)

function sendMessage() {
  if (!newMessage.value.trim()) return
  
  const message = {
    id: Date.now(),
    username: 'You',
    text: newMessage.value,
    type: 'user',
    timestamp: Date.now()
  }
  
  messages.value.push(message)
  emit('message-sent', message)
  
  // Scan for FX triggers
  if (props.fxRef) {
    scanMessageForFX({ message: newMessage.value, fxRef: props.fxRef })
  }
  
  newMessage.value = ''
  scrollToBottom()
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function addMessage(message) {
  messages.value.push({
    id: Date.now(),
    ...message,
    timestamp: Date.now()
  })
  scrollToBottom()
}

// Simulate incoming messages
onMounted(() => {
  setInterval(() => {
    const randomMessages = [
      { username: 'Viewer' + Math.floor(Math.random() * 100), text: 'Great stream! 💃', type: 'user' },
      { username: 'Fan' + Math.floor(Math.random() * 50), text: 'boom! explode the screen!', type: 'user' },
      { username: 'Supporter', text: 'This vibe is incredible 🧠', type: 'user' },
      { username: 'Watcher', text: 'money money money 💸', type: 'user' }
    ]
    
    if (Math.random() > 0.7) {
      const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)]
      addMessage(randomMsg)
      
      // Trigger FX for simulated messages
      if (props.fxRef) {
        scanMessageForFX({ message: randomMsg.text, fxRef: props.fxRef })
      }
    }
  }, 5000)
})

defineExpose({ addMessage })
</script>

<style scoped>
.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #0f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-family: 'Orbitron', sans-serif;
  z-index: 1000;
}

.chat-header {
  background: #0f0;
  color: #000;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px 6px 0 0;
}

.chat-header h4 {
  margin: 0;
  font-size: 0.9rem;
}

.chat-count {
  font-size: 0.8rem;
  opacity: 0.8;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  color: #0f0;
}

.message {
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.3;
}

.message-system {
  color: #ff0;
  font-style: italic;
}

.username {
  font-weight: bold;
  color: #0ff;
}

.text {
  margin-left: 0.5rem;
}

.timestamp {
  float: right;
  color: #666;
  font-size: 0.7rem;
}

.chat-input {
  display: flex;
  padding: 0.5rem;
  border-top: 1px solid #0f0;
}

.message-input {
  flex: 1;
  background: #000;
  border: 1px solid #0f0;
  color: #0f0;
  padding: 0.5rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.8rem;
}

.message-input::placeholder {
  color: #666;
}

.send-btn {
  background: #0f0;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
}

.send-btn:hover {
  background: #0c0;
}

/* Scrollbar styling */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #000;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #0f0;
  border-radius: 3px;
}
</style>
