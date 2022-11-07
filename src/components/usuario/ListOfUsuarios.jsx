import React, { useContext } from 'react'
import Usuario from './Usuario'
import 'styles/usuario/ListOfUsuarios.css'
import Loader from 'components/Loader'
import { getUsuarios } from 'services/usuario'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

import UsuarioContext from 'context/UsuarioContext'

export default function ListOfUsuarios() {

  const {hasAccion} = useContext(UsuarioContext)

  const { isLoading, data: usuarios} = useQuery(['usuarios'], getUsuarios, {
    refetchOnWindowFocus: false
  })

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
        <p></p>
      </header>
      {usuarios?.data?.length > 0 ? usuarios?.data?.map(usuario => {
        return (
          <Usuario key={usuario.id}
            id={usuario.id}
            nombre={usuario.nombre}
            apellido={usuario.apellido}
            email={usuario.email}
            estado={usuario.estado.nombre}
          />
        )
      }): <p className='msg-info'>No hay usuarios registrados</p>}
      {isLoading && <Loader />}
    </div>
  )
}