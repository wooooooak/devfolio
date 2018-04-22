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
    story : null,
    status : {
      deleteStatus : false
    }
  }

  componentDidMount () {
    const fectchStoryById = async () => {
      try {
        const { data } = await axios({
          method : 'GET',
          url: config.serverURL + '/story/story',
          params: { 
            storyId: this.props.storyId
          }
        })
        this.setState({
          story : data,
        })
      } catch (error) {
        console.log(error)
      }
    }
    fectchStoryById()
  }

  _deleteStory = async (e) => {
    const storyId = e.target.value
    try {
      const data = await axios({
        method : 'DELETE',
        url: config.serverURL + '/story/'+storyId,
        headers: {'x-access-token': localStorage.devfolio_token}
      })
      this.setState({
        ...this.state,
        status : {
          deleteStatus : true
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    if(this.state.status.deleteStatus) {
      return <Redirect to={`/myStories/${localStorage.displayName}`}> </Redirect>
    }
    if(this.state.story){
      return <Story story={this.state.story} 
                  curUserEmail={this.props.user.email}
                  deleteStory = {this._deleteStory}
                  />
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
    doLogout : bindActionCreators(action.user.do_logout, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StoryContainer)
