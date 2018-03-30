import React from 'react'
import styles from './StoryList.scss'
import classNames from 'classnames/bind'
import renderHTML from 'react-render-html'
import { Link } from "react-router-dom"
import Moment from 'react-moment'

const cx = classNames.bind(styles)

const StoryList = ({stories}) => {
  let arr = []
  if (stories) {
    arr = stories.map((el)=>{
      console.log(el)
      let url = `/story/${el._id}`
      return(
        <div className={cx('story')}>
          <h2 className={cx('title')}>{el.title}</h2>
          <div>
            <Moment format="YYYY.MM.DD">
                {el.startDate}
            </Moment>
              ~
            <Moment format="YYYY.MM.DD">
                {el.endDate}
            </Moment>
          </div>
          
          <div>{el.content ? renderHTML(el.content) : null}</div>
          <Link to={url}> {url} </Link>
        </div>
      )
    })
  }

  return (
    <div className={cx('listContainer')}>
      {arr}
    </div>
  )
}

export default StoryList