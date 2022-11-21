import React from 'react'
import 'styles/Form.css'
import FieldCheckbox from 'components/inputsForm/FieldCheckbox'

export default function CheckboxGroup({label, name, values, sections}) {
  return (
    <div className='checkboxGroup-container'>
      <div id="checkbox-group">
        <h1>
          {label}
        </h1>
      </div>
      <div role="group" aria-labelledby="checkbox-group" className='list-checkboxs'>
        {sections ? (
          sections.map(section => {
            return (
              <div key={section.nombre} className='checkbox-section'>
                <h3 className='chk-section-title'>
                  {section.nombre[0].toUpperCase() + section.nombre.slice(1)}
                </h3>
                {section.values.map(value => {
                  return (
                    <FieldCheckbox
                      key={value.id}
                      label={value.nombre[0].toUpperCase() + value.nombre.slice(1)}
                      name={name}
                      value={value.id}
                    />
                  )
                })}
              </div>
            )
          })
        ) : values.map(value => (
          <FieldCheckbox
            key={value.id}
            label={value.nombre[0].toUpperCase() + value.nombre.slice(1)}
            name={name}
            value={value.id}
          />
        ))}
      </div>
    </div>
  )
}