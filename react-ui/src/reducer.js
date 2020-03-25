import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

export const uuid = createReducer('', {
  uuid: (state, action) => action.payload
})

export const users = createReducer({}, {
  updateState: (state, action) => action.payload
})

export const capturingImage = createReducer(false, {
  [actions.captureUserPicture]: () => true,
  [actions.updateUserPicture.pending]: () => false,
})
