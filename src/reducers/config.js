import * as constants from '../constants'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
  case constants.LOAD_CONFIG:
    return action.config
  default:
    return state
  }
}
