import React from 'react'
import styles from './PageTemplate.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const PageTemplate = ({pageRenderingAni, children }) => (
  <div className={cx('page-template',{pageRenderingAni:pageRenderingAni})}>
    {/* {header} */}
    <main>
        {children}
    </main>
  </div>
)

export default PageTemplate