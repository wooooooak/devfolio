import React, {Component} from 'react'
import styles from './IntroThree.scss'
import classNames from 'classnames/bind'
import axios from "axios"
import { RadialChart, Hint } from "react-vis"

import config from "jsconfig.json"

import 'react-vis/dist/style.css'

const cx = classNames.bind(styles)

class IntroThree extends Component {
  state = {
    languageRank : null,
    value: false
  }

  componentDidMount() {
    const fetchLanguageRank = async () => {
      const { data } = await axios({
        method:'GET',
        url: config.serverURL+'/appInfo/getLanguageChart'
      })

      for(const lang of data) {
        lang['label'] = lang.key
      }
      
      this.setState({
        ...this.state,
        languageRank : data
      })
      
    }
    fetchLanguageRank()
  }

  _handleOnHover = (v) => {
    const language = v.key
    const user = v.value
    this.setState({
      value : {
        language : language,
        user : user
      }
    })
  }

  render () {
    const {value} = this.state;
    if (this.state.languageRank) {
      return (
      <div className={cx('content')}>
        <p className={cx('chartP')} >
          <RadialChart
            height = {300}
            width = {300}
            className = {cx('chart')}
            data={this.state.languageRank}
            getAngle={d => d.value}
            innerRadius={70}
            radius={140}
            showLabels
            labelsAboveChildren
            labelsStyle = {{color :'red'}}
            onValueMouseOver={this._handleOnHover}
            onSeriesMouseOut={v => this.setState({value: false})}
            >
            {value && <Hint value={value}/>}
          </RadialChart>
        </p>
        <h2 className={cx('text')}>devfolio 개발자가 사랑하는 언어</h2>
      </div>)

    }else{
      return <div>loading...</div>
    }
  }
}

export default IntroThree