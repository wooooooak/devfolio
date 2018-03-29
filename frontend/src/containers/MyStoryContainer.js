import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import action from "action"
import MyStories from "components/MyStories"
import axios from "axios"

class NewStoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stories : null
    }
  }
  
  componentDidMount() {
    const { email } = this.props.user
    console.log(email)
    const fetchUserStories = async () => {
       const {data} = await axios({
         method: "GET",
         url : "http://localhost:8082/api/story/getStories",
         params: {
           email: this.props.user.email
         },
         responseType: 'json'
       })
       this.setState({
         stories: data
       })
     } 
     fetchUserStories()
  }

  shouldComponentUpdate(nextProps,nextState) {
    return true
  }


  render() {
    console.log(this.props.user)
    console.log(this.state.stories)

    return (
      <MyStories 
          userData = {this.props.user}
          stories = {this.state.stories}
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
