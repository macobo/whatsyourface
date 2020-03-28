import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PictureCapture from './PictureCapture'
import UserView from './UserView'
import { getActiveUsers } from './selectors'
import EmojiRain from './EmojiRain'
import ControlPanel from './ControlPanel'

import './App.css'

export class App extends PureComponent {
  render = () => (
    <>
      {this.props.capturingImage ? <PictureCapture /> : null}
      <EmojiRain />
      <div className="picture-grid">
        {this.props.users.map((user) => <UserView key={user.id} user={user} />)}
      </div>
      <ControlPanel />
    </>
  )
}

export default connect(
  (state) => ({
    capturingImage: state.capturingImage,
    users: getActiveUsers(state)
  }),
)(App)
