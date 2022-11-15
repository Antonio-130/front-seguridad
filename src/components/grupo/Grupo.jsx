import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import UsuarioContext from 'context/UsuarioContext'
import 'styles/grupo/Grupo.css'
import { ArrowDownIcon, ArrowUpIcon } from 'assets/ui'
import { UpdateIcon, DeleteIcon } from 'assets/ui'
import { useAccionesSections } from 'hooks/useAccionesSections'
import { InfoIcon } from 'assets/ui'

export default function Grupo({data}) {

  const {id, nombre, descripcion, acciones} = data

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
        <p onClick={handleToggleShowAcciones} style={styles}>{showAcciones ? <ArrowUpIcon/>:<ArrowDownIcon/>}</p>
        <div>
          {hasAccion("update_grupo") &&
            <button>
              <Link to={`/grupos/update/${id}`}>
                <UpdateIcon name="grupo" />
              </Link>
            </button>}
          {hasAccion("delete_grupo") &&
            <button>
              <DeleteIcon name="grupo" />
            </button>}
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
          <p className='tag-title'>{section.nombre[0].toUpperCase() + section.nombre.slice(1)}</p>
          {section.values.map(accion => {
            return (
              <TextWithTooltip
                key={accion.id_accion}
                text={accion.nombre}
                description={accion.descripcion}
              />
            )
          })}
        </div>
      )
    }
  ))
}

const TextWithTooltip = ({text, description}) => {
  return (
    <div className='tooltip'>
      <p>{text} <InfoIcon/> </p>
      <div className='tooltip-text'>
        <p>{description}</p>
      </div>
    </div>
  )
}

const styles = {
  textDecoration: 'underline',
  cursor: 'pointer'
}