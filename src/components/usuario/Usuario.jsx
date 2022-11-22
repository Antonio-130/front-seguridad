import { useContext, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useMessageModal } from "hooks/useMessageModal"
import { useGeneratePassword } from "hooks/useGeneratePassword"
import { Link } from "react-router-dom"
import { deleteUsuario } from "services/usuario"
import { resetClave, sendEmail } from "services/auth"
import { UpdateIcon, LookupIcon, DeleteIcon, KeyIcon } from "assets/ui"
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
  const [action, setAction] = useState('')

  const { error, modalActive, setSuccesMsg, setErrorMsg, setClearMsg } = useMessageModal()

  const deleteUsuarioMutation = useMutation(deleteUsuario, {
    onSuccess: setSuccesMsg,
    onError: setErrorMsg
  })

  const resetClaveMutation = useMutation(resetClave, {
    onError: setErrorMsg
  })

  const sendEmailMutation = useMutation(sendEmail, {
    onSuccess: setSuccesMsg,
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

  const newPass = useGeneratePassword(8)

  const handleResetClave = () => {
    handleCloseMsgInfo()
    resetClaveMutation.mutate({ id, clave: newPass }, {
      onSuccess: () => {
        sendEmailMutation.mutate({ email, username, new_clave: newPass })
      }
    })
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
        <p>{fecha_creacion}</p>
        <p>{estado}</p>
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
            <button onClick={() => {handleOnClick(); setAction('delete')}}>
              <DeleteIcon name="usuario" />
            </button>}
          {hasAccion("reset_clave") &&
            <button onClick={() => {handleOnClick(); setAction('reset')}}>
              <KeyIcon name="usuario" />
            </button>}
          {
            (deleteUsuarioMutation.isLoading
            || resetClaveMutation.isLoading
            || sendEmailMutation.isLoading)
            && <Loader />
          }
          <Modal active={modalActive || showModal}>
            {infoMsg && (
              <MessageInfo
                message={
                  (action === "delete" && `Esta seguro de eliminar el usuario ${username}?`)
                  || (action === "reset" && `Esta seguro de resetear la clave del usuario ${username}?`)
                }
                onClick={() => {
                  if (action === "delete") handleDelete()
                  if (action === "reset") handleResetClave()
                }}
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
                message={
                  (action === "delete" && "Usuario eliminado con exito")
                  || (action === "reset" && "Clave reseteada con exito")
                }
                type="success"
                onClick={() => {
                  if (action === "delete") {queryClient.invalidateQueries("usuarios"); setClearMsg()}
                  if (action === "reset") setClearMsg()
                }}
              />
            )}
            {error && (
              <MessageInfo
                message={
                  (action === "delete" && "Error al eliminar el usuario")
                  || (action === "reset" && "Error al resetear la clave")
                }
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
