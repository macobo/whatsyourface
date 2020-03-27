import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'
import { captureUserPicture, setTimerFrequency, setupPictureTimer, setUserName } from './actions'

export class UserView extends PureComponent {
  state = { name: this.props.user.name }

  render = () => (
    <div className="user-image">
      <div className="user-image__overlay">
        {this.props.activeUser ? this.renderActiveUserOverlay() : this.renderOverlay()}
      </div>
      <img
        className="user-image__image"
        src={this.props.user.image || 'https://picsum.photos/320/240'}
        alt={this.props.user.name}
      />
      <div className="user-image__status-indicator-wrapper">
        <div className={this.statusIndicatorClasses()} />
      </div>
    </div>
  )

  renderActiveUserOverlay = () => (
    <>
      <button onClick={this.captureUserPicture}>Take photo</button>
      <input value={this.props.timerFrequency} onChange={this.setTimerFrequency} />
      <input value={this.state.name} onChange={this.setName} />
    </>
  )

  renderOverlay = () => (
    <>
      <div>{this.props.user.name}</div>
      <div>Last seen: {moment(this.props.user.lastUpdate).fromNow()}</div>
    </>
  )

  statusIndicatorClasses = () =>
    classNames({
      'user-image__status-indicator': true,
      'user-image__status-indicator--active': this.props.user.active,
      'user-image__status-indicator--offline': !this.props.user.active,
    })

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
  ({ timerFrequency, uuid }, props) => ({
    activeUser: uuid === props.user.id,
    timerFrequency
  }),
  { captureUserPicture, setTimerFrequency, setupPictureTimer, setUserName }
)(UserView)
