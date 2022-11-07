import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UsuarioContext from 'context/UsuarioContext'
import 'styles/estadoUsuario/EstadoUsuario.css'
import { UpdateIcon, DeleteIcon } from 'assets/ui'

export default function EstadoUsuario({id, nombre}) {

  const {hasAccion} = useContext(UsuarioContext)

  return (
    <>
      <div className="estadoUsuario-container">
        <p>{nombre}</p>
        <div>
          {hasAccion("update_estado") &&
            <button>
              <Link to={`/estadosUsuario/update/${id}`}>
                <UpdateIcon name="estado de usuario" />
              </Link>
            </button>}
          {hasAccion("delete_estado") &&
            <button>
              <DeleteIcon name="estado de usuario" />
            </button>}
        </div>
      </div>
    </>
  )
}