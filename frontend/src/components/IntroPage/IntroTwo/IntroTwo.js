import React, {Component} from 'react'
import styles from './IntroTwo.scss'
import classNames from 'classnames/bind'
import config from "jsconfig.json"
import axios from "axios"
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
      console.log(data)
      this.setState({
        stories : data
      })
    }
    getHItStory()
  }

  mapToCard = () => {
    console.log('map');
    return this.state.stories.map(story => {
      let img = story.images[0]
      let bg = `url("http://localhost:8082/images/sampleImg.png")`
      if(img) {
        bg = `url(${img})`
      }
      return(
        <div className={cx('item')}
        style={{backgroundImage : bg}}> 
          <div className={cx('item__details')}> 
          <a href = "#">{story.title}</a><br></br>
              #JS #BackEnd
          </div>
        </div>
      )
    })
  }

  render(){
    console.log(this.state)
    return (
      <div className={cx('content')}>
        <h2 className={cx('text')} >Our Recommendation</h2> 
        <div className={cx('grid')}>

          {this.state.stories.length !== 0
          ? this.mapToCard()
          : <p>sdfsdf</p>}
        </div>
        
      </div>
    )
  }
}

export default IntroTwo