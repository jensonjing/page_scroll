import * as types from './mutation-types'

export const setPathIndex = function ({commit}, index) {
  commit(types.SET_CURRENT_PATH_INDEX, index)
}