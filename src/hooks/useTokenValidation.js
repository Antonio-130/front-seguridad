import { useContext } from 'react'
import { autoLogin, verifyToken } from 'services/auth'
import UsuarioContext from 'context/UsuarioContext'
import { useQuery } from 'react-query'

export const useTokenValidation = (isLogin) => {
  const {handleAutoLogin, handleLogout} = useContext(UsuarioContext)
  let token = JSON.parse(localStorage.getItem("token"))
  let usuario = JSON.parse(localStorage.getItem("usuario"))
  let acciones = JSON.parse(localStorage.getItem("acciones"))

  if (!token && (usuario || acciones)) {
    handleLogout()
  }

  useQuery(["autoLogin"], () => autoLogin(token), {
    enabled: Boolean(token && (!usuario || !acciones)),
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => {
      localStorage.setItem("usuario", JSON.stringify(data[0]))
      localStorage.setItem("acciones", JSON.stringify(data[1].acciones))
      handleAutoLogin(data[0], data[1].acciones)
    }
  })

  useQuery(['verifyToken'], () => verifyToken(token), {
    enabled: Boolean(token && !isLogin),
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => {
      if (data.status === 419) {
        handleLogout()
      }
    }
  })
}