import React, {Component} from 'react'
import styles from './IntroTwo.scss'
import classNames from 'classnames/bind'
import config from "jsconfig.json"
import axios from "axios"
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

class IntroTwo extends Component {
  state = {
    stories : []
  }

  componentDidMount () {
    const getHItStory = async (count) => {
      const { data } = await axios({
        method: "GET",
        url : config.serverURL+"/story/viewCount/"+count
      })
      this.setState({
        stories : data
      })
    }
    getHItStory()
  }

  mapToCard = () => {
    return this.state.stories.map(story => {
      let img = story.images[0]
      let bg = `url("http://localhost:8082/images/sampleImg.png")`
      if(img) {
        bg = `url(${img})`
      }
      let tags = story.tags.map(tag => {
        return (
          <span>#{tag.text} </span>
        )
      })
      return(
        <div className={cx('item')}
        style={{backgroundImage : bg}}> 
        <Link exact to={`/story/${story._id}`}>
          <div className={cx('item__details')}> 
          <a href = "#">{story.title}</a>
          <br/>
          {tags}
          <br/>
          <Link exact to={`/myStories/${story.authorObject.displayName}`}>{story.authorObject.displayName}</Link>
          </div>
        </Link>
        </div>
      )
    })
  }

  render(){
    return (
      <div className={cx('content')}>
        <h2 className={cx('text')} >Our Recommendation</h2> 
        <div className={cx('grid')}>

          {this.state.stories.length !== 0
          ? this.mapToCard()
          : <p>데이터 없음</p>}
        </div>
        
      </div>
    )
  }
}

export default IntroTwo