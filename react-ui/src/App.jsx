import React, { PureComponent, createRef } from 'react'
import Webcam from "react-webcam"

import './App.css'

const dimensions = { width: 320, height: 240 }

export default class App extends PureComponent {
  webcamRef = createRef()

  render = () => (
    <>
      <Webcam
        audio={false}
        ref={this.webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ ...dimensions, facingMode: 'user' }}
        {...dimensions}
      />
      <button onClick={this.capturePhoto}>Capture photo</button>
    </>
  )

  capturePhoto = () => {
    console.log(this.webcamRef.current.getScreenshot())
  }
}
