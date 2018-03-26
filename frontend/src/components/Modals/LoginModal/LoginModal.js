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
    
  _facebookLogin = async () => {
    try {
      await hellojs('facebook').login({
        scope: 'friends, photos, publish'
      })
      let json = await hellojs('facebook').api('me')
      const { data } = await axios({
        method: 'POST',
        url: 'http://localhost:8082/api/auth/login',
        data: {
          email: json.email,
          username: json.name
        },
        responseType: 'json'
      })
      if (!data.isUser) {
        this.props.loginSuccess(json.email, json.name)
        this.setState({
          ...this.state,
          redirectRegister: true
        })
      } else {
        //서버에서 로그인 요청이 정상적으로 되었다면
        localStorage.devfolio_token = data.token
        localStorage.displayName = data.displayName
        // 위의 두가지 값은 로그아웃시 깨끗이 없애주어야 한다
        this.props.loginSuccess(json.email, json.name)
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
            <div className={cx('LoginBox')}>
              <button className={cx('googleLogin')}>google login</button>
              <button 
                onClick={()=>{this._facebookLogin()}}
                className={cx('facebookLogin')}>facebook login</button>
            </div>
        </Modal>
    )
  }

}

export default LoginModal