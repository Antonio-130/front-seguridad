import { headers } from "services/headers";

export const getGrupos = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grupos`, {
    method: 'GET',
    headers
  });

  const data = await response.json();

  return data;
}

export const getGrupoById = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grupos/${id}`, {
    method: 'GET',
    headers
  });

  const data = await response.json();

  return data;
}

export const createGrupo = async (grupo) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grupos`, {
    method: 'POST',
    headers,
    body: JSON.stringify(grupo)
  });

  const data = await response.json();

  return data;
}

export const updateGrupo = async (grupo) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grupos/${grupo.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(grupo)
  });

  const data = await response.json();

  return data;
}

export const deleteGrupo = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grupos/${id}`, {
    method: 'DELETE',
    headers
  });

  const data = await response.json();

  return data;
}