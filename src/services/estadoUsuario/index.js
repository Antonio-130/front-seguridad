import { getHeaders } from '../headers'

export const getEstadosUsuario = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/estadosUsuario`, {
    method: 'GET',
    headers: getHeaders()
  })

  const data = await response.json()

  return data
}

export const getEstadoUsuarioById = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/estadosUsuario/${id}`, {
    method: 'GET',
    headers: getHeaders()
  })

  const data = await response.json()

  return data
}

export const createEstadoUsuario = async (estadoUsuario) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/estadosUsuario`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(estadoUsuario)
  })

  const data = await response.json()

  return data
}

export const updateEstadoUsuario = async (estadoUsuario) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/estadosUsuario/${estadoUsuario.id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(estadoUsuario)
  })

  const data = await response.json()

  return data
}

export const deleteEstadoUsuario = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/estadosUsuario/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })

  const data = await response.json()

  return data
}