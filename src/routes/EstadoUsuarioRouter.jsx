import React from 'react'
import ListOfEstados from 'components/estadoUsuario/ListOfEstados'
import UpdateEstado from 'components/estadoUsuario/UpdateEstado'
import CreateEstado from 'components/estadoUsuario/CreateEstado'
import {Routes, Route } from 'react-router-dom'

export default function EstadoUsuarioRouter() {
  return (
    <Routes>
      <Route path="/" element={<ListOfEstados />} />
      <Route path="/add/" element={<CreateEstado />} />
      <Route path="/update/:id" element={<UpdateEstado />} />
    </Routes>
  )
}