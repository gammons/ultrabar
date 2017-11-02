import React from 'react'
import ReactDOM from 'react-dom'
import { Provider  } from 'react-redux'

import './index.css'
import App from './App'

import initializeStore from './store'

const Wrapper = () => {
  return(
    <Provider store={initializeStore()}>
      <App />
    </Provider>
  )
}

const Test = () => {
  return(
    <p>testing</p>
  )

}

ReactDOM.render(<Wrapper />, document.getElementById('content'))
