import React, {Component} from 'react'
import styles from './IntroTwo.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class IntroTwo extends Component {
  state = {
    startOffset : null,
    translateX: -50,
    opacity : 0,
    scale: 0
  }

  componentDidMount() {
    console.log('IntroTwo did mount()')
    window.addEventListener('scroll', this._handleScroll)
  }
  
  //휠6번 정도만 translate가 바뀌네
  //그리고 휠 한번에 100px이 움직인다
  _handleScroll = () => {
    // console.log(window.outerHeight+window.pageYOffset)
    let startOffset = window.outerHeight+window.pageYOffset
    let divValue = window.outerHeight/5
    let outerHeight = window.outerHeight + 100
    
    // console.log(`window.outerHeight+300 ${window.outerHeight+300}`)
    // console.log(`startOffset is ${startOffset}`)
    // console.log(`window.outerHeight+(divValue*2) is ${window.outerHeight+(divValue*2)}`)
    // console.log(`window.outerHeight+(divValue*3) is ${window.outerHeight+(divValue*3)}`)
    if(outerHeight <= startOffset && startOffset <= outerHeight+divValue){
      this.setState({
        translateX :  10,
        opacity: 0.2,
        scale:0.2
      })
    }else if(outerHeight+divValue <= startOffset && startOffset <= outerHeight+(divValue*2)){
      console.log('thingoe !!!');
      this.setState({
        translateX :  60,
        opacity: 0.3,
        scale:0.5
      })
    }else if(outerHeight+(divValue*2) <= startOffset && startOffset <= outerHeight+(divValue*3)){
      this.setState({
        translateX :  130,
        opacity: 0.4,
        scale:0.9
      })
    }else if(outerHeight+(divValue*3) <= startOffset && startOffset <= outerHeight+(divValue*4)){
      this.setState({
        translateX :  175,
        opacity: 0.6,
        scale: 1
      })
    }else if(outerHeight+(divValue*4) <= startOffset && startOffset <= outerHeight+(divValue*5)){
      this.setState({
        translateX :  250,
        opacity: 1,
        scale: 1
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll',this._handleScroll)
  }

  render(){
    console.log('render()')
    return (
      <div className={cx('content')}>
        <h2 className={cx('text')} >this is Two</h2>
        <div className={cx('box')} style={{transform:`translate(${this.state.translateX}px,0px)`,opacity:`${this.state.opacity}`}}>
          
        </div>
        <div className={cx('box')} style={{transform:`scale(${this.state.scale}) translate(${this.state.translateX}px,0px)`,opacity:`${this.state.opacity}`}}>
        </div>
        <div className={cx('box')} style={{transform:`scale(${this.state.scale}) translate(-${this.state.translateX}px,0px)`,opacity:`${this.state.opacity}`}}>
        </div>
      </div>
    )
  }
}

export default IntroTwo