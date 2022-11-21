import React, {useReducer} from "react"
import { types,  usuarioReducer } from "./UsuarioReducer"
import UsuarioContext from "./UsuarioContext"

const UsuarioState = ({ children }) => {

  let usuarioInStorage = JSON.parse(localStorage.getItem("usuario"))
  let accionesInStorage = JSON.parse(localStorage.getItem("acciones"))
  let tokenInStorage = JSON.parse(localStorage.getItem("token"))

  const initialValues = {
    usuario: usuarioInStorage || {},
    acciones : accionesInStorage || [],
    isLogged: tokenInStorage && usuarioInStorage && accionesInStorage ? true : false,
  }

  const [state, dispatch] = useReducer(usuarioReducer, initialValues)

  const handleLogout = () => {
    dispatch({
      type: types.LOGOUT,
    })
    localStorage.removeItem("usuario")
    localStorage.removeItem("acciones")
    localStorage.removeItem("token")
  }

  const handleLogin = (usuario, token, acciones) => {
    dispatch({
      type: types.LOGIN,
      payload: {
        usuario,
        acciones,
      },
    })
    localStorage.setItem('usuario', JSON.stringify(usuario))
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('acciones', JSON.stringify(acciones))
  }

  const handleAutoLogin = (usuario, token, acciones) => {
    dispatch({
      type: types.AUTO_LOGIN,
      payload: { usuario, acciones }
    })
  }

  const hasAccesoByTag = (tag) => {
    const arrayAcciones = state.acciones.filter(item => item.tag === tag)
    return arrayAcciones.length > 0
  }

  const hasAccion = (accion) => {
    const arrayAcciones = state.acciones.filter(item => item.nombre === accion)
    return arrayAcciones.length > 0
  }

  return (
    <UsuarioContext.Provider
      value={{
        usuario: state.usuario,
        acciones: state.acciones,
        isLogged: state.isLogged,
        handleLogout,
        handleLogin,
        handleAutoLogin,
        hasAccesoByTag,
        hasAccion
      }}
    >
      {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioState