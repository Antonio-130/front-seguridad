import React from 'react'

export default function FieldButton({type, name, ...props}) {
  return (
    <div className='form-btn-container'>
      <button type={type} className='form-btn' {...props}>{name}</button>
    </div>
  )
}