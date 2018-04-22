import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Redirect } from "react-router-dom"
import action from "action"
import RegisterForm from "components/RegisterForm"
import axios from 'axios'
import { serverURL } from 'jsconfig.json'

class RegisterContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registerSuccess: false
    }
  }

  _onClickSubmit = async (submittedValues) => {
    try {
      const {displayName, space, language } = submittedValues
      this.props.commonRegister(displayName, space, language)
      const { data } = await axios({
        method:'post',
        url: serverURL + '/auth/register',
        data: this.props.user,
        responseType: 'json'
      })
      if(data.registerSuccess){
        this.setState({registerSuccess: true})
      }
    } catch (error) {
      console.log(error)
    }
  }

  render(){
    if (this.state.registerSuccess) {
      return <Redirect to="/"/>
    }
    // console.log(this.state.submittedValues)
    return(
      <RegisterForm 
        onClickSubmit = {this._onClickSubmit}
      />
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
    commonRegister : bindActionCreators(action.user.common_register, dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(RegisterContainer)