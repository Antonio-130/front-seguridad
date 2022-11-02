import { useEffect } from 'react'
import { autoLogin, verifyToken } from 'services/auth';

export default function useTokenValidation(handleAutoLogin, handleLogout) {
  let token = JSON.parse(localStorage.getItem("token"));
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  let acciones = JSON.parse(localStorage.getItem("acciones"));

  useEffect(() => {
    if (token && (!usuario || !acciones)) {
      autoLogin(token).then((res) => {
        if (res.status === "success") {
          localStorage.setItem("usuario", JSON.stringify(res.data[0]));
          localStorage.setItem("acciones", JSON.stringify(res.data[1].acciones));
          handleAutoLogin(res.data[0], res.data[1].acciones);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    if (!token && (usuario || acciones)) {
      handleLogout();
      removeLocalStorage();
    }
    if (token && usuario && acciones) {
      verifyToken(token).then((res) => {
        if (res.status === 419) {
          removeLocalStorage();
          handleLogout();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [token, usuario, acciones, handleAutoLogin, handleLogout]);
}

const removeLocalStorage = () => {
  localStorage.removeItem("usuario");
  localStorage.removeItem("acciones");
  localStorage.removeItem("token");
}