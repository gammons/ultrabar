import * as constants from '../constants'

export const loadConfig = (config) => {
  return {
    type: constants.LOAD_CONFIG,
    config,
  }
}
