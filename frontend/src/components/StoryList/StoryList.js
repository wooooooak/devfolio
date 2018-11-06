import React from 'react'
import styles from './StoryList.scss'
import classNames from 'classnames/bind'
import { Link } from "react-router-dom"
import Moment from 'react-moment'
import SkillChart from 'components/SkillChart'

const cx = classNames.bind(styles)

const StoryList = ({stories , chartData}) => {
  let arr = []
  if (stories) {
    arr = stories.map((el, i)=>{
      let hash = el.tags.map(tag => {
        return <span>#{tag.text} </span>
      })
      let url = `/story/${el._id}`
      let storyDirection = 'story_left'
      let storyContainer = 'storyContainer'
      if(i%2 !== 0) { 
        storyDirection = 'story_right'
        storyContainer = 'storyContainer_revese'
       }
      return(
        <div className={cx(storyContainer)}>
          <div className={cx(storyDirection)}>
          <Link to={url}><h2 className={cx('title')}>{el.title}</h2></Link>
            <h2 className={cx('subTitle')}>{el.subTitle}</h2>
            <div>
              <Moment format="YYYY.MM.DD">
                  {el.startDate}
              </Moment>
                ~
              <Moment format="YYYY.MM.DD">
                  {el.endDate}
              </Moment>
            </div>
            <span>{hash}</span>
            <a href = {`${el.sourceLink}`} target='blank'>source</a>
          </div>
        </div>
      )
    })
  }
      return (
        <div className={cx('listContainer')}>
          {/* <div className={cx('aboutMe')}> 태블릿 이하일때 보여주자 </div> */}
          <SkillChart chartData = {chartData}/>
          {arr.length !== 0 ? arr : <p> 아무것도없는데요??</p>}
        </div>
      )

}

export default StoryList