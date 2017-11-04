import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

const modules = {}

const mapStateToModuleProps = (state) => {
  return {modules: state.modules}
}

class App extends Component {
  renderModule(module) {
    if (typeof(modules[module.name]) === 'undefined') {
      modules[module.name] = require(`./ultrabar/${module.name}/view`)
    }
    return React.createElement(connect(mapStateToModuleProps)(modules[module.name].default))
  }

  render() {
    return (
      <div className="left-modules">
        {this.props.right_modules.map(this.renderModule.bind(this))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modules: state.modules,
    right_modules: (state.config.right_modules || []),
  }
}

export default connect(mapStateToProps)(App)
