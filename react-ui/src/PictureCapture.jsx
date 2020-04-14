import React, { PureComponent, createRef } from 'react'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import { updateUserPicture } from './actions'
import applyFilter from './applyFilter'

const dimensions = { width: 320, height: 240 }

export class PictureCapture extends PureComponent {
  webcamRef = createRef()

  componentDidMount = () => {
    window.webcamRef = this.webcamRef
    const interval = setInterval(async() => {
      console.debug('interval', this.webcamRef)
      if (this.webcamRef.current && await this.capturePhoto()) {
        console.debug('cleared interval', interval)
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
    console.debug('taking a photo')
    const screenshot = this.webcamRef.current.getScreenshot()

    const image = await applyFilter(
      screenshot,
      this.props.pictureFilter,
      this.props.pictureFilterWeight
    )

    console.debug('capturePhoto', { image })
    if (image) {
      this.props.updateUserPicture(image)
      return true
    }
  }
}

export default connect(
  ({ pictureFilter, pictureFilterWeight }) => ({ pictureFilter, pictureFilterWeight }),
  { updateUserPicture }
)(PictureCapture)
