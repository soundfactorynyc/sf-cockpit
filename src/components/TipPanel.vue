<template>
  <div class="tip-panel" v-if="visible">
    <div class="panel">
      <h2>Send a Tip</h2>
      <input v-model="phone" type="text" placeholder="Phone number" />
      <select v-model="amount">
        <option v-for="val in [1, 5, 10, 20, 50, 100]" :key="val" :value="val">
          ${{ val }}
        </option>
      </select>
      <button @click="sendTip">Send Tip</button>
      <button class="close" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const phone = ref('')
const amount = ref(5)
const visible = ref(true)

const emit = defineEmits(['tip-sent', 'effect-triggered', 'close'])

function sendTip() {
  if (!phone.value) return alert('Enter phone number')
  const tip = { phone: phone.value, amount: amount.value }
  emit('tip-sent', tip)
  emit('effect-triggered', {
    effect: 'fireball', // Placeholder FX
    from: 'tip',
    power: amount.value
  })
}
</script>

<style scoped>
.tip-panel {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: #111;
  border: 2px solid #0f0;
  padding: 20px;
  z-index: 2000;
  color: #0f0;
  width: 260px;
}
.panel input,
.panel select {
  width: 100%;
  margin-bottom: 12px;
  padding: 6px;
  font-size: 14px;
}
button {
  margin-right: 8px;
  background: #0f0;
  color: #000;
  padding: 8px 10px;
  border: none;
  cursor: pointer;
}
button.close {
  background: transparent;
  color: #0f0;
}
</style>
