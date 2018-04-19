import React from 'react'
import styles from './MyStories.scss'
import classNames from 'classnames/bind'
import ProfileImg from 'components/ProfileImg'
import StoryList from 'components/StoryList'

const cx = classNames.bind(styles)

const MyStories = ({userData, stories, chartData}) => {
  const spaces = userData.space
  const languages = userData.language
  let Sarr = []
  let Larr = []
  if (spaces) {
    for (const key of Object.keys(spaces)) {
      if(spaces[key]) Sarr.push(key)
    }
  }
  if (languages) {
    for(const key of Object.keys(languages)) {
      if(languages[key]) Larr.push(key)
    }
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
          <ProfileImg userData={userData}/>
          <p className={cx('displayName')}>{userData.displayName}</p>
          <p className={cx('whatCanIDo')}>What can i do?</p>
          <div className={cx('spacesBox')}>
            {spaceArr}
          </div>
          <div className={cx('languagesBox')}>
            {languageArr}
          </div>
          <p className={cx('email')}>{userData.email}</p>
        </div>

        {/* 반응형을 위한 가짜 공간 */}
        <div className={cx('fakeAboutMe')}></div>
        <StoryList stories = {stories}
                  chartData = {chartData}
        />
      </div>
    )
}

export default MyStories