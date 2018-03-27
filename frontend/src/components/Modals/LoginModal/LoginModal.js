import React, { Component } from 'react'
import Modal from "react-modal"
import styles from "./LoginModal.scss"
import classNames from "classnames/bind"
import TiTimes from 'react-icons/lib/ti/times'
import hellojs from "hellojs"
import axios from "axios"
import { Redirect } from "react-router-dom"

hellojs.init({
  facebook : 1611729235527991
}, {redirect_uri: '/redirect.html'})

const cx = classNames.bind(styles)

console.log('LOGINMDAL CONSTUCTOR')
class LoginModal extends Component {
  state = { 
    showModal: false,
    redirectRegister : false,
    redirectHome : false
   }
   
   componentWillReceiveProps(nextProps) {
     this.setState({
       showModal: nextProps.isLoginButtonClicked
      })
    }
    shouldComponentUpdate(nextProps,nextState) {
      return true
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
        url: 'http://localhost:8082/api/auth/login',
        data: {
          picture: json.picture,
          email: json.email,
          username: json.name
        },
        responseType: 'json'
      })
      if (!data.isUser) { // 소셜로그인 한 유저가 우리 유저가 아닐경우 
        this.props.loginSuccess(json.email, json.name, json.picture)
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

  _closeModal = () => {
    this.props.onClickModalCancle()
    this.setState({
      showModal : false
    })
  }
    
  render() {
    let { redirectRegister, redirectHome } =  this.state
    if (redirectRegister) {
      return <Redirect to="/register"/>
    }
    if (redirectHome) {
      console.log('리다이렉트 홈..');
      return <Redirect to="/"/>
    }
    if(this.props.isLogout) {
      console.log('리다이렉트 홈 by logout..')
      return <Redirect to="/"/>
    }

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
          
            <h1>Login Here</h1>
            <i class="icon-aperture animate-spin"></i>

            <h2>User Name</h2>
            <input type = "text" className={cx('inputype')} name="" placeholder="Enter User Name" />
            <h2>Password</h2>
            <input type = "password" name="" className={cx('inputype')} placeholder="Enter Password" />
            <input type = "submit" name="" className={cx('submitB')} value="Login"/>
            
            <p><a href="#"> Lost your password? </a> <br></br>
            <a href="#"> Don't have an account? </a></p>

            <button className={cx('googleLogin')}>Google Login</button>
            <button 
              onClick={()=>{this._facebookLogin()}}
              className={cx('facebookLogin')}>Facebook Login</button>
          </div>
        </Modal>
    )
  }

}

export default LoginModal