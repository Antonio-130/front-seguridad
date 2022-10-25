import {headers} from "services/headers";

export const getEstadosUsuario = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/estadosUsuario`, {
    method: 'GET',
    headers
  });

  const data = await response.json();

  return data;
}

export const getEstadoUsuarioById = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/estadosUsuario/${id}`, {
    method: 'GET',
    headers
  });

  const data = await response.json();

  return data;
}

export const createEstadoUsuario = async (estadoUsuario) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/estadosUsuario`, {
    method: 'POST',
    headers,
    body: JSON.stringify(estadoUsuario)
  });

  const data = await response.json();

  return data;
}

export const updateEstadoUsuario = async (estadoUsuario) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/estadosUsuario/${estadoUsuario.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(estadoUsuario)
  });

  const data = await response.json();

  return data;
}

export const deleteEstadoUsuario = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/estadosUsuario/${id}`, {
    method: 'DELETE',
    headers
  });

  const data = await response.json();

  return data;
}