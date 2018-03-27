import React, { Component } from 'react'
import styles from './MyStories.scss'
import classNames from 'classnames/bind'
import ProfileImg from 'components/ProfileImg'

const cx = classNames.bind(styles)

const MyStories = ({userData}) => {
  const spaces = userData.space
  const languages = userData.language
  let Sarr = []
  let Larr = []
  for (const key of Object.keys(spaces)) {
    if(spaces[key]) Sarr.push(key)
  }
  for(const key of Object.keys(languages)) {
    if(languages[key]) Larr.push(key)
  }
  let spaceArr = Sarr.map((el)=>{
    return <p className={cx('space')}>{el}</p>
  })
  let languageArr = Larr.map((el)=>{
    return <p className={cx('language')}>{el}</p>
  })
    return (
      <div className={cx('content')}>

        <div className={cx('aboutMe')}>
          <ProfileImg src={userData.picture}/>
          <p className={cx('displayName')}>{userData.displayName}</p>
          <div className={cx('spacesBox')}>
            {spaceArr}
          </div>
          <div className={cx('languagesBox')}>
            {languageArr}
          </div>
          <p className={cx('email')}>{userData.email}</p>
        </div>

        <div className={cx('aboutPortfolio')}>
          
        </div>

      </div>
    )
}

export default MyStories