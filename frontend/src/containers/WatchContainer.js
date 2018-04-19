import React, {Component} from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from "redux"
import { Redirect } from "react-router-dom"
// import action from "action"
import Timeline from "components/Timeline"
import FollowedLine from "components/FollowedLine"
import axios from 'axios'
import config from "jsconfig.json"

class WatchContainer extends Component {
  state = { 
    data : null
   }
  componentDidMount () {
    this.fetchFollowdUser(this.props.user)
  }
  
  fetchFollowdUser = async (user) => {
    const data = await axios({
      method : "POST",
      url : config.serverURL + "/user/followedUsers",
      data : { 
        idArr : user.follower
      }
    })
    if(data){
      this.setState({
        data : data.data
      })
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.fetchFollowdUser(nextProps.user)
  }

  usersToFollowdLine = () => {
    const {users} =  this.state.data
    return users.map(user => {
      return <FollowedLine user = {user} />
    })
  }

  render() {
    if(this.state.data){
      return(
        <div>
          <Timeline data = {this.state.data}/>
          {this.usersToFollowdLine()}
        </div>
      ) 
    }else {
      return (
        <p>nothing</p>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { user } = state
  return {
    user
  }
}

export default connect(mapStateToProps,null)(WatchContainer)
