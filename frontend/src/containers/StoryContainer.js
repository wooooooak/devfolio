import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Redirect } from "react-router-dom"
import Story from 'components/Story'
import action from "action"
import axios from 'axios'
import config from "jsconfig.json"

class StoryContainer extends Component {
  state = {
    story : null
  }

  componentDidMount () {
    const fectchStoryById = async () => {
      try {
        const {data} = await axios({
          method : 'GET',
          url: config.serverURL + '/story/getStory',
          params: { 
            storyId: this.props.storyId
          }
        })
        this.setState({
          story : data
        })
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fectchStoryById()
  }

  render () {
    console.log(this.state.story)
    if(this.state.story){
      return <Story story={this.state.story} curUserName={this.props.user.displayName}/>
    }else {
      return <div>{this.props.storyId}</div>
    }
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
