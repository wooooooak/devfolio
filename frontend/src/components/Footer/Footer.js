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
        sssss
      </div>
    )
  }
}

export default Footer;
