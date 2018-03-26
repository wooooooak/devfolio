import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Redirect } from "react-router-dom"
import action from "action"
import NewStoryForm from "components/NewStoryForm"
import StoryInfoModal from "components/Modals/StoryInfoModal/StoryInfoModal"
import { WithContext as ReactTags } from 'react-tag-input'
import {TAGS} from "tags"

import axios from 'axios'

const divStyle = {
  width:'768px', // 디바이스가 줄어듦에따라 반응형으로 줄이자
  border: '5px solid white',
};


class NewStoryContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registerSuccess: false,
      title: null,
      content : null,
      startDate: null,
      endDate : null,
      showModal:true,
      tags: [],
      suggestions: TAGS
    }
  }
  _tagHandleDelete = (i) => {
    this.setState({
      tags: this.state.tags.filter((tag, index) => index !== i),
    });
  }

  _tagHandleAddition = (tag) => {
    let { tags } = this.state
    this.setState({ tags: [...tags, { id: tags.length + 1, text: tag }] })
  }

  _tagHandleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags]

    // mutate array
    tags.splice(currPos, 1)
    tags.splice(newPos, 0, tag)

    // re-render
    this.setState({ tags })
  }

  _tagHandleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked')
  }


  _onChangeTitle = (title) => {
    console.dir(title)
    this.setState({
      ...this.state,
      title: title
    })
  }

  _onChangeContent = (content) => {
    this.setState({
      ...this.state,
      content: content
    })
  }

  _onChangeStartDate = (date) => {
    this.setState({
      ...this.state,
      startDate: date
    })
  }
  _onChangeEndDate = (date) => {
    this.setState({
      ...this.state,
      endDate: date
    })
  }
  
  _showModal = () => {
    console.log('showModal()')
    this.setState({
      ...this.state,
      showModal: true
    })
  }
  _onClickCloseModal = () => {
    this.setState({
      ...this.state,
      showModal: false
    })
  }

  _saveStory = () => {
    console.log(this.state)
  }

  render(){
    // console.log(this.state)
    return(
          <div style={divStyle}>
            <NewStoryForm 
              onChangeTitle={this._onChangeTitle}
              onChangeContent={this._onChangeContent}
              saveStory={this._saveStory}
              onChangeStartDate={this._onChangeStartDate}
              onChangeEndDate={this._onChangeEndDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onClickshowModal = {this._showModal}
              />

            <StoryInfoModal
              showModal = {this.state.showModal}
              onClickCloseModal = {this._onClickCloseModal}
              onChangeStartDate={this._onChangeStartDate}
              onChangeEndDate={this._onChangeEndDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              tags={this.state.tags}
              suggestions={this.state.suggestions}
              tagHandleDelete={this._tagHandleDelete}
              tagHandleAddition={this._tagHandleAddition}
              tagHandleDrag={this._tagHandleDrag}
              tagHandleTagClick={this._tagHandleTagClick}
            />
          </div>
    )
  }

}

const mapStateToProps = (state) => {
  const {user} = state
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin2 : bindActionCreators(action.user.do_login2, dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(NewStoryContainer)