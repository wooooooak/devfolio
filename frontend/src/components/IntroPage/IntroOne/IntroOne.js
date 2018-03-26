import React from 'react'
import styles from './IntroOne.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const IntroOne = () => {
  return (
    <div className={cx('content')}>
        <h2 className={cx('text')}>hello devfoilo!</h2>
    </div>
  )
}

export default IntroOne