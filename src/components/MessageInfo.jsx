import React from 'react'
import 'styles/MessageInfo.css'
import FieldButton from './inputsForm/FieldButton'

export const MessageInfo = ({ message, type, onClick}) => {
  return (
    <div className={`msg-info-container ${type}`}>
      <h1 className='message-info'>{message}</h1>
      <FieldButton type='button' name='Aceptar' onClick={onClick}/>
    </div>
  )
}

export const MessaggeErrorAndSuccess = (
  {
    isSuccess,
    messageSuccess,
    onClickSuccess,
    isError,
    messageError,
    onClickError,
  }
) => {
  return (
    <>
      {isSuccess && (
        <MessageInfo
          message={messageSuccess}
          type="success"
          onClick={onClickSuccess}
        />
      )}
      {isError && (
        <MessageInfo
          message={messageError}
          type="error"
          onClick={onClickError}
        />
      )}
    </>
  )
}