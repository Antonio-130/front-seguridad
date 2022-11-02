export const login = async (values) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });

  const data = await response.json();

  return data;
}

export const autoLogin = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/autoLogin?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json();

  return data;
}

export const verifyToken = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/verificarToken?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return response;
}