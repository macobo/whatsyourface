import React, { PureComponent, createRef } from 'react'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import { updateUserPicture } from './actions'
import applyFilter from './applyFilter'

const dimensions = { width: 320, height: 240 }

export class PictureCapture extends PureComponent {
  webcamRef = createRef()

  componentDidMount = () => {
    const interval = setInterval(() => {
      if (this.webcamRef.current && this.capturePhoto()) {
        clearInterval(interval)
      }
    }, 1000)
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

  capturePhoto = async() => {
    const image = await applyFilter(this.webcamRef.current.getScreenshot(), this.props.pictureFilter)
    if (image) {
      this.props.updateUserPicture(image)
      return true
    }
  }
}

export default connect(
  ({ pictureFilter }) => ({ pictureFilter }),
  { updateUserPicture }
)(PictureCapture)
