export class ClaudeAgent {
  constructor() {
    this.reactions = {
      small: ['😊', '🙏', '✨', '💫', '🌟'],
      medium: [
        "Thank you so much! That's incredibly generous! 🎉",
        "Wow, I'm genuinely touched by your kindness! 💖",
        "This means a lot to me - thank you! 🌟",
        "Your generosity is amazing! 🚀"
      ],
      large: [
        "OH MY GOODNESS! This is absolutely incredible! 🤯",
        "I can't believe this generosity! You're amazing! 💥",
        "This is beyond generous - I'm speechless! 🔥",
        "WOW! This just made my entire day! 🌈"
      ]
    }
    
    this.currentReaction = null
    this.reactionTimeout = null
  }

  processtip(tipData, effectCallback, chatCallback) {
    const { amount } = tipData
    
    // Clear any existing reaction
    this.clearReaction()
    
    if (amount >= 1 && amount <= 5) {
      this.handleSmallTip(amount, effectCallback, chatCallback)
    } else if (amount >= 10 && amount <= 20) {
      this.handleMediumTip(amount, effectCallback, chatCallback)
    } else if (amount >= 50) {
      this.handleLargeTip(amount, effectCallback, chatCallback)
    }
  }

  handleSmallTip(amount, effectCallback, chatCallback) {
    // Emoji flicker effect
    const emoji = this.getRandomReaction('small')
    this.flickerEmoji(emoji, chatCallback)
    
    // Simple effect
    effectCallback({ effect: 'fireball' })
  }

  handleMediumTip(amount, effectCallback, chatCallback) {
    // Speech + FX combo
    const message = this.getRandomReaction('medium')
    chatCallback({ type: 'speech', message, amount })
    
    // Multiple effects
    effectCallback({ effect: 'mindBlast' })
    setTimeout(() => effectCallback({ effect: 'moneyBeam' }), 500)
  }

  handleLargeTip(amount, effectCallback, chatCallback) {
    // Full screen meltdown
    const message = this.getRandomReaction('large')
    chatCallback({ type: 'meltdown', message, amount })
    
    // Chaos sequence
    effectCallback({ effect: 'chaosShock' })
    setTimeout(() => effectCallback({ effect: 'danceExplosion' }), 100)
    setTimeout(() => effectCallback({ effect: 'mindBlast' }), 300)
    setTimeout(() => effectCallback({ effect: 'moneyBeam' }), 600)
    setTimeout(() => effectCallback({ effect: 'fireball' }), 900)
  }

  flickerEmoji(emoji, chatCallback) {
    let flickerCount = 0
    const maxFlickers = 8
    
    const flicker = () => {
      if (flickerCount < maxFlickers) {
        chatCallback({ 
          type: 'emoji-flicker', 
          emoji: flickerCount % 2 === 0 ? emoji : '',
          flickerCount 
        })
        flickerCount++
        setTimeout(flicker, 150)
      }
    }
    
    flicker()
  }

  getRandomReaction(type) {
    const reactions = this.reactions[type]
    return reactions[Math.floor(Math.random() * reactions.length)]
  }

  clearReaction() {
    if (this.reactionTimeout) {
      clearTimeout(this.reactionTimeout)
      this.reactionTimeout = null
    }
    this.currentReaction = null
  }

  // Generate contextual responses based on tip patterns
  generateContextualResponse(tipHistory) {
    const totalTips = tipHistory.reduce((sum, tip) => sum + tip.amount, 0)
    const tipCount = tipHistory.length
    
    if (tipCount === 1) {
      return "Thank you for being my first tipper! 🎉"
    } else if (totalTips >= 100) {
      return `Incredible! We've reached $${totalTips} together! 🚀`
    } else if (tipCount >= 5) {
      return `${tipCount} tips! You're all amazing! 💖`
    }
    
    return null
  }

  // Simulate Claude's personality in responses
  getPersonalityResponse(amount) {
    if (amount >= 50) {
      return {
        enthusiasm: 'maximum',
        gratitude: 'overwhelming',
        effects: ['chaosShock', 'danceExplosion', 'mindBlast'],
        duration: 3000
      }
    } else if (amount >= 10) {
      return {
        enthusiasm: 'high',
        gratitude: 'heartfelt',
        effects: ['mindBlast', 'moneyBeam'],
        duration: 2000
      }
    } else {
      return {
        enthusiasm: 'warm',
        gratitude: 'genuine',
        effects: ['fireball'],
        duration: 1000
      }
    }
  }
}

// Export singleton instance
export const claudeAgent = new ClaudeAgent()
