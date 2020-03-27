import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { sendMessage } from './websocket'

export const setTimerFrequency = createAction('setTimerFrequency')
export const captureUserPicture = createAction('captureUserPicture')

export const updateUserPicture = createAsyncThunk(
  'updateUserPicture',
  async(image) => {
    sendMessage({ type: 'updatePicture', image })
  }
)

let pictureTimer
export const setupPictureTimer = () => async(dispatch, getState) => {
  if (pictureTimer) {
    clearInterval(pictureTimer)
  }

  await navigator.mediaDevices.getUserMedia({ video: true })

  const { timerFrequency } = getState()
  dispatch(captureUserPicture())
  pictureTimer = setInterval(() => { dispatch(captureUserPicture()) }, timerFrequency)
}

export const setUserName = (name) => () => {
  sendMessage({ type: 'updateName', name })
}
