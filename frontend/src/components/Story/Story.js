import React from 'react'
import styles from './Story.scss'
import { Link } from "react-router-dom"
import classNames from 'classnames/bind'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'
import monent from "moment"
// import FroalaEditor from 'react-froala-wysiwyg'
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css'

const cx = classNames.bind(styles)

const Story = ({story, curUserEmail ,deleteStory}) => {
  console.log(story)
  let startDate = monent(story.startDate)
  let endDate = monent(story.endDate)
  const tag = story.tags.map((tag)=>{
    return <span> #{tag.text} </span>
  })
  return(
    <div className={cx('showBox')}>
      <p className={cx('title')}>{story.title}</p>
      <p className={cx('subTitle')}>{story.subTitle}</p>
      <div className={cx('info')}>
        <Link className={cx('name')} to={`/myStories/${story.authorObject.displayName}`}>
            {story.authorObject.displayName}
          </Link>
        <p><span>{startDate.year()}.{startDate.month()}.{startDate.date()+1}</span>
        ~<span>{endDate.year()}.{endDate.month()}.{endDate.date()+1}</span></p>
        <p>{tag}</p>
        <span><a href={story.sourceLink} target="blank">소스보기</a></span>
      </div>
      <div className = {cx('FroalaViewerA')}>
        <FroalaEditorView
          model = {story.content}
        />
      </div>
      {/* 현재유저와 게시글작성자가 일치하면 수정버튼 랜더링 */}
      {story.author == curUserEmail
      ? <div>
          <Link to={`/newstory/${story._id}`}>
            <button className={cx('modifyBtn')}>
            수정
            </button>
          </Link>
          <button 
            className = {cx('deleteBtn')}
            onClick = {deleteStory} 
            value={story._id}>
              삭제 
          </button>
        </div> 
      : null}
    </div>
  )
}

export default Story