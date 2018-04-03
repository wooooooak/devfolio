import React, { Component } from 'react'
import styles from './NewStoryForm.scss'
import classNames from 'classnames/bind'
import ThumbsOk from "react-icons/lib/ti/thumbs-ok"
import FroalaEditor from 'react-froala-wysiwyg'
import axios from "axios"
import 'react-datepicker/dist/react-datepicker.css'
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/js/plugins/image_manager.min.js'
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css'

import config from 'jsconfig.json'

const cx = classNames.bind(styles)

class NewStoryForm extends Component {

  componentDidMount(){
    this.nameInput.focus()
  }

  handleChange = (text) => {
    this.setState({
      title:'',
      text: text
    })
  }

  _handleKeyPress = (e) => {
    console.log("key press")
    if (e.key === 'Enter') {
      console.dir(this.editor.$element[0])
      e.target.nextSibling.focus()
    }
  }


  render() {
    return(
      <div>
        <p className = {cx('infoInputBtnContainer')}>
          <button 
            className = {cx('infoInputBtn')}
            onClick={this.props.onClickshowModal}>project info
          </button>
        </p>
        <input
          className={cx('inputTitle')}
          value = {this.props.title}
          onKeyPress={this._handleKeyPress}
          ref={(input) => { this.nameInput = input; }}
          placeholder = "Title"
          onChange={(e)=>this.props.onChangeTitle(e.target.value)}
        />
        <div className = {cx('FroalaEditorA')}>
          <FroalaEditor
            ref = {(ref) => this.editor = ref}
            tag='textarea'
            config = {{
              placeholderText: 'Edit Your Content Here!',
              toolbarInline: true,
              charCounterCount: false,
              imageUploadURL: config.serverURL+'/story/uploadImage',
              imageUploadMethod: 'POST',
              fileMaxSize: 10 * 1024 * 1024, // 10MB
              events:{
                // 이 메서드는 내 로컬서버에 요청을 보낸다!
                // response는 내 서버의 응답임.
                'froalaEditor.image.uploaded' : async (e, editor, response) => {
                    response = JSON.parse(response)
                    console.log(response.link)
                    //insert함수의 첫번째 인자는 이미지가 저장된 경로여야 한다.
                    //src에 들어갈 이미지 경로인데 그 이미지를 찾지못하면 something went wrong이 뜬다
                    editor.image.insert(response.link, true, null, editor.image.get(),response)
                    this.props.addImage(response.link)
                  }
                },
            }}
            onModelChange={this.props.onChangeContent}
            model = {this.props.model} 
            />
        </div>

        {this.props.isModify ? 
        <button>수정ok</button> : 
        <ThumbsOk
          onClick = {this.props.saveStory}
          className={cx('ThumbsOkIcon')}
          size={50}
        />}
        

      </div>
    )
  }
  
}

export default NewStoryForm