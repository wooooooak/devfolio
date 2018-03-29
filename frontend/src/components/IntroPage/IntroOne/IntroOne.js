import React from 'react'
import styles from './IntroOne.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const IntroOne = ({onClickDownBtn}) => {
  return (
    <div className={cx('content')}>
      <div className={cx('textBox')}>
        <h2 className={cx('textTitle')}>hello developer!</h2>
        <p className={cx('text')}>
                    Devfoilo는 <b>개발자를 위한 공간</b>입니다<br/>
                    당신이 front-end 개발자 또는 디자이너가 아니라도<br/>
                    이제 쉽게 웹에서 포트폴리오를 관리할 수 있습니다<br/>
                    자신을 알려보세요!
                    <p>단, code를 열람할 수 있는 링크가 필요합니다.</p>
         </p>
      </div>
      <div className={cx('sampleBox')}>
        <button onClick={onClickDownBtn}>down</button>
        
      </div>
    </div>
  )
}

export default IntroOne