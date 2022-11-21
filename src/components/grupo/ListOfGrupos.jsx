import { useContext } from 'react'
import { useQuery } from 'react-query'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { Link } from 'react-router-dom'
import { getGrupos } from 'services/grupo'
import { AddIcon } from 'assets/ui'
import Grupo from './Grupo'
import ListOfValues from 'components/ListOfValues'
import Loader from 'components/Loader'
import UsuarioContext from 'context/UsuarioContext'
import 'styles/grupo/ListOfGrupos.css'

export default function ListOfGrupos() {

  useChangeTitle('Grupos')

  const { hasAccion } = useContext(UsuarioContext)

  const { isLoading, data: grupos } = useQuery(['grupos'], getGrupos, {
    refetchOnWindowFocus: false,
    initialData: []
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