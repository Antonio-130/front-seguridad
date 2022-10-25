import React from 'react'

export default function FieldButton({type, name}) {
  return (
    <div className='form-btn-container'>
      <button type={type} className='form-btn'>{name}</button>
    </div>
  )
}