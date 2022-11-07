import React from 'react'
import ListOfGrupos from "components/grupo/ListOfGrupos"
import UpdateGrupo from "components/grupo/UpdateGrupo"
import CreateGrupo from "components/grupo/CreateGrupo"
import {Routes, Route } from 'react-router-dom'

export default function UsuarioRouter() {
  return (
    <Routes>
      <Route path="/" element={<ListOfGrupos />} />
      <Route path="/add/" element={<CreateGrupo />} />
      <Route path="/update/:id" element={<UpdateGrupo />} />
    </Routes>
  )
}
