import React, {Component} from 'react'
import styles from './Timeline.scss'
import { Link } from "react-router-dom"
import classNames from 'classnames/bind'
import monent from "moment"

const cx = classNames.bind(styles)

class Timeline extends Component {
  state = {  }
  render() {
    const { stories, users } = this.props.data
    const arr = stories.map(story => {
      let a = monent(story.createdAt)
      return (
        <article>
          <div className={cx("inner")}>
            <span className={cx("date")}>
                  <span className={cx("day")}>{a.date()}<sup>th</sup></span>
                  <span className={cx("month")}>{a.month()+1}월</span>
                  <span className={cx("year")}>{a.year()}</span>
            </span>
            <div className={cx('card')}>
              <Link exact to={`/myStories/${story.authorObject.displayName}`}><h2>{story.authorObject.displayName}</h2></Link>
              <Link exact to={`/story/${story._id}`}>
              <div>
                <p className={cx('title')}>{story.title}</p>
                <p className={cx('subTitle')}>
                  {story.subTitle}
                </p>
              </div>
              </Link>
            </div>
          </div>
        </article>
      )
    })
    return (
      <div className={cx('content')}>
        <section id={cx("timeline")}>
          {arr}
        </section>
      </div>
    )
  }
}

export default Timeline
