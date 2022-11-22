import { useContext } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { useMessageModal } from 'hooks/useMessageModal'
import { changeClaveValidation } from 'schemas/validation'
import { changeClave } from 'services/auth'
import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import Modal from '../Modal'
import MessageInfo from '../MessageInfo'
import Loader from 'components/Loader'
import UsuarioContext from 'context/UsuarioContext'
import 'styles/Form.css'

export default function ChangeClave() {

  useChangeTitle('Cambiar contraseña')

  const { handleLogout } = useContext(UsuarioContext)

  const { error, modalActive, setSuccesMsg, setErrorMsg, setClearMsg } = useMessageModal()

  const navigate = useNavigate()

  const initialValues = {
    clave: '',
    newClave: '',
    confirmNewClave: '',
  }

  const changeClaveMutation = useMutation(changeClave, {
    onSuccess: setSuccesMsg,
    onError: setErrorMsg
  })

  const onSubmit = ({ clave, newClave }) => {
    const { id } = JSON.parse(localStorage.getItem('usuario'))
    changeClaveMutation.mutate({ id, clave, newClave })
  }

  const handleOnSuccess = () => {
    setClearMsg()
    handleLogout()
    navigate('/auth/login')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={changeClaveValidation}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-container">
            <FieldText
                label='Clave actual'
                name='clave'
                type='password'
                placeholder='clave actual...'
                errors={errors.clave}
                touched={touched.clave}
            />
            <FieldText
              label='Nueva clave'
              name='newClave'
              type='password'
              placeholder='nueva clave...'
              errors={errors.newClave}
              touched={touched.newClave}
            />
            <FieldText
              label='Confirmar nueva clave'
              name='confirmNewClave'
              type='password'
              placeholder='nueva clave...'
              errors={errors.confirmNewClave}
              touched={touched.confirmNewClave}
            />
            <FieldButton type='submit' name='Cambiar contraseña' />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {changeClaveMutation.isLoading && <Loader />}
          <Modal active={modalActive}>
            {!error && (
              <MessageInfo
                message='Contraseña cambiada con éxito'
                type='success'
                onClick={handleOnSuccess}
              />
            )}
            {error && (
              <MessageInfo
                message='Contraseña incorrecta'
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