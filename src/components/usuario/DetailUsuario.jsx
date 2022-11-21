import React, {useState, useContext} from 'react'
import "styles/usuario/DetailUsuario.css"
import Loader from 'components/Loader'
import UsuarioContext from 'context/UsuarioContext'

import FieldButton from 'components/inputsForm/FieldButton'
import { useParams, useNavigate } from 'react-router-dom'
import { getUsuarioById } from 'services/usuario'

import { useQuery } from 'react-query'

import { useChangeTitle } from 'hooks/useChangeTitle'

export default function DetailUsuario() {

  useChangeTitle('Detalle de Usuario')

  const { hasAccion } = useContext(UsuarioContext)

  const { id } = useParams()
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState({})

  const { isLoading } = useQuery(['usuario', id], () => getUsuarioById(id), {
    onSuccess: (data) => {
      const usuario = data
      setUsuario({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        username: usuario.username,
        email: usuario.email,
        estado: usuario.estado.nombre,
        grupos: usuario.grupos.map(grupo => grupo.nombre).join(', ')
      })
    }, refetchOnWindowFocus: false
  })

  return (
    <div className='detail-usuario'>
      <h3>Usuario: {usuario.username}</h3>
      <p>Nombre: {usuario.nombre}</p>
      <p>Apellido: {usuario.apellido}</p>
      <p>Email: {usuario.email}</p>
      <p>Estado: {usuario.estado}</p>
      <p>Grupos: {usuario.grupos}</p>
      {hasAccion("update_usuario") && (
        <FieldButton type='button' name='Editar' onClick={() => navigate(`/usuarios/update/${id}`)} />
      )}
      <FieldButton type='button' name='Volver' onClick={() => navigate(-1)} />
      {isLoading && <Loader />}
    </div>
  )
}
