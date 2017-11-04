import { createClient } from 'i3'

import * as constants from '../../src/constants'

export default class I3Client {
  constructor(store) {
    this.store = store
    this.i3 = createClient()

    this.getWorkspaces()

    this.i3.on('workspace', () => {
      this.getWorkspaces()
    })
  }

  getWorkspaces() {
    this.i3.workspaces((_, workspaces) => {
      const nums = workspaces.map(w => w.num)
      const current = workspaces.filter(w => w.visible)[0].num
      const ret = {type: constants.MODULE_UPDATE, name: 'i3_workspaces', result: nums}
      this.store.dispatch(ret)
      const ret2 = {type: constants.MODULE_UPDATE, name: 'i3_current_workspace', result: current}
      this.store.dispatch(ret2)
    })
  }
}
