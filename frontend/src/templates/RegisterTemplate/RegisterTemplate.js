import React from 'react'
import styles from './RegisterTemplate.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const RegisterTemplate = ({ children }) => (
  <div className={cx('register-template')}>
      <div className={cx('register-box')}>
        <h1>회원 등록</h1>
        <p>거의다 끝났습니다. 추가로 몇가지 정보만 입력하세요.</p>
        {children}
        {/* 컨테이너임 */}
      </div>
  </div>
)

export default RegisterTemplate