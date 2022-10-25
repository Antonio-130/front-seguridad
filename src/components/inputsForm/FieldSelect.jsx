import React from 'react'
import { Field } from 'formik'

export default function FieldSelect({label, name, options}) {
  return (
    <div className='form-select-container'>
      <label htmlFor={name} className='form-input-label'>{label}</label>
      <Field as="select" name={name} id={name} className="form-input-select">
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.nombre[0].toUpperCase() + option.nombre.slice(1)}
          </option>
        ))}
      </Field>
    </div>
  )
}
