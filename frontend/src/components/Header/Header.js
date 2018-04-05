import React from 'react'
import { Link,Redirect } from 'react-router-dom'
import styles from './Header.scss'
import classNames from 'classnames/bind'
import Modal from "components/Modals/LoginModal/LoginModal"
import HambergerIcon from 'react-icons/lib/fa/align-right'
import Logo from "components/Logo"

const cx = classNames.bind(styles)

const Header = ({isLogin, loginSuccess, isLoginButtonClicked, userName,
               showMenuBg, showModal, onClickModalCancel,
               clickNickname, showSideBar, onClickLogout,
                isLogout, localRegister }) => {
  if(!showSideBar) { //사이드바 버튼을 누르지 않았을 경우.
    return(
      <div>
          <header className={cx('base','header',{showBG : showMenuBg})}>
            <div><Logo /></div>
            <div className={cx('header-wrapper')}>
              <ul>
                <li><Link exact to="/">Home</Link></li>
                <li><Link exact to="/about">what</Link></li>
                {isLogin
                 ? <li><button onClick={clickNickname} className={cx('userBtn')}>{userName}</button>
                    </li>
                 : <li className={cx('loginBtn')} onClick={showModal}>Login</li>}
                <li className={cx("hamberger")}><HambergerIcon onClick={clickNickname} size={38}/></li>
              </ul>
            </div>
          </header>
          <Modal isLoginButtonClicked = {isLoginButtonClicked}
                 onClickModalCancle = {onClickModalCancel}
                 loginSuccess = {loginSuccess} //이 함수는 dispatch
                 isLogout = {isLogout}
                 localRegister = {localRegister}
          />
        </div>
    )
  }else { //사이드바 버튼을 눌렀을 경우
    // if(renderHome) {
    //   console.log('renderHome');
    //   return <Redirect path="/" />
    // }
    return(
      <div>
          <header className={cx('base','header',{showBG : showMenuBg})}>
            <div><Logo /></div>
            <div className={cx('sideBarBG')}>
              <div className={cx('sideBar')}>

              {isLogin
              ? <div> 
                  <button className={cx('hideSideBarBtn')} onClick={clickNickname}>x</button>
                  <button onClick={onClickLogout}> logout </button>

                  <p>search</p>
                  -------------------------------------------------
                  <p><Link exact to="/">Home</Link></p>
                  <p><Link exact to={`/myStories/${userName}`}>your stories</Link></p>
                  <p><Link exact to="/addStory">new story</Link></p>
                  <p><Link exact to="/editProfile">profile</Link></p>
                </div>
              : <div>
                  <button className={cx('hideSideBarBtn')} onClick={clickNickname}>x</button>
                  <li className={cx('loginBtn')} onClick={showModal}>Login</li>
                </div>
              }
              </div>
            </div>
          </header>
          
          <Modal isLoginButtonClicked = {isLoginButtonClicked}
                onClickModalCancle = {onClickModalCancel}
                loginSuccess = {loginSuccess} //이 함수는 dispatch
                isLogout = {isLogout}
                localRegister = {localRegister}
          />
        </div>
    )
  }
}

export default Header