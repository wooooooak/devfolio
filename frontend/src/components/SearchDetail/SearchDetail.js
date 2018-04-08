import React, {Component} from 'react'
import styles from './SearchDetail.scss'
import { Link, Redirect } from "react-router-dom"
import classNames from 'classnames/bind'
import { WithContext as ReactTags } from 'react-tag-input'
import { TAGS } from "tags.js"
import axios from 'axios'
import config from 'jsconfig.json'

const cx = classNames.bind(styles)

class SearchDetail extends Component {
  state = { 
      tags : [],
      userSelected : []
   }

   handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
     tags: tags.filter((tag, index) => index !== i),
    })
    }

    handleAddition = async (tag) => {
        let { tags } = this.state
        this.setState({ tags: [...tags, { id: tags.length + 1, text: tag }] })
        tags.push({id : tags.length+1, text: tag})
        const { data } = await axios({
            method: 'post',
            url  : config.serverURL + '/user/tag',
            data : {
                tags : tags
            }
        })
        const topUsers = data.users.slice(0,7)
        this.setState({
            ...this.state,
            userSelected : topUsers
        })
        // console.log(data.users)
        
    }

    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags]

        // mutate array
        tags.splice(currPos, 1)
        tags.splice(newPos, 0, tag)
    
        // re-render
        this.setState({ tags })
    }

    mapToUser = (array) => {
      return array.map((el,i) => {
          return <div>
                    <div>
                    <Link to={`/myStories/${el.user.displayName}`}>
                        <img className={cx('topImage')} src={el.user.picture} />
                    </Link>
                    <p className={cx('userEmail')}>{el.user.displayName}</p>
                    </div>
                 </div>
      })
    }
    
    render() {
      const topUsers = this.state.userSelected
      console.log(topUsers);
    return (
    <div className={cx('content')}>
        <div className={'animated zoomIn'}>
            <ReactTags tags={this.state.tags}
                    suggestions={TAGS}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    placeholder='어떤 기술?'
                    classNames={{
                        tags: cx('tagsClass'),
                        tagInput: cx('tagInputClass'),
                        tagInputField: cx('tagInputFieldClass'),
                        selected: cx('selectedClass'),
                        tag: cx('tagClass'),
                        remove: cx('removeClass'),
                        suggestions: cx('suggestionsClass'),
                        activeSuggestion: cx('activeSuggestionClass')
                      }}
                    />
            {topUsers.length
            ?<div> 
                <p>가장 알맞은 개발자들입니다</p>
                <div className={cx('UsersPlace')}>
                {this.mapToUser(topUsers)}
                 ...더보기
                </div>
              </div>
            : <div>
                <p>추천 검색어</p>
                <div className={cx('poplurSkill')}>
                    <div className={cx('pop1')}>

                    </div>
                    <div className={cx('pop2')}>
                        
                    </div>
                    <div className={cx('pop3')}>
                        
                    </div>
                    <div className={cx('pop4')}>
                        
                    </div>
                </div>
              </div> 
            }
            <button onClick={this.props.onClickDetailSearch}>돌아가기</button>
        </div>
    </div>
    )
  }
}

export default SearchDetail
