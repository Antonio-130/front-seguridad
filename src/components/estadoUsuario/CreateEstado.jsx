import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useMessageModal } from 'hooks/useMessageModal'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { createAndUpdateEstadoUsuarioValidation } from 'schemas/validation'
import { createEstadoUsuario } from 'services/estadoUsuario'
import Loader from 'components/Loader'
import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import Modal from 'components/Modal'
import MessageInfo from 'components/MessageInfo'
import 'styles/Form.css'

export default function CreateEstado() {

  useChangeTitle('Crear Estado')

  const navigate = useNavigate()

  const { error, modalActive, setClearMsg, setSuccesMsg, setErrorMsg } = useMessageModal()

  const initialValues = { nombre: '' }

  const createEstadoUsuarioMutation = useMutation(createEstadoUsuario, {
    onSuccess: setSuccesMsg,
    onError: setErrorMsg
  })

  const onSubmit = values => createEstadoUsuarioMutation.mutate(values)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createAndUpdateEstadoUsuarioValidation}
      onSubmit={onSubmit}
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
          {createEstadoUsuarioMutation.isLoading && <Loader />}
          <Modal active={modalActive}>
            {!error && (
              <MessageInfo
                message='Estado creado correctamente'
                type='success'
                onClick={() => {setClearMsg(); navigate(-1)}}
              />
            )}
            {error && (
              <MessageInfo
                message='Error al crear el estado'
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