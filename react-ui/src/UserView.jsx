import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'
import { captureUserPicture, setTimerFrequency, setupPictureTimer, setUserName } from './actions'

export class UserView extends PureComponent {
  state = { name: this.props.user.name }

  render = () => (
    <div className="user-image">
      <div className={this.overlayClasses()}>
        <div className="user-overlay-content">
          {this.props.activeUser ? this.renderActiveUserOverlay() : this.renderOverlay()}
        </div>
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
      <div className="user-overlay-content__button">
        <button className="tertiary" onClick={this.captureUserPicture}>
          📷
        </button>
      </div>
      <div className="user-overlay-content__details">
        <div>
          Name:
          &nbsp;
          <a href="#" className="user-overlay-content__link" onClick={this.setName}>{this.state.name}</a>
        </div>
        <div>
          Refresh rate:
          &nbsp;
          <a href="#" className="user-overlay-content__link" onClick={this.setTimerFrequency}>
            {this.props.timerFrequency} s
          </a>
        </div>
      </div>
    </>
  )

  renderOverlay = () => (
    <>
      <div />
      <div className="user-overlay-content__details">
        <div>{this.props.user.name}</div>
        <div>Last seen: {moment(this.props.user.lastUpdate).fromNow()}</div>
      </div>
    </>
  )

  overlayClasses = () =>
    classNames({
      'user-image__overlay': true,
      'user-image__overlay--offline': !this.props.user.active,
    })

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
    event.preventDefault()

    const value = +prompt('Enter timer frequency (seconds)', this.props.timerFrequency)
    if (value) {
      this.props.setTimerFrequency(value)
      this.props.setupPictureTimer()
    }
  }

  setName = (event) => {
    event.preventDefault()

    const name = prompt('Enter name', this.props.name)
    if (name) {
      this.setState({ name })
      this.props.setUserName(name)
    }
  }
}

export default connect(
  ({ timerFrequency, uuid }, props) => ({
    activeUser: uuid === props.user.id,
    timerFrequency
  }),
  { captureUserPicture, setTimerFrequency, setupPictureTimer, setUserName }
)(UserView)
