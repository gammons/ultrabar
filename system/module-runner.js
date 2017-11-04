import { execSync } from 'child_process'
import * as constants from '../src/constants'

export default class ModuleRunner {
  constructor(config, store) {
    this.config = config
    this.store = store
  }

  startProcessing() {
    this.config.right_modules.forEach(m => {
      this.update(m)
    })
  }

  update(module) {
    const result = execSync(`./src/ultrabar/${module.name}/update`).toString()
    const ret = {type: constants.MODULE_UPDATE, name: module.name, result}
    this.store.dispatch(ret)
    setTimeout(this.update.bind(this, module), module.updateInterval * 1000)
  }
}
