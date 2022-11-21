import { Routes, Route } from 'react-router-dom'
import ListOfUsuarios from "components/usuario/ListOfUsuarios"
import UpdateUsuario from "components/usuario/UpdateUsuario"
import CreateUsuario from "components/usuario/CreateUsuario"
import DetailUsuario from 'components/usuario/DetailUsuario'

export default function UsuarioRouter() {
  return (
    <Routes>
      <Route path="/" element={<ListOfUsuarios />} />
      <Route path="/:id" element={<DetailUsuario />} />
      <Route path="/add/" element={<CreateUsuario />} />
      <Route path="/update/:id" element={<UpdateUsuario />} />
      <Route path="/profile" element={<UpdateUsuario />} />
      <Route path="/changeClave" element={<UpdateUsuario />} />
    </Routes>
  )
}