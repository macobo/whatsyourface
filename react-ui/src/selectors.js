import { createSelector } from 'reselect'
import { chain } from 'lodash'
import * as initialFilters from './initialFilterList'

const getUsers = (state) => state.users

const getActiveUserId = (state) => state.uuid

const getCustomFilters = (state) => state.customFilters

export const getPictureFilter = (state) => state.pictureFilter

export const getPictureFilterWeight = (state) => state.pictureFilterWeight

export const getActiveUsers = createSelector(
  [getUsers, getActiveUserId],
  (users, uuid) =>
    chain(users)
      .values()
      .sortBy((user) => [user.id === uuid, user.active, user.active ? 0 : user.lastUpdate])
      .reverse()
      .value()
)

export const getFilterOptions = createSelector(
  [getCustomFilters],
  (filters) => [
    initialFilters.noneOption,
    { label: 'Custom filters', options: filters },
    { label: 'Style transfer', options: initialFilters.defaultStyleTransfer },
    { label: 'PixelJS styles', options: initialFilters.pixelsJSFilters }
  ]
)
