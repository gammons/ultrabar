import React, { Component } from 'react'
import { toggleDock } from './actions/dock-actions'
import { connect } from 'react-redux'
import './app.css'

const modules = {}
modules["i3"] = require('./system-modules/i3')
modules["time"] = require('./system-modules/time')

class App extends Component {
  onToggleDock() {
    this.props.toggleDock()
  }

  renderModule(mod, idx) {
    const mapStateToModuleProps = (state) => {
      return {
        modules: state.modules,
        confit: state.config,
        moduleConfig: mod,
      }
    }

    if (mod.system === undefined) {
      if (typeof(mod[mod.name]) === 'undefined') {
        mod[mod.name] = require(`ultrabar/${mod.name}/view`)
      }
      return(
        <div key={idx} className="module">
          {React.createElement(connect(mapStateToModuleProps)(modules[mod.name].default))}
        </div>)
    } else {
      return(
        <div key={idx} className="module">
          {React.createElement(connect(mapStateToModuleProps)(modules[mod.system].default))}
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
