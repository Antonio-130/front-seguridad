import React, {useContext} from "react"
import "styles/usuario/Usuario.css"
import { Link } from "react-router-dom"
import { deleteUsuario } from "services/usuario"

import UsuarioContext from "context/UsuarioContext"
import { UpdateIcon, LookupIcon, DeleteIcon } from "assets/ui"
export default function Usuario({data}) {

  const {id, nombre, apellido, email, estado} = data

  const {hasAccion} = useContext(UsuarioContext)

  const handleDeleteUsuario = () => {
    deleteUsuario(id)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="usuario-container">
        <p>{nombre}</p>
        <p>{apellido}</p>
        <p>{email}</p>
        <p>{estado.nombre}</p>
        <div>
          {hasAccion("get_usuario") &&
            <button>
              <Link to={`/usuarios/${id}`}>
                <LookupIcon name="usuario" />
              </Link>
            </button>}
          {hasAccion("update_usuario") &&
            <button>
              <Link to={`/usuarios/update/${id}`}>
                <UpdateIcon name="usuario" />
              </Link>
            </button>}
          {hasAccion("delete_usuario") &&
            <button>
              <DeleteIcon name="usuario" />
            </button>}
        </div>
      </div>
    </>
  )
}
