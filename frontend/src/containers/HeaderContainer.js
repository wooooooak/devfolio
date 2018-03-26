import React, {Component} from 'react'
import Header from "components/Header"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import action from "action"
import hellojs from "hellojs"

hellojs.init({
  facebook : 1611729235527991
}, {redirect_uri: '/redirect.html'})

class HeaderContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin : localStorage.displayName ? true : false,
      isLoginButtonClicked : false,
      showMenuBg : this.props.showMenuBg,
      userName : localStorage.displayName ? localStorage.displayName : null,
      showSideBar : false
    } 
  }

  online = (session) => {
    var currentTime = (new Date()).getTime() / 1000;
    return session && session.access_token && session.expires > currentTime
  }

  componentDidMount() {
    window.addEventListener('scroll', ()=>{this._handleScroll()})
  }

  _showModal = () => {
    this.setState({
      isLoginButtonClicked : true
    })
  }

  _onClickModalCancel = () => {
    this.setState({
      isLoginButtonClicked : false
    })
  }

  _handleScroll = () => {
    if (!this.state.showMenuBg && window.pageYOffset !== 0) {
      this.setState({
        showMenuBg : true
      })
    } else if (window.pageYOffset === 0) {
      this.setState({
        showMenuBg : false,
        isLoginButtonClicked : false,
      })
    }
  }

  _clickNickname = (showSideBar) => {
    this.setState({
      ...this.state,
      showSideBar: !this.state.showSideBar
    })
  }

  _loginSuccess = (email, name) => {
    this.props.doLogin(email, name)
    this.setState({
      ...this.state,
      userName: localStorage.displayName
    })
  }
  
  //redux값이 변경되서 Props를 받을때다.
  componentWillReceiveProps(nextProps) {
    this.setState({
      isLogin: localStorage.displayName,
      userName : nextProps.user.displayName
    })
  }

  shouldComponentUpdate(nextProps,nextState) {
    return true
  }
  
  render() {
    return (
      <Header
        isLogin = {this.state.isLogin}
        userName = {this.state.userName}
        isLoginButtonClicked = {this.state.isLoginButtonClicked}
        showMenuBg = {this.state.showMenuBg}
        loginSuccess = {this._loginSuccess}
        showModal = {this._showModal}
        onClickModalCancel = {this._onClickModalCancel}
        clickNickname = {this._clickNickname}
        showSideBar = {this.state.showSideBar}
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
    doLogin : bindActionCreators(action.user.do_login, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderContainer)