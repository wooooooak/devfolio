import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Redirect } from "react-router-dom"
import action from "action"
import IntroOne from "components/IntroPage/IntroOne"
import IntroTwo from "components/IntroPage/IntroTwo"
import IntroThree from "components/IntroPage/IntroThree"
import axios from 'axios'

class IntroContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registerSuccess: false
    }
    console.log('introContainer')
    if(localStorage.devfolio_token) {
      console.log('login 하자')
      this._fetchUserData()
      // console.log(user)
    }
  }
  
  _fetchUserData = async () => {
    const {data} = await axios({
      method : 'GET',
      url : "http://localhost:8082/api/user/getUserData",
      headers: {'x-access-token' : localStorage.devfolio_token}
    })
    console.log(data)
    if(!data){
      return
    }
    this.props.doLogin(data.email, data.displayName, data.picture, data.space, data.language)
    // return data
  }

  render(){
    return(
      <div>
        <IntroOne></IntroOne>
        <IntroTwo></IntroTwo>
        <IntroThree></IntroThree>
        <IntroTwo></IntroTwo>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {user} = state
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin : bindActionCreators(action.user.do_login, dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(IntroContainer)