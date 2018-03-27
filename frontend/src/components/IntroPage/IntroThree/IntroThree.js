import React from 'react'
import styles from './IntroThree.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const IntroThree = () => {
  return (
    <div className={cx('content')}>
        <h2 className={cx('text')}>hello devfoilo!</h2>
    </div>
  )
}

export default IntroThree