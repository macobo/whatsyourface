import React, { PureComponent, createRef } from 'react'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import { processWebcamImage } from './actions'

const dimensions = { width: 320, height: 240 }

export class PictureCapture extends PureComponent {
  webcamRef = createRef()

  componentDidMount = () => {
    this.interval = setInterval(async() => {
      console.debug('interval', this.webcamRef)
      if (this.webcamRef.current) {
        try {
          this.capturePhoto()
          clearInterval(this.interval)
        } catch(error) {
          console.error('Taking image failed', error)
        }
      }
    }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
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
    this.props.processWebcamImage(image)
  }
}

export default connect(
  undefined,
  { processWebcamImage }
)(PictureCapture)
