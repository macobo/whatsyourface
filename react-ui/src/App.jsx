import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PictureCapture from './PictureCapture'
import { captureUserPicture } from './actions'

import './App.css'

export class App extends PureComponent {
  componentDidMount() {
    setInterval(() => {
      this.props.captureUserPicture()
    }, 10000)
  }

  render = () => (
    <>
      {this.props.state.capturingImage ? <PictureCapture /> : null}
      <pre>{JSON.stringify(this.props, null, 2)}</pre>
    </>
  )
}

export default connect(
  (state) => ({ state }),
  { captureUserPicture }
)(App)
