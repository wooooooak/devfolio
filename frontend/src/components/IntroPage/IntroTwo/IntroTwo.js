import React, {Component} from 'react'
import styles from './IntroTwo.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class IntroTwo extends Component {
  state = {
  }

  componentDidMount() {

  }
  

  render(){
    // console.log('render()')
    return (
      <div className={cx('content')}>
        <h2 className={cx('text')} >this is Two</h2> 

        <div className={cx('grid')}>
            <div className={cx('item')}> 
                <div className={cx('item__details')}> 
                  <a href = "#">Nike Sport Applicaiton</a> <br></br>
                  #service #React #Android
                </div>
            </div>
            
            <div className={cx('item')}> 
              <div className={cx('item__details')}> 
              <a href = "#">Full Stack</a> <br></br>
                  #BackEnd #JS #HTML #CSS #Server
              </div>
            </div>

            <div className={cx('item')}> 
              <div className={cx('item__details')}> 
              <a href = "#">JavaScript</a><br></br>
                  #JS #BackEnd
              </div>
            </div>

            <div className={cx('item')} style={{backgroundImage : `url("https://alexandreesl.files.wordpress.com/2016/03/backand_frontand.png?w=690")`}}> 
              <div className={cx('item__details')}> 
              <a href = "#">Reservation Application</a> <br></br>
                  #Service #React #Android #IOS
              </div>
            </div>

            <div className={cx('item')} style={{backgroundImage : `url("https://alexandreesl.files.wordpress.com/2016/03/backand_frontand.png?w=690")`}}> 
              <div className={cx('item__details')}> 
              <a href = "#">Android Game</a> <br></br>
                  #Game #Unity #Android #IOS
              </div>
            </div>

            <div className={cx('item')} style={{backgroundImage : `url("https://alexandreesl.files.wordpress.com/2016/03/backand_frontand.png?w=690")`}}>
              <div className={cx('item__details')}> 
              <a href = "#">Robo Advisor</a> <br></br>
                  #Pyhton #R #Data #AI
              </div>
            </div>

            <div className={cx('item')} style={{backgroundImage : `url("https://alexandreesl.files.wordpress.com/2016/03/backand_frontand.png?w=690")`}}> 
              <div className={cx('item__details')}> 
              <a href = "#">Schedule Applicaition</a><br></br>
                  #Android #JAVA #IOS #X-CODE
              </div>
            </div>

            <div className={cx('item')} style={{backgroundImage : `url("https://alexandreesl.files.wordpress.com/2016/03/backand_frontand.png?w=690")`}}> 
              <div className={cx('item__details')}> 
              <a href = "#">Robo Advisor</a> <br></br>
                  #Pyhton #R #Data #AI
              </div>
            </div>

            <div className={cx('item')}> 
              <div className={cx('item__details')}> 
              <a href = "#">Data Algorithm</a> <br></br>
                  #data
              </div>
            </div>
        </div>
        
            
      </div>
    )
  }
}

export default IntroTwo