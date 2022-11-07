import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import UsuarioContext from 'context/UsuarioContext'
import 'styles/grupo/Grupo.css'
import { useAccionesSections } from 'hooks/useAccionesSections'

export default function Grupo({id, nombre, descripcion, acciones}) {

  const {hasAccion} = useContext(UsuarioContext)

  const [showAcciones, setShowAcciones] = useState(false)

  const accionesSections = useAccionesSections(acciones)

  const handleToggleShowAcciones = () => {
    setShowAcciones(!showAcciones)
  }

  return (
    <>
      <div className="grupo-container">
        <p>{nombre}</p>
        <p>{descripcion}</p>
        <p onClick={handleToggleShowAcciones} style={styles}>{showAcciones ? "Ocultar":"Mostrar"}</p>
        <div>
          {hasAccion("update_grupo") && <button><Link to={`/grupos/update/${id}`}>Editar</Link></button>}
          {hasAccion("delete_grupo") && <button >Eliminar</button>}
        </div>
      </div>
      {showAcciones && (
        <div className='acciones-container'>
          <ListOfAcciones sections={accionesSections}/>
        </div>
      )}
    </>
  )
}

const ListOfAcciones = ({sections}) => {
  return (
    sections.map(section => {
      return (
        <div className='tag' key={section.nombre}>
          <p className='tag-title'>{section.nombre}</p>
          {section.values.map(accion => {
            return (
              <p key={accion.id_accion}>{accion.nombre}</p>
            )
          })}
        </div>
      )
    }
  ))
}

const styles = {
  textDecoration: 'underline',
  cursor: 'pointer'
}