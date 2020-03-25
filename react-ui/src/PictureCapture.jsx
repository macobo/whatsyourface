import React, { PureComponent, createRef } from 'react'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import { updateUserPicture } from './actions'

const dimensions = { width: 320, height: 240 }

export class PictureCapture extends PureComponent {
  webcamRef = createRef()

  componentDidMount = () => {
    setTimeout(() => this.capturePhoto(), 3000)
  }

  render = () => (
    <div className="picture-capture">
      <Webcam
        audio={false}
        ref={this.webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ ...dimensions, facingMode: 'user' }}
        {...dimensions}
      />
    </div>
  )

  capturePhoto = () => {
    const image = this.webcamRef.current.getScreenshot()
    this.props.updateUserPicture(image)
  }
}

export default connect(undefined, { updateUserPicture })(PictureCapture)
