import React, {useState, useEffect, useContext} from 'react'
import Usuario from './Usuario'
import 'styles/usuario/ListOfUsuarios.css'
import { getUsuarios } from 'services/usuario'
import { Link } from 'react-router-dom'

import UsuarioContext from 'context/UsuarioContext'

export default function ListOfUsuarios() {

  const {hasAccion} = useContext(UsuarioContext)

  const [usuarios, setUsuarios] = useState([])

  const handleGetUsuarios = () => {
    getUsuarios()
    .then(data => {
      if (data.status === "success") {
        setUsuarios(data.data)
      }
      else {
        setUsuarios([])
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleDeleteUsuario = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id))
  }

  useEffect(() => {
    handleGetUsuarios()
  }, [])


  return (
    <div className='usuarios-container'>
      {hasAccion("create_usuario") && (
        <div className='add-usuario'>
          <Link to="/usuarios/add">Añadir</Link>
        </div>
      )}
      <header className='header-list'>
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Email</p>
        <p>Estado</p>
        <p>Acciones</p>
      </header>
      {usuarios.length > 0 ? usuarios.map(usuario => {
        return (
          <Usuario key={usuario.id}
            id={usuario.id}
            nombre={usuario.nombre}
            apellido={usuario.apellido}
            email={usuario.email}
            estado={usuario.estado.nombre}
            reloadUsuarioDelete={handleDeleteUsuario}
          />
        )
      }): <p className='msg-info'>No hay usuarios registrados</p>}
    </div>
  )
}