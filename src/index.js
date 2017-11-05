import React from 'react'
import ReactDOM from 'react-dom'
import { Provider  } from 'react-redux'

import './index.css'
import App from './app'

import initializeStore from './store'

const Wrapper = () => {
  return(
    <Provider store={initializeStore()}>
      <App />
    </Provider>
  )
}

ReactDOM.render(<Wrapper />, document.getElementById('content'))
