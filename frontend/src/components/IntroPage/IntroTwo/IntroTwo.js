import React from 'react'
import styles from './IntroTwo.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const IntroTwo = () => {
  return (
    <div className={cx('content')}>
        <h2 className={cx('text')}>this is Two</h2>
    </div>
  )
}

export default IntroTwo