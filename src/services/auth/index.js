import { isError } from '../response'
import { getHeaders } from 'services/headers'

export const login = async (values) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })

  isError(response)

  const data = await response.json()

  return data
}

export const autoLogin = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/autoLogin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token})
  })

  isError(response)

  const data = await response.json()

  return data
}

export const verifyToken = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/verificarToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token})
  })
  return response
}

export const changeClave = async (values) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/changeClave`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })

  isError(response)

  return response
}

export const sendEmail = async (values) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/email`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(values)
  })

  isError(response)

  const data = await response.json()

  return data
}

export const resetClave = async (values) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/resetClave`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(values)
  })

  isError(response)

  return response
}