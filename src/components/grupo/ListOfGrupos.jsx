import React, {useContext} from 'react'
import UsuarioContext from 'context/UsuarioContext'
import {Link} from 'react-router-dom'
import 'styles/grupo/ListOfGrupos.css'
import Grupo from './Grupo'
import Loader from 'components/Loader'
import {getGrupos} from 'services/grupo'
import {useQuery} from 'react-query'

export default function ListOfGrupos() {
  const {hasAccion} = useContext(UsuarioContext)

  const { isLoading, data: grupos} = useQuery(['grupos'], getGrupos, {
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.log(error)
    }
  })

  return (
    <div className='grupos-container'>
      {hasAccion("create_grupo") && (
        <div className='add-grupo'>
          <Link to="/grupos/add">Añadir</Link>
        </div>
      )}
      <header className='header-list'>
        <p>Nombre</p>
        <p>Descripcion</p>
        <p>Acciones</p>
        <p></p>
      </header>
      {grupos?.data?.length > 0 ? grupos?.data?.map(grupo => {
        return (
          <Grupo
            key={grupo.id}
            id={grupo.id}
            nombre={grupo.nombre}
            descripcion={grupo.descripcion}
            acciones={grupo.acciones}
          />
        )
      }): <p className='msg-info'>No hay usuarios registrados</p>}
      {isLoading && <Loader />}
    </div>
  )
}
