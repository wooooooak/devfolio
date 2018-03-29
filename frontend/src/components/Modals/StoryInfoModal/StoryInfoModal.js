import React from 'react'
import Modal from "react-modal"
import styles from "./StoryInfoModal.scss"
import classNames from "classnames/bind"
import DatePicker from "react-datepicker"
import MicrolinkCard from 'react-microlink'
import { WithContext as ReactTags } from 'react-tag-input'
import CheckIcon from "react-icons/lib/fa/check"

const cx = classNames.bind(styles)
const StoryInfoModal = ({
                          showModal,onClickCloseModal,onChangeStartDate,
                          onChangeEndDate, startDate, endDate, tags,
                          suggestions,tagHandleDelete,tagHandleAddition,
                          tagHandleDrag,tagHandleTagClick,addLink,sourceLink
                        }) => {
    return(
      <div>
        <Modal
          isOpen={showModal}
          onRequestClose={onClickCloseModal}
          className={cx('modalBox')}
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
          <p className={cx('linkText')}>소스 링크를 걸어주세요!</p>
          <input className={cx('sourceInput')} type="text"
                  onChange={addLink}
                  />
          {sourceLink ? <MicrolinkCard round target='_blank' url={sourceLink} /> : null}
          <p>
            <CheckIcon onClick={onClickCloseModal} className={cx('checkIcon')} size={30}/>
          </p>
        </Modal>
      </div>
    )
}

export default StoryInfoModal