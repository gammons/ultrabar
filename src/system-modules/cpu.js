import React, { Component } from 'react'

export default class Cpu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.modules) { return null }
    if (!this.props.modules.cpu) { return null }
    return(
      <div>{this.props.modules.cpu[0]}</div>
    )
  }
}

