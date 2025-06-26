<script setup>
import { ref } from 'vue'
import OwncastLogin from './components/OwncastLogin.vue'
import CockpitUI from './components/CockpitUI.vue'
import FXGrid from './components/FXGrid.vue'
import ChatBox from './components/ChatBox.vue'
import TipPanel from './components/TipPanel.vue'
import ViewerCount from './components/ViewerCount.vue'
import { handleTipResponse } from './volt/ClaudeAgent.js'

const showTip = ref(true)
const fxRef = ref()
const owncastConnected = ref(false)

function handleFX(e) {
  fxRef.value.triggerFX(e.effect)
}

function handleTip(tip) {
  handleTipResponse({ amount: tip.amount, fxRef })
}

function handleOwncastConnection(connectionData) {
  owncastConnected.value = true
  console.log('Connected to Owncast:', connectionData)
}

function handleOwncastDisconnection() {
  owncastConnected.value = false
  console.log('Disconnected from Owncast')
}

function handleChatMessage(message) {
  console.log('Chat message:', message)
}

function handleViewerUpdate(stats) {
  console.log('Viewer stats:', stats)
}
</script>

<template>
  <OwncastLogin 
    @connected="handleOwncastConnection"
    @disconnected="handleOwncastDisconnection"
  />
  <CockpitUI @effect-triggered="handleFX" />
  <FXGrid ref="fxRef" />
  <ChatBox 
    :fx-ref="fxRef"
    @message-sent="handleChatMessage"
  />
  <TipPanel 
    v-if="showTip" 
    @tip-sent="handleTip" 
    @close="showTip = false" 
  />
  <ViewerCount @viewer-update="handleViewerUpdate" />
</template>
