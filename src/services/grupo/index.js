import { getHeaders } from '../headers'
import { isError } from '../response'

export const getGrupos = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grupos`, {
    method: 'GET',
    headers: getHeaders()
  })

  isError(response)

  const data = await response.json()

  return data
}

export const getGrupoById = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grupos/${id}`, {
    method: 'GET',
    headers: getHeaders()
  })

  isError(response)

  const data = await response.json()

  return data
}

export const createGrupo = async (grupo) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grupos`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(grupo)
  })

  isError(response)

  const data = await response.json()

  return data
}

export const updateGrupo = async (grupo) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grupos/${grupo.id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(grupo)
  })

  isError(response)

  const data = await response.json()

  return data
}

export const deleteGrupo = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grupos/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })

  isError(response)

  const data = await response.json()

  return data
}