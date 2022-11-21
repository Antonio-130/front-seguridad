import { Routes, Route } from 'react-router-dom'
import ListOfGrupos from "components/grupo/ListOfGrupos"
import UpdateGrupo from "components/grupo/UpdateGrupo"
import CreateGrupo from "components/grupo/CreateGrupo"

export default function UsuarioRouter() {
  return (
    <Routes>
      <Route path="/" element={<ListOfGrupos />} />
      <Route path="/add/" element={<CreateGrupo />} />
      <Route path="/update/:id" element={<UpdateGrupo />} />
    </Routes>
  )
}
