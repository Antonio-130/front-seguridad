import React, { useContext, useState } from 'react'
import UsuarioContext from 'context/UsuarioContext'
import { Link } from 'react-router-dom'
import 'styles/estadoUsuario/ListOfEstados.css'
import EstadoUsuario from './EstadoUsuario'
import Loader from 'components/Loader'
import { getEstadosUsuario } from 'services/estadoUsuario'
import { useQuery } from 'react-query'
import { AddIcon } from 'assets/ui'

import ListOfValues from 'components/ListOfValues'

import { useChangeTitle } from 'hooks/useChangeTitle'

export default function ListOfestadosUsuario() {

  useChangeTitle('Estados de usuario')

  const {hasAccion} = useContext(UsuarioContext)

  const [estadosUsuario, setEstadosUsuario] = useState([])

  const { isLoading } = useQuery(['estadosUsuario'], getEstadosUsuario, {
    onSuccess: (data) => {
      setEstadosUsuario(data)
    }, refetchOnWindowFocus: false
  })

  return (
    <div className='estadosUsuario-container'>
      <header className='header-list'>
        <p>Nombre</p>
        <p>
          {hasAccion("create_estado") && (
            <Link to="/estadosUsuario/add" className='add-estado'>
              <AddIcon name="estado" />
            </Link>
          )}
        </p>
      </header>
      {/* {estadosUsuario.length > 0 ? estadosUsuario.map(estadoUsuario => {
        return (
          <EstadoUsuario
            key={estadoUsuario.id}
            id={estadoUsuario.id}
            nombre={estadoUsuario.nombre}
          />
        )
      }): <p className='msg-info'>No hay estados de usuario registrados</p>} */}

      <ListOfValues name="estados de usuario" values={estadosUsuario} Component={EstadoUsuario} />
      {isLoading && <Loader />}
    </div>
  )
}