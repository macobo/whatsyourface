import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { broadcastEmoji } from './actions'

export class EmojiButton extends PureComponent {
  render = () => (
    <button className="tertiary" onClick={this.handleClick}>
      {this.props.emoji}
    </button>
  )

  handleClick = () => {
    this.props.broadcastEmoji(this.props.emoji)
  }
}

export default connect(
  undefined,
  { broadcastEmoji }
)(EmojiButton)
