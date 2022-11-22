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

  const conditionSection = hasAccesoByTag('grupos') || hasAccesoByTag('usuarios') || hasAccesoByTag('estadosUsuario')

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
            {conditionSection && (
              <section>
                <p>Seguridad</p>
                <div className="section-items-container">
                  {isLogged && hasAccesoByTag('usuarios') && <Link to="/usuarios">Usuarios</Link>}
                  {isLogged && hasAccesoByTag('grupos') && <Link to="/grupos">Grupos</Link>}
                  {isLogged && hasAccesoByTag('estadosUsuario') && <Link to="/estadosUsuario">Estados de Usuario</Link>}
                </div>
              </section>
            )}
          </nav>
        </div>
        {isLogged ? (
          <MenuUsuario />
        ) : (
        <div className="button-container">
          <button onClick={() => navigate('/auth/login')}>
            Iniciar Sesion
          </button>
        </div>)}
      </div>
    </>
  )
}