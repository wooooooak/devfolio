import React, { Component } from "react"
import styles from './EditProfile.scss'
import classNames from 'classnames/bind'
import { WithContext as ReactTags } from 'react-tag-input'
import {SKILL_TAG} from "tags"
import {LANGUAGE_TAG} from "tags"

const cx = classNames.bind(styles)


class EditProfile extends Component {
  constructor(props) {
    super(props)
    const skillArr = Object.keys(this.props.user.space).map((d,i) => ({id:i+1,text:d}))
    const langArr = Object.keys(this.props.user.language).map((d,i) => ({id:i+1,text:d}))
    this.state = {
      displayName : this.props.user.displayName,
      skillTags : skillArr,
      languageTags : langArr
    }
  }

  _onSubmit = () => {
    const spaceObj = {}
    const langObj = {}
    for(let skill of this.state.skillTags){
      spaceObj[skill.text] = true
    }
    for(let lang of this.state.languageTags){
      langObj[lang.text] = true
    }
    this.props.changeProfile(
      this.state.displayName,
      spaceObj,
      langObj
    )
  }

   _skillTagHandleDelete = (i) => {
    this.setState({
      skillTags: this.state.skillTags.filter((tag, index) => index !== i),
    });
  }

  _skillTagHandleAddition = (tag) => {
    let { skillTags } = this.state
    this.setState({ skillTags: [...skillTags, { id: skillTags.length + 1, text: tag }] })
  }

  _skillTagHandleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.skillTags]

    // mutate array
    tags.splice(currPos, 1)
    tags.splice(newPos, 0, tag)

    // re-render
    this.setState({ tags })
  }

  _skillTagHandleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked')
  }

  _langTagHandleDelete = (i) => {
    this.setState({
      languageTags: this.state.languageTags.filter((tag, index) => index !== i),
    });
  }

  _langTagHandleAddition = (tag) => {
    let { languageTags } = this.state
    this.setState({ languageTags: [...languageTags, { id: languageTags.length + 1, text: tag }] })
  }

  _langTagHandleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.languageTags]

    // mutate array
    tags.splice(currPos, 1)
    tags.splice(newPos, 0, tag)

    // re-render
    this.setState({ tags })
  }

  _langTagHandleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked')
  }


  render() {
    console.log(this.state)
    return (
      <div className={cx('content')}>
        <img src={`${this.props.user.picture}`} />
        <input type='text' value={this.state.displayName} 
            onChange={e=>this.setState({displayName: e.target.value})}
        />
        <p>space</p>
        <ReactTags
              tags={this.state.skillTags}
              suggestions={SKILL_TAG}
              handleDelete={this._skillTagHandleDelete}
              handleAddition={this._skillTagHandleAddition}
              handleDrag={this._skillTagHandleDrag}
              handleTagClick={this._skillTagHandleTagClick}
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
        <p>language</p>
        <ReactTags
              tags={this.state.languageTags}
              suggestions={LANGUAGE_TAG}
              handleDelete={this._langTagHandleDelete}
              handleAddition={this._langTagHandleAddition}
              handleDrag={this._langTagHandleDrag}
              handleTagClick={this._langTagHandleTagClick}
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
            <button 
              className={cx('submitBtn')}
              onClick={this._onSubmit}>submit</button>
      </div>
    );
  }
}

export default EditProfile