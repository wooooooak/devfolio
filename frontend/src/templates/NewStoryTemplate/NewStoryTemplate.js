import React from 'react'
import styles from './NewStoryTemplate.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const NewStoryTemplate = ({ children }) => (
  <div className={cx('newStory-template')}>
        {children}
  </div>
)

export default NewStoryTemplate

