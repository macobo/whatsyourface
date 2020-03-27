import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { captureUserPicture, setTimerFrequency, setupPictureTimer, setUserName } from './actions'

export class UserView extends PureComponent {
  state = { name: this.props.user.name }

  render = () => (
    <div className="user-image">
      <div className="user-image__overlay">
        <button onClick={this.captureUserPicture}>Take photo</button>
        <input value={this.props.timerFrequency} onChange={this.setTimerFrequency} />
        <input value={this.state.name} onChange={this.setName} />
      </div>
      <img
        className="user-image__image"
        src={this.props.user.image || 'https://via.placeholder.com/320x240'}
        alt={this.props.user.id}
      />
    </div>
  )

  // :TRICKY: Strip event argument to avoid warnings
  captureUserPicture = () => {
    this.props.captureUserPicture()
  }

  setTimerFrequency = (event) => {
    const value = +event.target.value
    if (value) {
      this.props.setTimerFrequency(value)
      this.props.setupPictureTimer()
    }
  }

  setName = (event) => {
    const name = event.target.value
    this.setState({ name })
    this.props.setUserName(name)
  }
}

export default connect(
  ({ timerFrequency }) => ({timerFrequency}),
  { captureUserPicture, setTimerFrequency, setupPictureTimer, setUserName }
)(UserView)
