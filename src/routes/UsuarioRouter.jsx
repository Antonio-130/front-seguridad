import React from 'react'
import ListOfUsuarios from "components/usuario/ListOfUsuarios";
import UpdateUsuario from "components/usuario/UpdateUsuario";
import CreateUsuario from "components/usuario/CreateUsuario";
import {Routes, Route } from 'react-router-dom'

export default function UsuarioRouter() {
  return (
    <Routes>
      <Route path="/" element={<ListOfUsuarios />} />
      <Route path="/add/" element={<CreateUsuario />} />
      <Route path="/update/:id" element={<UpdateUsuario />} />
    </Routes>
  )
}
