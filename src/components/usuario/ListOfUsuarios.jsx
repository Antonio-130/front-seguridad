import { useContext } from 'react'
import { useQuery } from 'react-query'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { Link } from 'react-router-dom'
import { getUsuarios } from 'services/usuario'
import { AddIcon } from 'assets/ui'
import Usuario from './Usuario'
import Loader from 'components/Loader'
import UsuarioContext from 'context/UsuarioContext'
import 'styles/usuario/ListOfUsuarios.css'

import FilterAndPagination from 'components/FilterAndPagination'

export default function ListOfUsuarios() {

  useChangeTitle('Usuarios')

  const { id } = JSON.parse(localStorage.getItem('usuario'))

  const { hasAccion } = useContext(UsuarioContext)

  const { isLoading, data: usuarios } = useQuery(['usuarios'], getUsuarios, {
    refetchOnWindowFocus: false,
    initialData: [],
  })

  return (
    <div className='usuarios-container'>
      <header className='header-list'>
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Email</p>
        <p>Fecha Creacion</p>
        <p>Estado</p>
        <p>
        {hasAccion("create_usuario") && (
          <Link to="/usuarios/add" className='add-usuario'>
            <AddIcon name="usuario" />
          </Link>
        )}
        </p>
      </header>
      {isLoading && <Loader />}
      <FilterAndPagination
        values={usuarios.filter(user => user.id !== id).map(user => {
          return {
            ...user,
            estado: user.estado.nombre,
            fecha_creacion: new Date(user.fecha_creacion).toLocaleDateString(),
          }
        })}
        cant={10}
        name='usuarios'
        Component={Usuario}
        filterFields={['nombre', 'apellido', 'email', 'fecha_creacion', 'estado']}
      />
    </div>
  )
}