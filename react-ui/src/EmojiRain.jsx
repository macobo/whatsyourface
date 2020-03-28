import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compact, flatMap, random, times } from 'lodash'

class Particle {
  static random(emoji) {
    return new Particle(
      random(0, window.innerWidth - 50),
      random(-500, 0),
      random(30, 50),
      { x: random(-7, 7), y: random(40, 80) },
      emoji
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

export class EmojiRain extends PureComponent {
  state = {
    particles: [],
  }

  componentDidMount() {
    this.lastSeenEmoji = this.props.emojiRain
    this.lastTimestamp = performance.now()
    this.animate(this.lastTimestamp)
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrame)
  }

  componentDidUpdate = () => {
    if (this.lastSeenEmoji !== this.props.emojiRain) {
      const newParticles = flatMap(this.props.emojiRain, (newCount, emoji) => {
        const increase = newCount - (this.lastSeenEmoji[emoji] || 0)
        return times(increase, () => Particle.random(emoji))
      })

      this.setState({ particles: this.state.particles.concat(newParticles) })
      this.lastSeenEmoji = this.props.emojiRain
    }
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

export default connect(
  ({ emojiRain }) => ({ emojiRain })
)(EmojiRain)
