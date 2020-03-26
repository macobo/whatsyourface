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
export const setupPictureTimer = () => (dispatch, getState) => {
  if (pictureTimer) {
    clearInterval(pictureTimer)
  }

  const { timerFrequency } = getState()
  dispatch(captureUserPicture())
  pictureTimer = setInterval(() => { dispatch(captureUserPicture()) }, timerFrequency)
}
