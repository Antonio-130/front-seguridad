export const types = {
  LOGIN: "LOGIN",
  AUTO_LOGIN: "AUTO_LOGIN",
  LOGOUT: "LOGOUT",
}

export const usuarioReducer = (state, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        usuario: action.payload.usuario,
        acciones: action.payload.acciones,
        isLogged: true,
      }
    case types.AUTO_LOGIN:
      return {
        ...state,
        usuario: action.payload.usuario,
        acciones: action.payload.acciones,
        isLogged: true,
      }
    case types.LOGOUT:
      return {
        ...state,
        usuario: {},
        acciones: [],
        isLogged: false,
      }
    default:
      return state
  }
}