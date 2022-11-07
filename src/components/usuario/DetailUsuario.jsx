import React, {useState, useEffect} from 'react'
import "styles/usuario/DetailUsuario.css"
import Loader from 'components/Loader'
import { useParams, useNavigate } from 'react-router-dom'
import { getUsuarioById } from 'services/usuario'

export default function DetailUsuario() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsuarioById(id)
      .then((data) => {
        if (data.status === "success") {
          setUsuario({
            nombre: data.data.nombre,
            apellido: data.data.apellido,
            username: data.data.username,
            email: data.data.email,
            estado: data.data.estado.nombre,
            grupos: data.data.grupos.map(grupo => grupo.nombre).join(', ')
          })
          setLoading(false)
        }
        else {
          setUsuario({})
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  return (
    <div className='detail-usuario'>
      <h3>Usuario: {usuario.username}</h3>
      <p>Nombre: {usuario.nombre}</p>
      <p>Apellido: {usuario.apellido}</p>
      <p>Email: {usuario.email}</p>
      <p>Estado: {usuario.estado}</p>
      <p>Grupos: {usuario.grupos}</p>
      <button onClick={() => navigate(-1)}>Volver</button>
      {loading && <Loader />}
    </div>
  )
}
