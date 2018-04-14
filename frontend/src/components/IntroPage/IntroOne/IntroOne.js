import React, {Component} from 'react'
import styles from './IntroOne.scss'
import { Redirect } from "react-router-dom"
import classNames from 'classnames/bind'
import SearchDetail from "components/SearchDetail"
import Ionicon from 'react-ionicons'

const cx = classNames.bind(styles)

class IntroOne extends Component {

  state = {
    searchName: '',
    renderRedirect : false,
    detailPage : false
  }

  _onChangeSearch = (e) => {
    this.setState({
      ...this.state,
      searchName : e.target.value
    })
  }

  _onKeyPress = (e) => {
    if( e.key == 'Enter' ) {
      this.setState({
        renderRedirect : true
      })
    }
  }
  _onClickDetailSearch = () => {
    this.setState({
      detailPage : !this.state.detailPage
    })
  }

  render() {
    const { detailPage , renderRedirect } = this.state
    if(renderRedirect){
      return <Redirect to={`/myStories/${this.state.searchName}`} />
    }

    if( !detailPage ) {
      return (
        <div className={cx('content')}>
          <div className={cx('textBox')}>
            <h2 className={cx('textTitle')}>Hello <span>dev</span>eloper!</h2>
            <p className={cx('text')}>
              Devfoilo는 <b>개발자를 위한 공간</b>입니다<br/>
              당신이 front-end 개발자 또는 디자이너가 아니라도<br/>
              이제 쉽게 웹에서 포트폴리오를 관리할 수 있습니다<br/>
              자신을 알려보세요!
              <p>단, 당신의 code를 열람할 수 있는 <a href="https://www.github.com" target="blank">github</a>
               또는 <a target="blank" href="https://gist.github.com/">gist</a>링크가 필요합니다.</p>
            </p>
            <div className={cx('searchBox')}>
              <Ionicon icon="md-search"
                className={cx('searchBtn')}
                rotate={true} 
                fontSize="30px" 
                color="#ff6b6b"
                />
              <input 
                    className={cx('searchByName')}
                    type="text" 
                    placeholder="  닉네임으로 포트폴리오 보기"  
                    onChange = {this._onChangeSearch} 
                    onKeyPress = {this._onKeyPress} 
                    />
            </div>
            {/* <p>or</p> */}
            <button
              className={cx('detailSearch')}
              onClick = {this._onClickDetailSearch}>자세히 찾아보기
            </button>
          </div>
        </div>
      )
    }else {
      return (
        <div>
          <SearchDetail onClickDetailSearch = {this._onClickDetailSearch} />
        </div>
      )
    }
  }
}

export default IntroOne