import React, { Component } from 'react'
import styles from './NewStoryForm.scss'
import classNames from 'classnames/bind'
import Editor from "react-medium-editor"
import ThumbsOk from "react-icons/lib/ti/thumbs-ok"
import DatePicker from "react-datepicker"
import MediumButton from "medium-button";
import 'react-datepicker/dist/react-datepicker.css'

// import DropZone from "react-dropzone"

require('medium-editor/dist/css/medium-editor.css')
require('medium-editor/dist/css/themes/beagle.css')
const editorBtns = [
  'bold', 'italic', 'underline','anchor','h2','h3',
  'quote','strikethrough','pre'
]

const cx = classNames.bind(styles)
  class NewStoryForm extends Component {
    state = {
      text:''
    }

  componentDidMount(){
    this.nameInput.focus()
  }

  handleChange = (text) => {
    this.setState({
      title:'',
      text: text
    })
  }

  handleImageUpload = (files) => {
    console.log(files[0])
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.nextSibling.focus()
    }
  }
  _handleKeyPressContent = (e) => {
    if (e.key === 'Enter') {
      console.log("dursdlurdrll")
      console.dir(e.target)
      // this.props.onChangeContent('</br>')
      // e.target.nextSibling.focus()
    }
  }

  render() {
    return(
      <div>
        {/* <h1 className={cx('story')} >Story</h1> */}
        {/* <div>{this.state.text}</div> */}
        {/* <DropZone
      multiple={false}
      accept="image/*"
      onDrop={this.handleImageUpload}>
      >
      <p>Drop an image or click to select a file to upload.</p>
    </DropZone> */}
        {/* <h3>img and name</h3> */}
        <button onClick={this.props.onClickshowModal}>adsf</button>
        <input
          className={cx('inputTitle')} 
          onKeyPress={this._handleKeyPress}
          ref={(input) => { this.nameInput = input; }}
          placeholder = " Title"
          onChange={(e)=>this.props.onChangeTitle(e.target.value)}
        />
        <Editor
          // ref={(el) => {this.Meditor = el}}
          className={cx('editor')}
          onChange={(content)=>this.props.onChangeContent(content)}
          onKeyPress={this._handleKeyPressContent}
          options={
            {
              toolbar: {
                // buttons: editorBtns,
                allowMultiParagraphSelection: true
              },
              anchor: {
                placeholderText: 'Paste or type a link',
              },
              placeholder: {
                /* This example includes the default options for placeholder,
                if nothing is passed this is what it used */
                text: '',
                hideOnClick: false
              },
              autoLink: true,
              extensions:{
                'pre': new MediumButton({
                  label:'<b>code</b>',
                  start: `<pre class=${cx('codePart')}>`,
                  end:   '</pre>'

                })
              }
            }
          }
        />
        <div className={cx('dateSelector')}>
          <DatePicker 
            className={cx('startDatePicker')}
            selected={this.props.startDate}
            selectsStart
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onChange={(e)=>this.props.onChangeStartDate(e)}
            placeholderText="start date"
            />
          <div>~</div>
          <DatePicker
            className={cx('endDatePicker')}
            selected={this.props.endDate}
            selectsEnd
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onChange={(e)=>this.props.onChangeEndDate(e)}
            placeholderText="end date"
          />
        </div>
        <ThumbsOk
          onClick = {this.props.saveStory}
          className={cx('ThumbsOkIcon')}
          size={50} 
        />
        <ThumbsOk
          onClick = {this.props.saveStory}
          className={cx('ThumbsOkIcon')}
          size={50}
        />

      </div>
    )
  }
  
}

export default NewStoryForm