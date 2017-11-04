import yaml from 'js-yaml'
import os from 'os'
import fs from 'fs'

export default class Config {
  constructor() {
    this.config = null
  }

  getConfig() {
    if (this.config === null) {
      this._readConfig()
      return this.config
    } else {
      return this.config
    }
  }

  _readConfig() {
    try {
      this.config = yaml.safeLoad(fs.readFileSync(`./src/ultrabar/ultrabar.yml`, 'utf8'))
    } catch (e) {
      console.log('Could not read configuration', e)
    }
  }
}
