import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Redirect } from "react-router-dom"
import action from "action"
import MyStories from "components/MyStories"
import axios from "axios"
import { config } from 'rx';

class NewStoryContainer extends Component {
  constructor(props) {
    super(props)
    console.log('NewStoryContainer CONSTRUCTOR')
  }

  componentDidMount() {
    console.log(this.props.user)
  }

  _fetchUserData = async () => {
    const {data} = axios({
      method: "get",
      url : "http://localhost:8082/api/story/mystory",
      responseType: 'json',
      params: {
        email: this.props.user.email
      }
  })
  console.log(data)
} 

  render() {
    return (
      <MyStories 
          userData = {this.props.user}
        />
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin : bindActionCreators(action.user.do_login, dispatch),
    doLogout : bindActionCreators(action.user.do_logout, dispatch),
    redirectHomeTrue : bindActionCreators(action.devfolio.redirect_true, dispatch),
    redirectHomeFalse : bindActionCreators(action.devfolio.redirect_false, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewStoryContainer)
