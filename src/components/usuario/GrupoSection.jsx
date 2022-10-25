import React, {useEffect, useState} from 'react'
import 'styles/Form.css'
import FieldCheckbox from 'components/inputsForm/FieldCheckbox'

import { getGrupos } from 'services/grupo'

export default function GrupoSection() {

  const [grupos, setGrupos] = useState([]);

  const handleGetGrupos = () => {
    getGrupos().then(response => {
      setGrupos(response.data.map(grupo => {
        return {
          id: grupo.id,
          nombre: grupo.nombre
        }
      }));
    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    handleGetGrupos();
  }, []);

  return (
    <div className='grupos-container'>
      <div id="checkbox-group">
        <h1>
          Grupos
        </h1>
      </div>
      <div role="group" aria-labelledby="checkbox-group" className='grupos-list'>
        {grupos.map(grupo => (
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