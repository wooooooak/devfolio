import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Redirect } from "react-router-dom"
import action from "action"
import axios from 'axios'

class StoryContainer extends Component {
  state = {
    story : null
  }

  componentDidMount () {
    const fectchStoryById = async () => {
      try {
        const {data} = axios({
          method : 'GET',
          url: 'http://localhost:8082/api/story/getStory',
          params: { 
            storyId: this.props.storyId
          }
        })
        this.setState({
          story : data
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fectchStoryById()
  }

  render () {
    console.log(this.props.storyId)
    return(
      <div>{this.props.storyId}</div>
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

export default connect(mapStateToProps,mapDispatchToProps)(StoryContainer)
