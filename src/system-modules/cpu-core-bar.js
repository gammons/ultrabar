import React, { Component } from 'react'
import { BarChart, Bar, YAxis } from 'recharts'

import './cpu-core-bar.css'

export default class Cpu extends Component {
  render() {
    if (!this.props.modules) { return null }
    if (!this.props.modules['cpu-core-bar']) { return null }

    const formatted = this.props.modules['cpu-core-bar'].map(c => {
      return {name: 'Cpu 0', value: c}
    })

    return(
      <div className="cpu">
        <BarChart data={formatted} height={50} width={200}>
          <Bar dataKey='value' fill='#8884d8' />
          <YAxis
            axisLine={false}
            domain={[0, 100]}
            stroke='#333'
            tickLine={false}
            type="number"
          />
        </BarChart>
      </div>
    )
  }
}

