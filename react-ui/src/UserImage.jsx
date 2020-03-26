import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { captureUserPicture, setTimerFrequency, setupPictureTimer } from './actions'

export class UserImage extends PureComponent {
  render = () => (
    <div className="user-image">
      <img
        className="user-image__image"
        src={this.props.user.image || 'https://via.placeholder.com/320x240'}
        alt={this.props.user.id}
      />
      <div className="user-image__overlay">
        <button onClick={this.props.captureUserPicture}>Take photo</button>
        <input value={this.props.timerFrequency} onChange={this.setTimerFrequency} />
      </div>
    </div>
  )

  setTimerFrequency = (event) => {
    const value = +event.target.value
    if (value) {
      this.props.setTimerFrequency(value)
      this.props.setupPictureTimer()
    }
  }
}

export default connect(
  ({ timerFrequency }) => ({timerFrequency}),
  { captureUserPicture, setTimerFrequency, setupPictureTimer }
)(UserImage)
