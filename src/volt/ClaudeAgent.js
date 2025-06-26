export function handleTipResponse({ amount, fxRef }) {
  console.log(`Processing tip: $${amount}`)
  
  if (amount >= 50) {
    // Large tip - full meltdown sequence
    fxRef.value.triggerFX('chaosShock')
    setTimeout(() => fxRef.value.triggerFX('danceExplosion'), 100)
    setTimeout(() => fxRef.value.triggerFX('mindBlast'), 300)
    setTimeout(() => fxRef.value.triggerFX('moneyBeam'), 600)
  } else if (amount >= 10) {
    // Medium tip - combo effects
    fxRef.value.triggerFX('mindBlast')
    setTimeout(() => fxRef.value.triggerFX('moneyBeam'), 500)
  } else {
    // Small tip - simple effect
    fxRef.value.triggerFX('fireball')
  }
}
