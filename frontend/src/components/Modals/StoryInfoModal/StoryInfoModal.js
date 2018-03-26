import React, { Component } from 'react'
import Modal from "react-modal"
import styles from "./StoryInfoModal.scss"
import classNames from "classnames/bind"
import DatePicker from "react-datepicker"
import { WithContext as ReactTags } from 'react-tag-input'


const cx = classNames.bind(styles)
// class StoryInfoModal extends Component {
const StoryInfoModal = ({
                        showModal,onClickCloseModal,onChangeStartDate,
                        onChangeEndDate, startDate, endDate, tags,
                        suggestions,tagHandleDelete,tagHandleAddition,
                        tagHandleDrag,tagHandleTagClick
                        }) => {

    return(
      <div>
        <Modal
          isOpen={showModal}
          onRequestClose={onClickCloseModal}
          className={cx('modalBox')}
          contentLabel="Minimal Modal Example"
          style={cx('Modal')}
          >
          <div>프로젝트 기간이 어떻게 되나요?</div>
          <div className={cx('dateSelector')}>
            <DatePicker 
              className={cx('startDatePicker')}
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={(e)=>onChangeStartDate(e)}
              placeholderText="start date"
              />
            <div>~</div>
            <DatePicker
              className={cx('endDatePicker')}
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              onChange={(e)=>onChangeEndDate(e)}
              placeholderText="end date"
            />
          </div>
          <p>어떤 기술이 들어있나요?</p>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            handleDelete={tagHandleDelete}
            handleAddition={tagHandleAddition}
            handleDrag={tagHandleDrag}
            handleTagClick={tagHandleTagClick}
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
          <p>소스 링크를 걸어주세요!</p>

        </Modal>
      </div>
    )
}

export default StoryInfoModal