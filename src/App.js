import React, { Component } from 'react'
import './App.css'

const modules = {}
const mods = ["time"]
mods.forEach(m => {
  modules[m] = require(`./ultrabar/${m}/view`)
})

class App extends Component {
  render() {
    return (
      <div className="left-modules">
        <p>here I am bitches</p>
        {React.createElement(modules["time"].default)}
      </div>
    )
  }
}

export default App
