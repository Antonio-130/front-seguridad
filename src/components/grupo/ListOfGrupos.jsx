import React, {useContext, useState} from 'react'
import UsuarioContext from 'context/UsuarioContext'
import { Link } from 'react-router-dom'
import 'styles/grupo/ListOfGrupos.css'
import Grupo from './Grupo'
import Loader from 'components/Loader'
import { getGrupos } from 'services/grupo'
import { useQuery } from 'react-query'
import { AddIcon } from 'assets/ui'
import ListOfValues from 'components/ListOfValues'

import { useChangeTitle } from 'hooks/useChangeTitle'

export default function ListOfGrupos() {

  useChangeTitle('Grupos')

  const {hasAccion} = useContext(UsuarioContext)

  const [grupos, setGrupos] = useState([])

  const { isLoading } = useQuery(['grupos'], getGrupos, {
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data) => {
      setGrupos(data.data)
    }
  })

  return (
    <div className='grupos-container'>
      <header className='header-list'>
        <p>Nombre</p>
        <p>Descripcion</p>
        <p>Acciones</p>
        <p>
        {hasAccion("create_grupo") && (
          <Link to="/grupos/add" className='add-grupo'>
            <AddIcon name="grupo" />
          </Link>
        )}
        </p>
      </header>
      <ListOfValues name="grupos" values={grupos} Component={Grupo} />
      {isLoading && <Loader />}
    </div>
  )
}