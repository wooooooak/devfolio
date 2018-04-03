import React, {Component} from 'react'
import styles from './EditSpace.scss'
import classNames from 'classnames/bind'
import { WithContext as ReactTags } from 'react-tag-input'

const cx = classNames.bind(styles)

class EditSpace extends Component {
  constructor(props) {
    super(props)
    const skillArr = Object.keys(this.props.user.space).map((d,i) => ({id:i+1,text:d}))
    const langArr = Object.keys(this.props.user.language).map((d,i) => ({id:i+1,text:d}))

    this.state = {
      skillTags : skillArr,
      langTags : langArr
    }
  }

  render() {
    console.log(this.props.user.space)
    if(this.props.title == 'skill'){
      return (
        <div>
        <p style={{marginLeft:'100px'}}>space</p>
        <ReactTags
              tags={this.state.skillTags}
              suggestions={this.props.suggestions}
              handleDelete={this.props.tagHandleDelete}
              handleAddition={this.props.tagHandleAddition}
              handleDrag={this.props.tagHandleDrag}
              handleTagClick={this.props.tagHandleTagClick}
              onChange = {e =>console.log(e.target.value)}
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
        </div>
      )
    } else if(this.props.title == 'language'){
      return (
        <div>
        <p style={{marginLeft:'100px'}}>language </p>
        <ReactTags
              tags={this.state.langTags}
              suggestions={this.props.suggestions}
              handleDelete={this.props.tagHandleDelete}
              handleAddition={this.props.tagHandleAddition}
              handleDrag={this.props.tagHandleDrag}
              handleTagClick={this.props.tagHandleTagClick}
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
        </div>
      )
    }else {
      return <p>this.props.title 없음</p>
    }
  }
}

export default EditSpace
