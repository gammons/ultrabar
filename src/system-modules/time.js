import React, { Component } from 'react'
import strftime from 'strftime'

export default class Time extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: null,
    }

    this.timeUpdate = this.timeUpdate.bind(this)
  }

  componentDidMount() {
    this.timeUpdate()
  }

  timeUpdate() {
    if (!this.props.moduleConfig) {
      this.setState({ time: null })
    } else {
      this.setState({time: strftime(this.props.moduleConfig.format)})
    }
    setTimeout(this.timeUpdate, 1000)
  }

  render() {
    return(
      <div>{this.state.time}</div>
    )
  }
}
