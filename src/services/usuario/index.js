import { getHeaders } from '../headers'
import { isError } from '../response'

export const getUsuarios = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/usuarios`, {
    method: 'GET',
    headers: getHeaders()
  })

  isError(response)

  const data = await response.json()

  return data
}

export const getUsuarioById = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/usuarios/${id}`, {
    method: 'GET',
    headers: getHeaders()
  })

  isError(response)

  const data = await response.json()

  return data
}

export const createUsuario = async (user) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/usuarios`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(user)
  })

  isError(response)

  const data = await response.json()

  return data
}

export const updateUsuario = async (user) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/usuarios/${user.id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(user)
  })

  isError(response)

  const data = await response.json()

  return data
}

export const deleteUsuario = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/usuarios/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })

  isError(response)

  const data = await response.json()

  return data
}