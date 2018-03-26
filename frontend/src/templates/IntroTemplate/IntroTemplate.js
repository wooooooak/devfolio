import React from 'react'
import styles from './IntroTemplate.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const IntroTemplate = ({ children }) => (
  <div className={cx('intro-template')}>
    <main>
        {children}
    </main>
  </div>
)

export default IntroTemplate