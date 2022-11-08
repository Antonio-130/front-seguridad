import React, {useContext} from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "components/Header"
import Home from "components/Home"
import Login from "components/auth/Login"
import UsuarioRouter from "routes/UsuarioRouter"
import GrupoRouter from "routes/GrupoRouter"
import EstadoUsuarioRouter from "routes/EstadoUsuarioRouter"

import UsuarioContext from "context/UsuarioContext"

export default function App() {
  const {isLogged, hasAccesoByTag} = useContext(UsuarioContext)

  const permission = (tag) => {
    return isLogged && hasAccesoByTag(tag)
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {permission('usuarios') && <Route path="/usuarios/*" element={<UsuarioRouter />} />}
        {permission('grupos') && <Route path="/grupos/*" element={<GrupoRouter />} />}
        {permission('estadosUsuario') && <Route path="/estadosUsuario/*" element={<EstadoUsuarioRouter />} />}
        {!(isLogged) && <Route path="/auth/login" element={<Login />} />}
        <Route path="*" element={<h1 style={{'color': 'white', 'textAlign': 'center'}}>404: Not Found</h1>} />
      </Routes>
    </Router>
  )
}