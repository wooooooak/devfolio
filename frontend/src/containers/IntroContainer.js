import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Redirect } from "react-router-dom"
import action from "action"
import IntroOne from "components/IntroPage/IntroOne"
import IntroTwo from "components/IntroPage/IntroTwo"
import axios from 'axios'

class IntroContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registerSuccess: false
    }
  }

  render(){
    return(
      <div>
        <IntroOne></IntroOne>
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
    doLogin2 : bindActionCreators(action.user.do_login2, dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(IntroContainer)