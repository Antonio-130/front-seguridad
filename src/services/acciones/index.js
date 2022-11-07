import { getHeaders } from '../headers'

export const getAcciones = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/acciones`, {
    method: 'GET',
    headers: getHeaders()
  })

  const data = await response.json()

  return data
}

export const getAccionById = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/acciones/${id}`, {
    method: 'GET',
    headers: getHeaders()
  })

  const data = await response.json()

  return data
}

export const createAccion = async (accion) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/acciones`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(accion)
  })

  const data = await response.json()

  return data
}

export const updateAccion = async (accion) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/acciones/${accion.id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(accion)
  })

  const data = await response.json()

  return data
}

export const deleteAccion = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/acciones/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })

  const data = await response.json()

  return data
}