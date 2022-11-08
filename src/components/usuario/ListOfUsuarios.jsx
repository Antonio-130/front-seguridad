import React, { useContext, useState } from 'react'
import Usuario from './Usuario'
import 'styles/usuario/ListOfUsuarios.css'
import Loader from 'components/Loader'
import { getUsuarios } from 'services/usuario'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

import { AddIcon } from 'assets/ui'

import ListOfValues from 'components/ListOfValues'

import UsuarioContext from 'context/UsuarioContext'

export default function ListOfUsuarios() {

  const {hasAccion} = useContext(UsuarioContext)

  const [usuarios, setUsuarios] = useState([])

  const { isLoading } = useQuery(['usuarios'], getUsuarios, {
    onSuccess: (data) => {
      setUsuarios(data.data)
    }, refetchOnWindowFocus: false
  })

  return (
    <div className='usuarios-container'>
      <header className='header-list'>
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Email</p>
        <p>Estado</p>
        <p>
        {hasAccion("create_usuario") && (
          <Link to="/usuarios/add" className='add-usuario'>
            <AddIcon name="usuario" />
          </Link>
        )}
        </p>
      </header>
      <ListOfValues name="usuarios" values={usuarios} Component={Usuario} />
      {isLoading && <Loader />}
    </div>
  )
}