import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { sendMessage } from './websocket'

export const setTimerFrequency = createAction('setTimerFrequency')
export const setPictureFilter = createAction('setPictureFilter')
export const setPictureFilterWeight = createAction('setPictureFilterWeight')
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

  const { timerFrequency } = getState()
  dispatch(captureUserPicture())
  pictureTimer = setInterval(() => { dispatch(captureUserPicture()) }, timerFrequency * 1000)
}

export const setUserName = (name) => () => {
  sendMessage({ type: 'updateName', name })
}

export const broadcastEmoji = (emoji) => () => {
  sendMessage({ type: 'broadcastEmoji', emoji })
}
