import React, { Component } from 'react'

import "./i3.css"

export default class I3 extends Component {
  constructor(props) {
    super(props)
    this.renderWorkspace = this.renderWorkspace.bind(this)
  }

  renderWorkspace(workspace, idx) {
    const classNames = ['workspace']
    if (workspace.visible) {
      classNames.push('visible')
    }
    return(
      <div className={classNames.join(" ")} key={idx}>
        {idx + 1}
      </div>
    )
  }

  render() {
    if (!this.props.modules) { return null }
    if (!this.props.modules.i3_workspaces) { return null }
    return(
      <div className="workspaces">
        {this.props.modules.i3_workspaces.map(this.renderWorkspace)}
      </div>
    )
  }
}

