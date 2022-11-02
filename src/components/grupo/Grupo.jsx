import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import UsuarioContext from 'context/UsuarioContext';

export default function Grupo({id, nombre, descripcion}) {
  const {hasAccion} = useContext(UsuarioContext)

  return (
    <>
      <div className="usuario-container">
        <p>{nombre}</p>
        <p>{descripcion}</p>
        <div>
          {hasAccion("get_grupo") && <button><Link to={`/usuarios/${id}`}>Ver</Link></button>}
          {hasAccion("update_grupo") && <button><Link to={`/usuarios/update/${id}`}>Editar</Link></button>}
          {hasAccion("delete_grupo") && <button >Eliminar</button>}
        </div>
      </div>
    </>
  );
}
