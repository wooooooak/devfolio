import React from 'react'
import styles from './ProfileImg.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const ProfileImg = ({src}) => {
  return (
    <div className={cx('profile_img_box')}>
      <img src={src}
          className={cx('profile_img')}
            />
    </div>
  )
}

export default ProfileImg