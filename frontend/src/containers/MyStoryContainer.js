import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import action from "action"
import MyStories from "components/MyStories"
import { getUserDataByDisplayName } from "lib/fetch"

class MyStoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stories : null,
      userData : null,
      chartData : null
    }
  }
  
  componentDidMount() {
    const fetchUserStoriesAndUserData = async () => {
      let charData = {}
      const data = await getUserDataByDisplayName(this.props.displayName)
      data.stories.forEach((story) => {
        if (story.tags.length !==0) {
          story.tags.forEach((tag) => {
            if (!charData[tag.text]) {
              charData[tag.text] = {name : tag.text, project : 1}
            }else {
              charData[tag.text].project++
            }
          })
        }
      })
      const Data = Object.keys(charData).map((key) => {
        return { name : key, project : charData[key].project}
      })
      if(data){
         this.setState({
           stories: data.stories,
           userData: data,
           chartData : Data
         })
       }
     }
     fetchUserStoriesAndUserData()
  }
  
  render() {
    if(this.state.userData){
      return (
        <MyStories 
            userData = {this.state.userData}
            stories = {this.state.stories}
            chartData = {this.state.chartData}
          />
      )
    }else {
      return(
        <div>그런 사람 없는데요????</div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin : bindActionCreators(action.user.do_login, dispatch),
    doLogout : bindActionCreators(action.user.do_logout, dispatch),
    redirectHomeTrue : bindActionCreators(action.devfolio.redirect_true, dispatch),
    redirectHomeFalse : bindActionCreators(action.devfolio.redirect_false, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyStoryContainer)
