import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.scss'
import classNames from 'classnames/bind'
import Modal from "components/Modals/LoginModal/LoginModal"
import HambergerIcon from 'react-icons/lib/fa/align-right'
import Logo from "components/Logo"

const cx = classNames.bind(styles)

const Header = ({isLogin, loginSuccess, isLoginButtonClicked, userName,
               showMenuBg, showModal, onClickModalCancel,clickNickname, showSideBar, }) => {
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
                    <li><button onClick={()=>{localStorage.clear()}}> logout </button></li></li>
                 : <li className={cx('loginBtn')} onClick={showModal}>Login</li>}
                <li className={cx("hamberger")}><HambergerIcon onClick={clickNickname} size={38}/></li>
              </ul>
            </div>
          </header>
          <Modal isLoginButtonClicked = {isLoginButtonClicked}
                onClickModalCancle = {onClickModalCancel}
                loginSuccess = {loginSuccess} //이 함수는 dispatch
          />
        </div>
    )
  }else { //사이드바 버튼을 눌렀을 경우
    return(
      <div>
          <header className={cx('base','header',{showBG : showMenuBg})}>
            <div><Logo /></div>
            <div className={cx('sideBar')}>
              <button className={cx('hideSideBarBtn')} onClick={clickNickname}>x</button>
              <button onClick={()=>{localStorage.clear()}}> logout </button>
              -------------------------------------------------
              <p>search</p>
              -------------------------------------------------
              <p><Link exact to="/">Home</Link></p>
              <p><Link exact to="/myStories">your stories</Link></p>
              <p><Link exact to="/newStory">new story</Link></p>
              <p><Link exact to="/profile">profile</Link></p>
            </div>
          </header>
          

          <Modal isLoginButtonClicked = {isLoginButtonClicked}
                onClickModalCancle = {onClickModalCancel}
                loginSuccess = {loginSuccess} //이 함수는 dispatch
          />
        </div>
    )
  }
}

export default Header