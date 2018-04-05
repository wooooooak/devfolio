import React, { Component } from 'react'
import Modal from "react-modal"
import styles from "./LoginModal.scss"
import classNames from "classnames/bind"
import TiTimes from 'react-icons/lib/ti/times'
import hellojs from "hellojs"
import axios from "axios"
import { Redirect } from "react-router-dom"
import { serverURL } from "jsconfig.json"

hellojs.init({
  facebook: 1611729235527991,
  google: '801032094039-7ebkgd5upmfogdtjiq0loc6m1aj5kma4.apps.googleusercontent.com'
}, {redirect_uri: '/redirect.html'})

const cx = classNames.bind(styles)

class LoginModal extends Component {
  state = { 
    showModal: false,
    redirectRegister : false,
    redirectHome : false,
    registerMode : false,
    registerEmail : '',
    emailErrorMsg : null,
    isEmailExist : false,
    passwd : null,
    passwdConfirm : false,
    passwdConfimMessgae : ''
   }
   
   componentWillReceiveProps(nextProps) {
     this.setState({
       showModal: nextProps.isLoginButtonClicked
      })
    }
    shouldComponentUpdate(nextProps,nextState) {
      return true
    }

  _googleLogin = async () => {
    try{
      await hellojs('google').login({
        scope: 'basic, email, photos'
      })
      let json = await hellojs('google').api('me')
      console.log(json)
      const { data } = await axios({
        method: 'POST',
        url: serverURL+'/auth/login',
        data: {
          picture: json.picture,
          email: json.email,
        },
        responseType: 'json'
      })
      if (!data.isUser) { // 소셜로그인 한 유저가 우리 유저가 아닐경우 
        this.props.loginSuccess(json.email, json.picture, true)
        this.setState({
          ...this.state,
          redirectRegister: true
        })
      } else { //소셜로그인 한 유저가 우리 유저일 경우
        console.log(data)
        //서버에서 로그인 요청이 정상적으로 되었다면
        localStorage.devfolio_token = data.token
        localStorage.email = data.email
        localStorage.displayName = data.displayName
        // 위의 두가지 값은 로그아웃시 깨끗이 없애주어야 한다
        this.props.loginSuccess(data.email, data.displayName, data.picture, data.space, data.language, )
        this.setState({
          ...this.state,
          redirectHome: true
        })
      }
      this._closeModal()
    } catch (error) {
      alert('Signin error: ' + error.message)
    }
  }
    
  _facebookLogin = async () => {
    try {
      await hellojs('facebook').login({
        scope: 'friends, photos, publish'
      })
      let json = await hellojs('facebook').api('me',{width:200, height:200})
      console.log(json)
      const { data } = await axios({
        method: 'POST',
        url: serverURL+'/auth/login',
        data: {
          picture: json.picture,
          email: json.email,
        },
        responseType: 'json'
      })
      if (!data.isUser) { // 소셜로그인 한 유저가 우리 유저가 아닐경우 
        this.props.loginSuccess(json.email, json.picture, true)
        this.setState({
          ...this.state,
          redirectRegister: true
        })
      } else { //소셜로그인 한 유저가 우리 유저일 경우
        console.log(data)
        //서버에서 로그인 요청이 정상적으로 되었다면
        localStorage.devfolio_token = data.token
        localStorage.email = data.email
        localStorage.displayName = data.displayName
        // 위의 두가지 값은 로그아웃시 깨끗이 없애주어야 한다
        this.props.loginSuccess(data.email, data.displayName, data.picture, true, data.space, data.language )
        this.setState({
          ...this.state,
          redirectHome: true
        })
      }
      this._closeModal()
    } catch (error) {
        alert('Signin error: ' + error.message)
    }
  }

  _closeModal = () => {
    this.props.onClickModalCancle()
    this.setState({
      showModal : false,
      registerMode : false
    })
  }

  _onClickRegisterOrLogin = () => {
    console.log('registerMode ture');
    this.setState({
      ...this.state,
      registerMode : !this.state.registerMode
    })
  }

  _emailCheck = async () => {
    console.log('emailCheck')
    const { data } = await axios({
      method : 'GET',
      url : serverURL+'/auth/emailCheck',
      params:{
        email : this.state.registerEmail 
      }
    })
    console.log(data)
    const {message,isExist} = data
    if(isExist){
      this.setState({
        ...this.state,
        isEmailExist : isExist,
        emailErrorMsg : message
      })
    }else{
      this.props.localRegister(this.state.registerEmail, this.state.passwd)
      // this.props.loginSuccess(this.state.registerEmail)
      this.setState({
        ...this.state,
        isEmailExist : isExist,
        emailErrorMsg : message,
        redirectRegister: true
      })
    }
  }

  _onChangeRegisterEmail = (e) => {
    console.log(e.target.value)
    this.setState({
      ...this.state,
      registerEmail : e.target.value
    })
  }

  _onChangePwd = (e) => {
    console.log(e.target.value);
    this.setState({
      ...this.state,
      passwd : e.target.value
    })
  }

  _onChangePwd2 = (e) => {
    if(e.target.value == this.state.passwd) {
      this.setState({
        ...this.state,
        passwdConfirm:true,
        passwdConfimMessgae : '일치'
      })
      console.log('같습니다')
    }else {
      this.setState({
        ...this.state,
        passwdConfirm: false,
        passwdConfimMessgae : '불일치'
      })
    }
  }
    
  render() {
    // console.log(this.state);
    let { redirectRegister, redirectHome ,registerMode } =  this.state
    if (redirectRegister) {
      return <Redirect to="/register"/>
    }
    if (redirectHome) {
      console.log('리다이렉트 홈');
      return <Redirect to="/"/>
    }
    if(this.props.isLogout) {
      console.log('리다이렉트 홈 by logout')
      return <Redirect to="/"/>
    }

      if(!registerMode){
        return(
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={() => {this._closeModal()}}
            className={cx('content')}
            contentLabel="Minimal Modal Example"
          >   
              <button className={cx('closeBtn')}
                    onClick={() => {this._closeModal()}}><TiTimes size={32} /></button>
            <div className={cx('loginBox')}>
            
              <h1>Login Here</h1>
              <i className="icon-aperture animate-spin"></i>

              <h2>User Name</h2>
              <input type = "text" className={cx('inputype')} placeholder="Enter User Name" />
              <h2>Password</h2>
              <input type = "password" className={cx('inputype')} placeholder="Enter Password" />
              <button className={cx('submitB')}> Login </button>
              
              <p><a href="#"> Lost your password? </a> <br></br>
              <a href="#" onClick={this._onClickRegisterOrLogin}> Don't have an account? </a></p>

              <button 
                onClick={()=>{this._googleLogin()}}
                className={cx('googleLogin')}>Google Login</button>
              <button 
                onClick={()=>{this._facebookLogin()}}
                className={cx('facebookLogin')}>Facebook Login</button>
            </div>
          </Modal>
        )
      } else {
        return (
          <Modal
          isOpen={this.state.showModal}
          onRequestClose={() => {this._closeModal()}}
          className={cx('content')}
          contentLabel="Minimal Modal Example"
          >   
            <button className={cx('closeBtn')}
                  onClick={() => {this._closeModal()}}><TiTimes size={32} /></button>
            <div className={cx('loginBox')}>
          
            <h1>Register</h1>
            <i className="icon-aperture animate-spin"></i>

            <h2>Email</h2>
            <input type = "text" className={cx('inputype')} 
                    onChange = {this._onChangeRegisterEmail}
                    placeholder="Enter Email"
                     />
            {this.state.isEmailExist ? <p>{this.state.emailErrorMsg}</p> : null }
            <h2>Password</h2>
            <input type = "password" onChange={this._onChangePwd} className={cx('inputype')} placeholder="Enter Password" /> 
            <input type = "password" onChange={this._onChangePwd2} className={cx('inputype')} placeholder="Confirm Password" /> 
            {this.state.passwdConfirm ? <p>{this.state.passwdConfimMessgae}</p> : <p>{this.state.passwdConfimMessgae}</p> }
            <input type = "submit" className={cx('submitB')} onClick={this._emailCheck} value="regist"/>
            
            <p>
              {/* <a href="#"> Lost your password? </a> <br></br> */}
              <a href="#" onClick={this._onClickRegisterOrLogin}> already have an account? </a>
            </p>

            <button 
              onClick={()=>{this._googleLogin()}}
              className={cx('googleLogin')}>Google Login</button>
            <button 
              onClick={()=>{this._facebookLogin()}}
              className={cx('facebookLogin')}>Facebook Login</button>
          </div>
        </Modal>)
      }
  }

}

export default LoginModal