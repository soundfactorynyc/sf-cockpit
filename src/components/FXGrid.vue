<template>
  <canvas ref="canvas" class="fx-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
let ctx, particles = []

function spawn(effectName) {
  const x = window.innerWidth / 2
  const y = window.innerHeight - 100

  if (effectName === 'fireball') {
    for (let i = 0; i < 15; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 4 - 2,
        r: 10 + Math.random() * 10,
        alpha: 1,
        color: 'orange'
      })
    }
  }

  if (effectName === 'moneyBeam') {
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.value.width,
        y: -20,
        vx: 0,
        vy: 2 + Math.random() * 3,
        r: 10,
        alpha: 1,
        color: 'lime'
      })
    }
  }

  if (effectName === 'danceExplosion') {
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        r: 5 + Math.random() * 10,
        alpha: 1,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`
      })
    }
  }

  if (effectName === 'mindBlast') {
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.value.width,
        y: Math.random() * canvas.value.height,
        vx: 0,
        vy: 0,
        r: 10,
        alpha: 1,
        color: `rgba(0, 255, 255, ${Math.random()})`
      })
    }
  }

  if (effectName === 'chaosShock') {
    canvas.value.style.backgroundColor = 'white'
    setTimeout(() => {
      canvas.value.style.backgroundColor = 'transparent'
    }, 80)
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.alpha -= 0.01

    ctx.globalAlpha = p.alpha
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.fill()

    if (p.alpha <= 0) {
      particles.splice(i, 1)
    }
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  ctx = canvas.value.getContext('2d')
  animate()
})

defineExpose({ triggerFX: spawn })
</script>

<style scoped>
.fx-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
