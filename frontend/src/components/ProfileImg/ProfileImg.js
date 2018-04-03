import React from 'react'
import styles from './ProfileImg.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const ProfileImg = ({src}) => {
  return (
    <div className={cx('profile_img_box')}>
      <img src={src}
          className={cx('profile_img')}
            />
      <div>팔로우</div>
    </div>
  )
}

export default ProfileImg