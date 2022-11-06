import React, {useContext} from "react";
import 'styles/Header.css';
import { Link, useNavigate } from "react-router-dom";
import UsuarioContext from "context/UsuarioContext";

export default function Header() {
  const {isLogged, handleLogout, hasAccesoByTag} = useContext(UsuarioContext)
  const navigate = useNavigate();
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
          </nav>
        </div>
        <div className="button-container">
          <button>
            {isLogged
              ? <p style={{'color': 'white'}} onClick={() => {handleLogout(); navigate("/")}}>Cerrar Sesion</p>
              : <p><Link to="/auth/login" style={{'color': 'white'}}>Iniciar sesión</Link></p>
            }
          </button>
        </div>
      </div>
    </>
  );
}