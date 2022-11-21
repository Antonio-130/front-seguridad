import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { getUsuarioById } from 'services/usuario'
import FieldButton from 'components/inputsForm/FieldButton'
import Loader from 'components/Loader'
import UsuarioContext from 'context/UsuarioContext'
import "styles/usuario/DetailUsuario.css"

export default function DetailUsuario() {

  useChangeTitle('Detalle de Usuario')

  const { hasAccion } = useContext(UsuarioContext)

  const { id: idUsuario } = useParams()
  const navigate = useNavigate()

  const { isLoading, data: usuario } = useQuery(['usuario', idUsuario], () => getUsuarioById(idUsuario), {
    refetchOnWindowFocus: false,
    initialData: {}
  })

  return (
    <div className='detail-usuario'>
      <h3>Usuario: {usuario.username}</h3>
      <p>Nombre: {usuario.nombre}</p>
      <p>Apellido: {usuario.apellido}</p>
      <p>Email: {usuario.email}</p>
      <p>Fecha de creacion: {new Date(usuario.fecha_creacion).toLocaleDateString()}</p>
      <p>Estado: {usuario.estado?.nombre}</p>
      <p>Grupos: {usuario.grupos?.map(grupo => grupo.nombre).join(', ')}</p>
      {hasAccion("update_usuario") && (
        <FieldButton type='button' name='Editar' onClick={() => navigate(`/usuarios/update/${idUsuario}`)} />
      )}
      <FieldButton type='button' name='Volver' onClick={() => navigate(-1)} />
      {isLoading && <Loader />}
    </div>
  )
}
