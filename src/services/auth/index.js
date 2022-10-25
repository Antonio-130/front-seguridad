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

const autoLogin = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/autoLogin?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json();

  return data;
}

export const verifyAndLogin = (type, dispatch) => {
  const storageToken = JSON.parse(localStorage.getItem("token"));
  const storageUsuario = JSON.parse(localStorage.getItem("usuario"));
  const storageAcciones = JSON.parse(localStorage.getItem("acciones"));

  if (storageToken && (!storageUsuario || !storageAcciones)) {
    autoLogin(storageToken).then((res) => {
      if (res.status === "success") {
        localStorage.setItem("usuario", JSON.stringify(res.data[0]));
        localStorage.setItem("acciones", JSON.stringify(res.data[1].acciones));

        dispatch({
          type,
          payload: {
            usuario: res.data[0],
            acciones: res.data[1].acciones,
          },
        });
      }
    }).catch((err) => {
      console.log(err)
    });
  }
  if (!storageToken) {
    localStorage.removeItem("usuario");
    localStorage.removeItem("acciones");
  }
}
