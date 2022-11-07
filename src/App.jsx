import React, {useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "components/Header";
import Home from "components/Home";
import Login from "components/auth/Login";
import UsuarioRouter from "routes/UsuarioRouter";
import GrupoRouter from "routes/GrupoRouter";

import {useTokenValidation} from "hooks/useTokenValidation";

import UsuarioContext from "context/UsuarioContext";

export default function App() {
  const {isLogged, hasAccesoByTag, handleAutoLogin, handleLogout} = useContext(UsuarioContext)
  useTokenValidation(handleAutoLogin, handleLogout)

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {isLogged && hasAccesoByTag('usuarios') && <Route path="/usuarios/*" element={<UsuarioRouter />} />}
        {isLogged && hasAccesoByTag('grupos') && <Route path="/grupos/*" element={<GrupoRouter />} />}
        {!(isLogged) && <Route path="/auth/login" element={<Login />} />}
        <Route path="*" element={<h1 style={{'color': 'white', 'textAlign': 'center'}}>404: Not Found</h1>} />
      </Routes>
    </Router>
  );
}