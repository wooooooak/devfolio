import React from 'react'
import styles from './Logo.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const Logo = () => {
  return (
    <div>
      <Link to="/" className={cx('logo')}>
        devfolio
      </Link>
    </div>
  )
}

export default Logo