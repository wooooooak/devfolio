import React, { Component } from 'react'
import App from './App'
import { Provider } from 'react-redux'
import reducer from './reducer/index'
import { BrowserRouter } from "react-router-dom"
import configureStore  from './store/index'
import axios from 'axios'

const store = configureStore(reducer)

class Root extends Component {
  constructor(props) {
    super(props)
    if (!store.getState().user.isLogin && localStorage.displayName) {
      const _fetchUserData = async () => {
        const { data } = await axios({
          method : 'GET',
          url : "http://localhost:8082/api/user/getUserData",
          params: {
            displayName: localStorage.displayName
          }
        })
        // console.log(data)
        if (data) {
          store.dispatch({
            type:'DO_LOGIN',
            payload: data
          })
          console.log('root에서 로그인')
        }
      }
      _fetchUserData()
    }
  }

  render() {
    console.log('root render')
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
