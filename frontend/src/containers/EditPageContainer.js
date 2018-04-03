import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import action from "action"
import EditProfile from "components/EditProfile"
import EditSpace from "components/EditSpace"

// import {SKILL_TAG} from "tags"
// import {LANGUAGE_TAG} from "tags"

class EditPageContainer extends Component {

  state = {
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps)
  }


  render () {

    const { user } = this.props
    if(this.props.user.email) {
      return (
        <div>
          <EditProfile user={user}
                      changeProfile = {this.props.changeProfile}
          />
          
        </div>
      )
    }else {
      return <div>로그인 안되거나 로그인 중</div>
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
    changeProfile : bindActionCreators(action.user.change_profile, dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPageContainer)
