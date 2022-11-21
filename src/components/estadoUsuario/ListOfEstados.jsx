import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { getEstadosUsuario } from 'services/estadoUsuario'
import { AddIcon } from 'assets/ui'
import ListOfValues from 'components/ListOfValues'
import EstadoUsuario from './EstadoUsuario'
import Loader from 'components/Loader'
import UsuarioContext from 'context/UsuarioContext'
import 'styles/estadoUsuario/ListOfEstados.css'

export default function ListOfestadosUsuario() {

  useChangeTitle('Estados de usuario')

  const { hasAccion } = useContext(UsuarioContext)

  const { isLoading, data: estadosUsuario } = useQuery(['estadosUsuario'], getEstadosUsuario, {
    refetchOnWindowFocus: false,
    initialData: [],
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
      <ListOfValues name="estados de usuario" values={estadosUsuario} Component={EstadoUsuario} />
      {isLoading && <Loader />}
    </div>
  )
}