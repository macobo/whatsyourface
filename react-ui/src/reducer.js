import { uniqBy } from 'lodash'
import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'
import { noneOption } from './initialFilterList'

export const uuid = createReducer('', {
  uuid: (state, action) => action.payload
})

export const users = createReducer({}, {
  setState: (state, action) => action.payload,
  updateState: (state, action) => ({ ...state, ...action.payload })
})

export const capturingImage = createReducer(false, {
  [actions.captureUserPicture]: () => true,
  [actions.closeWebcam]: () => false,
  [actions.updateUserPicture.pending]: () => false,
})

export const timerFrequency = createReducer(60, {
  [actions.setTimerFrequency]: (state, action) => action.payload
})

export const pictureFilter = createReducer(noneOption, {
  [actions.setPictureFilter]: (state, action) => action.payload,
  [actions.setUploadedPictureFilter]: (state, action) => action.payload
})

export const pictureFilterWeight = createReducer(1.0, {
  [actions.setPictureFilterWeight]: (state, action) => action.payload
})

export const customFilters = createReducer([], {
  [actions.setUploadedPictureFilter]: (state, action) => uniqBy([action.payload].concat(state), 'label')
})

export const emojiRain = createReducer({}, {
  addEmoji: (state, action) => ({
    ...state,
    [action.payload.emoji]: (state[action.payload.emoji] || 0) + action.payload.count
  })
})
