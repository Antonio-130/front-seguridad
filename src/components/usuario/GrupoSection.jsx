import React from 'react'
import 'styles/Form.css'
import FieldCheckbox from 'components/inputsForm/FieldCheckbox'

export default function GrupoSection({label, values}) {
  return (
    <div className='grupos-container'>
      <div id="checkbox-group">
        <h1>
          {label}
        </h1>
      </div>
      <div role="group" aria-labelledby="checkbox-group" className='grupos-list'>
        {values.map(grupo => (
          <FieldCheckbox
            key={grupo.id}
            label={grupo.nombre[0].toUpperCase() + grupo.nombre.slice(1)}
            name='grupos'
            value={grupo.id.toString()}
          />
        ))}
      </div>
    </div>
  )
}