import {isUnAuthorized} from '../response'

export const login = async (values) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })

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

  isUnAuthorized(response)

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

  const data = await response.json()

  return data
}