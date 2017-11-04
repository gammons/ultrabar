import * as constants from '../constants'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case constants.MODULE_UPDATE:
      const newState = { ...state }
      newState[action.name] = action.result
      return newState
    default:
      return state
  }
}
