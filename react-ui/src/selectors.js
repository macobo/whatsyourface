import { createSelector } from 'reselect'
import { chain, values } from 'lodash'

const getUsers = (state) => state.users

export const getActiveUsers = createSelector(
  [getUsers],
  (users) =>
    chain(values(users))
      .reject({ image: null })
      .value()

)
