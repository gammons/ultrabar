import * as constants from '../constants'

const INITIAL_STATE = {
  docked: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case constants.TOGGLE_DOCK:
      return {
        docked: !state.docked
      }
    default:
      return state
  }
}
