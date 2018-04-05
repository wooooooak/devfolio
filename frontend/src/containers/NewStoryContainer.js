import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Redirect } from "react-router-dom"
import action from "action"
import NewStoryForm from "components/NewStoryForm"
import StoryInfoModal from "components/Modals/StoryInfoModal/StoryInfoModal"
import { WithContext as ReactTags } from 'react-tag-input'
import moment from 'moment'

import axios from 'axios'
import config from 'jsconfig.json'

import {TAGS} from "tags"

const divStyle = {
  width:'768px', // 디바이스가 줄어듦에따라 반응형으로 줄이자
  border: '5px solid white',
};

const suggestions = TAGS

class NewStoryContainer extends Component {
  constructor (props) {
    super(props)
    if(this.props.storyId){
      console.log(this.props.storyId)
    }
    this.state = {
      title: null,
      content : null,
      startDate: null,
      endDate : null,
      showModal: false,
      tags: [],
      sourceLink: null,
      redirectMyStory: false,
      images : []
    }
  }

  componentDidMount () {
    if (this.props.storyId) {
      const fectchStoryById = async () => {
        try {
          const { data } = await axios({
            method : 'GET',
            url: config.serverURL + '/story/getStory',
            params: { 
              storyId: this.props.storyId
            }
          })
          this.setState({
            ...this.state,
            title : data.title,
            content : data.content,
            startDate: moment(data.startDate),
            endDate: moment(data.endDate),
            tags : data.tags,
            sourceLink : data.sourceLink,
            images: data.images
          })
          // console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
      fectchStoryById()
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

  _addImage = (link) => {
    console.log(link)
    console.log(this.state.images);
    let arr = this.state.images
    arr.push(link)

    this.setState({
      ...this.state,
      images : arr
    })
  }

  _onChangeTitle = (title) => {
    this.setState({
      ...this.state,
      title: title
    })
  }

  _onChangeContent = (content) => {
    console.log(content)
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
  _onAddLink = (link) => {
    this.setState({
      ...this.state,
      sourceLink: link.target.value
    })
  }

  _saveStory = async () => {
    const data = await axios({
      method: 'POST',
      url: config.serverURL+'/story/addStory',
      headers: {'x-access-token':localStorage.devfolio_token},
      data: {
        storyInfo : this.state
      }
    })
    if (data.status === 200) {
      this.setState({
        ...this.state,
        redirectMyStory: true
      })
    }
    console.log(data)
  }

  render(){
    console.log(this.props.storyId)
    if (this.state.redirectMyStory) {
      <Redirect path="/myStory" />
    }

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
              addImage = {this._addImage}
              model = {this.state.content}
              title = {this.state.title}
              isModify = {this.props.storyId ? true : false}
              />

            <StoryInfoModal
              showModal = {this.state.showModal}
              onClickCloseModal = {this._onClickCloseModal}
              onChangeStartDate={this._onChangeStartDate}
              onChangeEndDate={this._onChangeEndDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              tags={this.state.tags}
              suggestions={suggestions}
              tagHandleDelete={this._tagHandleDelete}
              tagHandleAddition={this._tagHandleAddition}
              tagHandleDrag={this._tagHandleDrag}
              tagHandleTagClick={this._tagHandleTagClick}
              addLink = {this._onAddLink}
              sourceLink = {this.state.sourceLink}
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
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(NewStoryContainer)