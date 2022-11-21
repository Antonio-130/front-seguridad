import { useContext, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useMessageModal } from "hooks/useMessageModal"
import { Link } from "react-router-dom"
import { deleteUsuario } from "services/usuario"
import { UpdateIcon, LookupIcon, DeleteIcon } from "assets/ui"
import Modal from "components/Modal"
import MessageInfo from "components/MessageInfo"
import FieldButton from "components/inputsForm/FieldButton"
import UsuarioContext from "context/UsuarioContext"
import Loader from "components/Loader"
import "styles/usuario/Usuario.css"

export default function Usuario({ data }) {

  const { id, username, nombre, apellido, email, fecha_creacion, estado } = data

  const { hasAccion } = useContext(UsuarioContext)

  const queryClient = useQueryClient()

  const [showModal, setShowModal] = useState(false)
  const [infoMsg, setInfoMsg] = useState(false)

  const { error, modalActive, setSuccesMsg, setErrorMsg, setClearMsg } = useMessageModal()

  const deleteUsuarioMutation = useMutation(deleteUsuario, {
    onSuccess: () =>{
      setSuccesMsg()
      queryClient.invalidateQueries('usuarios')
    },
    onError: setErrorMsg
  })

  const handleOnClick = () => {
    setShowModal(true)
    setInfoMsg(true)
  }

  const handleDelete = () => {
    handleCloseMsgInfo()
    deleteUsuarioMutation.mutate(id)
  }

  const handleCloseMsgInfo = () => {
    setClearMsg()
    setShowModal(false)
    setInfoMsg(false)
  }

  return (
    <>
      <div className="usuario-container">
        <p>{nombre}</p>
        <p>{apellido}</p>
        <p>{email}</p>
        <p>{new Date(fecha_creacion).toLocaleDateString()}</p>
        <p>{estado.nombre}</p>
        <div>
          {hasAccion("get_usuario") &&
            <button>
              <Link to={`/usuarios/${id}`}>
                <LookupIcon name="usuario" />
              </Link>
            </button>}
          {hasAccion("update_usuario") &&
            <button>
              <Link to={`/usuarios/update/${id}`}>
                <UpdateIcon name="usuario" />
              </Link>
            </button>}
          {hasAccion("delete_usuario") &&
            <button onClick={handleOnClick}>
              <DeleteIcon name="usuario" />
            </button>}
          {deleteUsuarioMutation.isLoading && <Loader />}
          <Modal active={modalActive || showModal}>
            {infoMsg && (
              <MessageInfo
                message={`Esta seguro de eliminar el usuario ${username}?`}
                onClick={handleDelete}
                optionalButton={
                  <FieldButton
                    type="button"
                    name="Cancelar"
                    onClick={handleCloseMsgInfo}
                  />
                }
              />
            )}
            {!error && !infoMsg && (
              <MessageInfo
                message="Usuario eliminado con exito"
                type="success"
                onClick={setClearMsg}
              />
            )}
            {error && (
              <MessageInfo
                message="Error al eliminar el usuario"
                type="error"
                onClick={setClearMsg}
              />
            )}
          </Modal>
        </div>
      </div>
    </>
  )
}
