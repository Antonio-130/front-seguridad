import { useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useTokenValidation } from "hooks/useTokenValidation"
import MenuUsuario from "./MenuUsuario"
import logo from "assets/security-logo.svg"
import UsuarioContext from "context/UsuarioContext"
import 'styles/Header.css'

export default function Header() {
  const { isLogged, hasAccesoByTag } = useContext(UsuarioContext)
  const navigate = useNavigate()
  const location = useLocation()
  useTokenValidation(location.state?.prevUrl === '/auth/login' ? true : false)

  return (
    <>
      <div className="empty-space"></div>
      <div className="header-container">
        <figure>
          <img src={logo} alt="security logo" title="logo security" className="img-logo" onClick={() => navigate("/")} />
        </figure>
        <div className="main-container">
          <h2 id="header-title">Inicio</h2>
          <nav>
            <Link to="/">Inicio</Link>
            {isLogged && hasAccesoByTag('usuarios') && <Link to="/usuarios">Usuarios</Link>}
            {isLogged && hasAccesoByTag('grupos') && <Link to="/grupos">Grupos</Link>}
            {isLogged && hasAccesoByTag('estadosUsuario') && <Link to="/estadosUsuario">Estados de Usuario</Link>}
          </nav>
        </div>
        {isLogged ? (
          <MenuUsuario />
        ) : (
        <div className="button-container">
          <button>
            <p><Link to="/auth/login" style={{'color': 'white'}}>Iniciar sesión</Link></p>
          </button>
        </div>)}
      </div>
    </>
  )
}