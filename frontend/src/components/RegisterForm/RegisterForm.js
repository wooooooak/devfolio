import React from 'react'
import styles from './RegisterForm.scss'
import classNames from 'classnames/bind'
import { Form, Text, Checkbox } from "react-form"

const cx = classNames.bind(styles)

const spaceArr = [
  "web_frontend","web_backend","app","database","game",
  "mobile_game","network","AI","devOps","linux","git","algorithm"
]

const languageArr = [
  "C","C#","C++","Java","JavaScript","Python",
  "Ruby","Scalar","F#","Swift","R","Go","PHP","Haskell"
]

const Space = ({spaceName}) => {
  return (
    <div className={cx('checkboxs')}>
      <label htmlFor={`${spaceName}`} className={cx('checkboxLabel')} >{spaceName}</label>
      <Checkbox field={['space',`${spaceName}`]} id={`${spaceName}`} className={cx("checkbox")} />
    </div>
  )
}

const Language = ({language}) => {
  return (
    <div className={cx('checkboxs')}>
      <label htmlFor={`${language}`} className={cx("checkboxLabel")}>{language}</label>
      <Checkbox field={['language',`${language}`]} id={`${language}`} className={cx("checkbox")} />
    </div>
  )
}

const RegisterForm = ({onClickSubmit}) => {
  return (
    <div >
      <Form onSubmit={submittedValues => onClickSubmit(submittedValues)} >
      {formApi => (
        <form onSubmit={formApi.submitForm} className={cx('registerFormBox')}>
          <label htmlFor="displayName" className={cx('nameLabel')}>Display Name</label>
          <Text field="displayName" id="displayName" className={cx('nameInput')}/>
          <div className={cx('checkboxs')}>
            <p>나를 어필할 수 있는 분야들</p>
            {spaceArr.map((el) => {
              return (
                <Space spaceName={el} />
              )
            })}
          </div>
          <div className={cx('checkboxs')}>
            <p>자신있는 프로그래밍 언어</p>
            {languageArr.map((el) => {
              return (
                <Language language={el} />
              )
            })}
          </div>
            <button type="submit" className={cx("submitBtn")}>
              가입
            </button>
        </form>
      )}
      </Form>
    </div>
  )
}

export default RegisterForm