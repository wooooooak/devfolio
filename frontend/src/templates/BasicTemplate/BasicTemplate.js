import React from 'react'
import styles from './BasicTemplate.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const BasicTemplate = ({ children }) => (
  <div className={cx('basic-template')}>
    <main>
        {children}
    </main>
  </div>
)

export default BasicTemplate