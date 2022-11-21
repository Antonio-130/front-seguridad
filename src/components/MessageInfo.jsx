import React from 'react'
import 'styles/MessageInfo.css'
import FieldButton from './inputsForm/FieldButton'

export default function MessageInfo({ message, type, onClick}) {
  return (
    <div className={`msg-info-container ${type}`}>
      <h1 className='message-info'>{message}</h1>
      <FieldButton type='button' name='Aceptar' onClick={onClick}/>
    </div>
  )
}