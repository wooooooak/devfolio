import React, { Component } from 'react'
import App from './App'
import { Provider } from 'react-redux'
import reducer from './reducer/index'
import { BrowserRouter } from "react-router-dom"
import configureStore  from './store/index'
import axios from 'axios'
import config from 'jsconfig.json'

const store = configureStore(reducer)

class Root extends Component {
  constructor(props) {
    super(props)
    console.log('root')
    if (!store.getState().user.isLogin && localStorage.displayName) {
      const _fetchUserData = async () => {
        const { data } = await axios({
          method : 'GET',
          url : config.serverURL+"/user/getUserData",
          params: {
            displayName: localStorage.displayName
          }
        })
        console.log(data)
        if (data) {
          store.dispatch({
            type:'AUTO_LOGIN',
            payload: data
          })
        }
      }
      _fetchUserData()
    }
  }

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
