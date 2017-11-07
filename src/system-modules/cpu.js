import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'

export default class Cpu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.modules.cpu) {
      return
    }
    const data = this.state.data
    const firstCpu = nextProps.modules.cpu[0]
    data.push(firstCpu)
    if (data.length > 10) {
      data.shift()
    }
    console.log("data is ", data)
    this.setState({ data })
  }

  render() {
    if (!this.props.modules) { return null }
    if (!this.props.modules.cpu) { return null }
    return(
      <div>
        <ChartistGraph data={ {series: [this.state.data]} } type={'Line'} />
      </div>
    )
  }
}

