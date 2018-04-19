import React, {Component} from 'react'
import styles from './Footer.scss'
import { Redirect } from "react-router-dom"
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class Footer extends Component {
  state = {  }
  render() {
    return (
      <div className={cx('content')}>
        <p className={cx('logo')}>devfolio</p>
        <p className={cx('call')}><span>call : </span>010-3248-2227</p>
        <p>개인정보처리방침</p>
      </div>
    )
  }
}

export default Footer;
