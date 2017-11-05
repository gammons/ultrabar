import { execSync } from 'child_process'
import * as constants from '../src/constants'

export default class ModuleRunner {
  constructor(config, store) {
    this.config = config
    this.store = store
    this.update = this.update.bind(this)
  }

  startProcessing() {
    (this.config.right_modules || []).forEach(this.update);
    (this.config.left_modules || []).forEach(this.update);
    (this.config.center_modules || []).forEach(this.update)
  }

  update(module) {
    if (module.name) {
      const result = execSync(`/home/grant/.config/ultrabar/${module.name}/update`).toString()
      const ret = {type: constants.MODULE_UPDATE, name: module.name, result}
      this.store.dispatch(ret)
    }
    if (module.updateInterval) {
      setTimeout(this.update.bind(this, module), module.updateInterval * 1000)
    }
  }
}
