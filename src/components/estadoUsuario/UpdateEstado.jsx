import { Formik, Form } from 'formik'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { useMessageModal } from 'hooks/useMessageModal'
import { updateEstadoUsuario, getEstadoUsuarioById } from 'services/estadoUsuario'
import { createAndUpdateEstadoUsuarioValidation } from 'schemas/validation'
import Loader from 'components/Loader'
import Modal from 'components/Modal'
import MessageInfo from 'components/MessageInfo'
import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import 'styles/Form.css'

export default function UpdateEstado() {

  useChangeTitle('Actualizar Estado')

  const { id: idUsuario } = useParams()
  const navigate = useNavigate()

  const { error, modalActive, setClearMsg, setSuccesMsg, setErrorMsg } = useMessageModal()

  const { isLoading, data: { id, ...initialValues } } = useQuery(['estadoUsuario', idUsuario], () => getEstadoUsuarioById(idUsuario), {
    refetchOnWindowFocus: false,
    initialData: {nombre: ''},
  })

  const updateEstadoUsuarioMutation = useMutation(updateEstadoUsuario, {
    onSuccess: setSuccesMsg,
    onError: setErrorMsg
  })

  const onSubmit = values => updateEstadoUsuarioMutation.mutate(values)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createAndUpdateEstadoUsuarioValidation}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-container">
            <FieldText
                label='Nombre'
                name='nombre'
                type='text'
                placeholder='nombre...'
                errors={errors.nombre}
                touched={touched.nombre}
            />

            <FieldButton type='submit' name='Crear Estado' />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {isLoading && <Loader />}
          <Modal active={modalActive}>
            {!error && (
              <MessageInfo
                message='Estado actualizado correctamente'
                type='success'
                onClick={() => {setClearMsg(); navigate(-1)}}
              />
            )}
            {error && (
              <MessageInfo
                message='Error al actualizar el estado'
                type='error'
                onClick={setClearMsg}
              />
            )}
          </Modal>
        </Form>
      )}
    </Formik>
  )
}