import * as types from './mutation-types'

const mutations = {
  [types.SET_CURRENT_PATH_INDEX](state, index) {
    state.currentPathIndex = index
  }
}

export default mutations