import React, {useReducer} from "react";
import { types,  usuarioReducer } from "./UsuarioReducer";
import UsuarioContext from "./UsuarioContext";
import { verifyAndLogin } from "services/auth";

import useLocalStorage from "hooks/useLocalStorage";

const UsuarioState = ({ children }) => {

  const [usuarioInStorage, setUsuario] = useLocalStorage("usuario");
  const [accionesInStorage, setAcciones] = useLocalStorage("acciones");
  const [tokenInStorage, setToken] = useLocalStorage("token");

  const initialValues = {
    usuario: usuarioInStorage || {},
    acciones : accionesInStorage || [],
    isLogged: tokenInStorage && usuarioInStorage && accionesInStorage ? true : false,
  };

  const [state, dispatch] = useReducer(usuarioReducer, initialValues);

  verifyAndLogin(types.AUTO_LOGIN, dispatch);

  const handleLogout = () => {
    dispatch({
      type: types.LOGOUT,
    });
    setUsuario({});
    setAcciones([]);
    setToken("");
  };

  const hasAccesoByTag = (tag) => {
    const arrayAcciones = state.acciones.filter(item => item.tag === tag)
    return arrayAcciones.length > 0;
  }

  const hasAccion = (accion) => {
    const arrayAcciones = state.acciones.filter(item => item.nombre === accion)
    return arrayAcciones.length > 0;
  }

  return (
    <UsuarioContext.Provider
      value={{
        usuario: state.usuario,
        acciones: state.acciones,
        isLogged: state.isLogged,
        handleLogout,
        hasAccesoByTag,
        hasAccion,
        dispatch,
        types,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export default UsuarioState;