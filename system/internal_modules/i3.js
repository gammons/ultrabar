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
      const ret = {type: constants.MODULE_UPDATE, name: 'i3_workspaces', result: workspaces}
      this.store.dispatch(ret)
    })
  }
}
