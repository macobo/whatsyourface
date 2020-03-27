import React, { PureComponent } from 'react'
import { compact, sample, range, random } from 'lodash'

var emoji = ['🌽', '🍇', '🍌', '🍒', '🍕', '🍷', '🍭', '💖', '💩', '🐷', '🐸', '🐳', '🎃', '🎾', '🌈', '🍦', '💁', '🔥', '😁', '😱', '🌴', '👏', '💃']

class Particle {
  static random() {
    return new Particle(
      random(0, window.innerWidth - 50),
      random(-500, 0),
      random(30, 50),
      { x: random(-7, 7), y: random(40, 80) },
      sample(emoji)
    )
  }

  constructor(x, y, size, delta, emoji) {
    this.x = x
    this.y = y
    this.size = size
    this.delta = delta
    this.emoji = emoji
  }

  style = () => ({
    position: 'absolute',
    zIndex: 100,
    fontSize: `${this.size}px`,
    transform: `translate3d(${this.x}px, ${this.y}px, 0px)`,
  })

  tick = (sinceLastFrame) => {
    const nx = this.x + this.delta.x * sinceLastFrame
    const ny = this.y + this.delta.y * sinceLastFrame
    if (ny <= window.innerHeight) {
      return new Particle(nx, ny, this.size, this.delta, this.emoji);
    }
  }
}

export default class EmojiRain extends PureComponent {
  state = {
    particles: range(50).map(() => Particle.random())
  }

  componentDidMount() {
    this.lastTimestamp = performance.now()
    this.animate(this.lastTimestamp)
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrame)
  }

  animate = (timestamp) => {
    const timeDelta = (timestamp - this.lastTimestamp) / 1000.0
    this.setState({
      particles: compact(this.state.particles.map((p) => p.tick(timeDelta)))
    })
    this.lastTimestamp = timestamp
    this.animationFrame = requestAnimationFrame(this.animate)
  }

  render = () => (
    <div className="emoji-rain">
      {this.state.particles.map(this.renderParticle)}
    </div>
  )

  renderParticle = (particle, index) => (
    <div key={index} style={particle.style()}>{particle.emoji}</div>
  )
}
