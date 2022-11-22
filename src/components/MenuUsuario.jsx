import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UsuarioContext from 'context/UsuarioContext'
import 'styles/MenuUsuario.css'

export default function MenuUsuario() {
  const { usuario, handleLogout } = useContext(UsuarioContext)
  const { nombre, apellido } = usuario
  const content = nombre.charAt(0).toUpperCase() + apellido.charAt(0).toUpperCase()

  return (
    <div className='avatar-container'>
      <div className='avatar-content'>
        <p>{content}</p>
      </div>
      <div className='menu-usuario-container'>
        <div className='item-list'>
          <Link to='/profile'>Mis datos</Link>
        </div>
        <div className='item-list'>
          <Link to='/changeClave'>Cambiar Contraseña</Link>
        </div>
        <div className='item-list'>
          <Link to='/' onClick={handleLogout}>Cerrar Sesión</Link>
        </div>
      </div>
    </div>
  )
}
