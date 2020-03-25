import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PictureCapture from './PictureCapture'
import UserImage from './UserImage'
import { captureUserPicture } from './actions'
import { getActiveUsers } from './selectors'

import './App.css'

export class App extends PureComponent {
  componentDidMount() {
    this.props.captureUserPicture()
    setInterval(() => {
      this.props.captureUserPicture()
    }, 10000)
  }

  render = () => (
    <>
      {this.props.capturingImage ? <PictureCapture /> : null}
      {this.props.users.map((user) => <UserImage key={user.id} user={user} />)}
    </>
  )
}

export default connect(
  (state) => ({
    capturingImage: state.capturingImage,
    users: getActiveUsers(state)
  }),
  { captureUserPicture }
)(App)
