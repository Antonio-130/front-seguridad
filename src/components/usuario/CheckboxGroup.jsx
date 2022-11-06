import React from 'react'
import 'styles/Form.css'
import FieldCheckbox from 'components/inputsForm/FieldCheckbox'

export default function CheckboxGroup({label, name, values}) {
  return (
    <div className='checkboxGroup-container'>
      <div id="checkbox-group">
        <h1>
          {label}
        </h1>
      </div>
      <div role="group" aria-labelledby="checkbox-group" className='list-checkboxs'>
        {values.map(value => (
          <FieldCheckbox
            key={value.id}
            label={value.nombre[0].toUpperCase() + value.nombre.slice(1)}
            name={name}
            value={value.id.toString()}
          />
        ))}
      </div>
    </div>
  )
}