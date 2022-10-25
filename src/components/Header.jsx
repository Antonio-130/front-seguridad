import React, {useContext} from "react";
import 'styles/Header.css';
import { Link } from "react-router-dom";
import UsuarioContext from "context/UsuarioContext";

export default function Header() {
  const {isLogged, handleLogout, hasAccesoByTag} = useContext(UsuarioContext)
  return (
    <>
      <div className="empty-space"></div>
      <div className="header-container">
        <div>Logo</div>
        <div className="main-container">
          <h2>Menu</h2>
          <nav>
            <Link to="/">Inicio</Link>
            {isLogged && hasAccesoByTag('usuarios') && <Link to="/usuarios">Usuarios</Link>}
            {isLogged && hasAccesoByTag('grupos') && <Link to="/grupos">Grupos</Link>}
            {isLogged && hasAccesoByTag('estadosUsuario') && <Link to="/estadosUsuario">Estados de Usuario</Link>}
            {isLogged && hasAccesoByTag('acciones') && <Link to="/acciones">Acciones</Link>}
          </nav>
        </div>
        <div className="button-container">
          <button>
            {isLogged
              ? <p style={{'color': 'white'}} onClick={handleLogout}>Cerrar Sesion</p>
              : <p><Link to="/auth/login" style={{'color': 'white'}}>Iniciar sesión</Link></p>
            }
          </button>
        </div>
      </div>
    </>
  );
}