import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import action from "action"
import IntroOne from "components/IntroPage/IntroOne"
import IntroTwo from "components/IntroPage/IntroTwo"
import IntroThree from "components/IntroPage/IntroThree"
import Footer from "components/Footer"

class IntroContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registerSuccess: false,
      move: null
    }
  }
  
  render(){
    return(
      <div >
        <IntroOne onClickDownBtn={this._onClickDownBtn}></IntroOne>
        <div ref={(el) => this.introTwo = el }>
          <IntroTwo></IntroTwo>
        </div>
        <IntroThree></IntroThree>
        <Footer></Footer>
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
    doLogin : bindActionCreators(action.user.do_login, dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(IntroContainer)