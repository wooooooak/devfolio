import React, {Component} from 'react'
import styles from './FollowedLine.scss'
import { Link } from "react-router-dom"
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class FollowedLine extends Component {
  state = { 
  }

  a = () => {
    const {stories} = this.props.user
    console.log(stories)
    return stories.map(story => {
      return(
        <div className={cx('card')}>
        <Link exact to={`story/${story._id}`}>
          <h2>
            {story.title}
          </h2>
          <p>{story.subTitle}</p>
        </Link>
        </div>
      )
    })
  }

  render() {
    const {user} = this.props
    return (
      <div className={cx('content')}>
        <div className={cx('profile')}>
          <Link exact to={`myStories/${user.displayName}`}>
            <img src={user.picture} />
          </Link>
          {user.displayName}
        </div>
        {this.a()}
      </div>

    )
  }
}

export default FollowedLine
