import React, { Component } from 'react'

export default class I3 extends Component {
  render() {
    return(
      <div>
        <p>workspace: {this.props.modules.i3_current_workspace}</p>
        <p>workspaces: {this.props.modules.i3_workspaces}</p>
      </div>
    )
  }
}

