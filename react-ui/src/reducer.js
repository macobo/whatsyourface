import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'
import initialFilterList from './initialFilterList'

export const uuid = createReducer('', {
  uuid: (state, action) => action.payload
})

export const users = createReducer({}, {
  setState: (state, action) => action.payload,
  updateState: (state, action) => ({ ...state, ...action.payload })
})

export const capturingImage = createReducer(false, {
  [actions.captureUserPicture]: () => true,
  [actions.updateUserPicture.pending]: () => false,
})

export const timerFrequency = createReducer(60, {
  [actions.setTimerFrequency]: (state, action) => action.payload
})

export const pictureFilter = createReducer(initialFilterList[0], {
  [actions.setPictureFilter]: (state, action) => action.payload
})

export const pictureFilterWeight = createReducer(1.0, {
  [actions.setPictureFilterWeight]: (state, action) => action.payload
})

export const pictureFilterList = createReducer(initialFilterList, {
	// Put the chosen filter as first after 'none'. If filter not yet present, add it
	[actions.setPictureFilter]: (state, action) => { 
						state = state.filter(item => item.label !== action.payload.label)
						state.splice(1,0,action.payload) // right after 'none'
						return state
	}
})

export const emojiRain = createReducer({}, {
  addEmoji: (state, action) => ({
    ...state,
    [action.payload.emoji]: (state[action.payload.emoji] || 0) + action.payload.count
  })
})
