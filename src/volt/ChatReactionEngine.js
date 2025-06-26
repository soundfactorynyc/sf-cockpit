export function scanMessageForFX({ message, fxRef }) {
  const triggers = [
    { keyword: '🔥', effect: 'fireball' },
    { keyword: '💸', effect: 'moneyBeam' },
    { keyword: '💃', effect: 'danceExplosion' },
    { keyword: '🧠', effect: 'mindBlast' },
    { keyword: 'boom', effect: 'chaosShock' },
    { keyword: 'money', effect: 'moneyBeam' },
    { keyword: 'explode', effect: 'chaosShock' },
    { keyword: 'vibe', effect: 'danceExplosion' }
  ]

  const matched = triggers.find(t => message.toLowerCase().includes(t.keyword))
  if (matched) {
    fxRef.value.triggerFX(matched.effect)
  }
}
