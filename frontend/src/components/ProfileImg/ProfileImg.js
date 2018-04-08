import React,{Component} from 'react'
import styles from './ProfileImg.scss'
import classNames from 'classnames/bind'
import axios from "axios"
import config from "jsconfig.json"

const cx = classNames.bind(styles)

class ProfileImg extends Component {
  state = {
    
  }
  _onClickFollowBtn = async (e) => {
    const followedEmail = e.target.value
    console.log(followedEmail)
    await this.props.addFollower(followedEmail)
  }

  render() {
    const {userData} = this.props
    if(!localStorage.email || userData.email == localStorage.email){
      return (
        <div className={cx('profile_img_box')}>
        <img src={userData.picture}
            className={cx('profile_img')}
            />
      </div>
      )
    }else { //로그인도 되어있고, 내 것이아닌 다른사람 페이지를 보고 있을 경우 rendering 시킬 부분
      const { follower } = this.props.user
      let showBtn = true
      console.log(userData._id);
      follower.forEach(element => {
        if (element == userData._id) {
          showBtn = false
        }
      })
      return (
        <div className={cx('profile_img_box')}>
        <img src={userData.picture}
            className={cx('profile_img')}
            />
        {
         showBtn 
         ? <button value={`${userData.email}`} onClick={this._onClickFollowBtn}>지켜보기</button>
         : <p>지켜보고있는중</p>
        
        }
      </div>
      )

    }
  }
}

export default ProfileImg