import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UpdateIcon, DeleteIcon } from 'assets/ui'
import UsuarioContext from 'context/UsuarioContext'
import 'styles/estadoUsuario/EstadoUsuario.css'

export default function EstadoUsuario({ data }) {

  const { id, nombre } = data

  const { hasAccion } = useContext(UsuarioContext)

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