import { createSelector } from 'reselect'
import { chain } from 'lodash'

const getUsers = (state) => state.users

const getActiveUserId = (state) => state.uuid

export const getActiveUsers = createSelector(
  [getUsers, getActiveUserId],
  (users, uuid) =>
    chain(users)
      .values()
      .sortBy((user) => [user.id === uuid, user.active])
      .reverse()
      .value()
)
