import React, {useContext} from 'react'
import UsuarioContext from 'context/UsuarioContext'
import { Link } from 'react-router-dom'
import 'styles/estadoUsuario/ListOfEstados.css'
import EstadoUsuario from './EstadoUsuario'
import Loader from 'components/Loader'
import { getEstadosUsuario } from 'services/estadoUsuario'
import { useQuery } from 'react-query'
import { AddIcon } from 'assets/ui'

export default function ListOfestadosUsuario() {
  const {hasAccion} = useContext(UsuarioContext)

  const { isLoading, data: estadosUsuario} = useQuery(['estadosUsuario'], getEstadosUsuario, {
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.log(error)
    }
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
      {estadosUsuario?.data?.length > 0 ? estadosUsuario?.data?.map(estadoUsuario => {
        return (
          <EstadoUsuario
            key={estadoUsuario.id}
            id={estadoUsuario.id}
            nombre={estadoUsuario.nombre}
          />
        )
      }): <p className='msg-info'>No hay estados de usuario registrados</p>}
      {isLoading && <Loader />}
    </div>
  )
}