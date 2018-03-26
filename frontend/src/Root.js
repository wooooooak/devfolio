import React, { Component } from 'react'
import App from './App'
import { Provider } from 'react-redux'
import reducer from './reducer/index'
import { BrowserRouter } from "react-router-dom"
import configureStore  from './store/index'

const store = configureStore(reducer)

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Root
