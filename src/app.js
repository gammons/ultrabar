import React, { Component } from 'react'
import { toggleDock } from './actions/dock-actions'
import { connect } from 'react-redux'
import './app.css'

const modules = {}
modules["i3"] = require('./system-modules/i3')

const mapStateToModuleProps = (state) => {
  return {modules: state.modules}
}

class App extends Component {
  onToggleDock() {
    this.props.toggleDock()
  }

  renderModule(module) {
    if (module.system === undefined) {
      if (typeof(modules[module.name]) === 'undefined') {
        modules[module.name] = require(`ultrabar/${module.name}/view`)
      }
      return(
        <div className="module">
          {React.createElement(connect(mapStateToModuleProps)(modules[module.name].default))}
        </div>)
    } else {
      return(
        <div className="module">
          {React.createElement(connect(mapStateToModuleProps)(modules[module.system].default))}
        </div>
      )
    }
  }

  renderTheme() {
    if (this.props.themeFile) {
      require(`ultrabar/themes/${this.props.themeFile}.css`)
    }
  }

  render() {
    return (
      <div id="dock" style={{height: this.props.height}}>
        {this.renderTheme()}
        <div className="left-modules">
          {this.props.left_modules.map(this.renderModule.bind(this))}
        </div>
        <div className="center-modules">
          {this.props.center_modules.map(this.renderModule.bind(this))}
        </div>
        <div className="right-modules">
          {this.props.right_modules.map(this.renderModule.bind(this))}
          <button className="toggler" style={{float: "right"}} onClick={this.onToggleDock.bind(this)}>Toggle Dock</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modules: state.modules,
    height: state.config.height,
    themeFile: state.config.theme,
    left_modules: (state.config.left_modules || []),
    right_modules: (state.config.right_modules || []),
    center_modules: (state.config.center_modules || []),
  }
}

export default connect(mapStateToProps, { toggleDock })(App)
