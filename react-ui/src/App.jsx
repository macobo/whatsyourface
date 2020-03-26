import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PictureCapture from './PictureCapture'
import UserImage from './UserImage'
import { getActiveUsers } from './selectors'

import './App.css'

export class App extends PureComponent {
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
)(App)
