import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { loginValidation } from 'schemas/validation'
import 'styles/Form.css'
import Loader from 'components/Loader'

import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'

import UsuarioContext from 'context/UsuarioContext'
import { useMutation } from 'react-query'

import { login } from 'services/auth'

import Modal from 'components/Modal'
import MessageInfo from 'components/MessageInfo'

import { useChangeTitle } from 'hooks/useChangeTitle'
import { useMessageModal } from 'hooks/useMessageModal'

export default function Login() {

  useChangeTitle('Iniciar sesión')

  const {handleLogin} = useContext(UsuarioContext)

  const {error, modalActive, setErrorMsg, setClearMsg} = useMessageModal()

  let navigate = useNavigate()

  const loginMutation = useMutation(login)

  const initialValues = {
    emailOrUsername: '',
    clave: ''
  }

  const onSubmit = values => {
    const new_data = transformData(values)
    loginMutation.mutate(new_data, {
      onSuccess: (data) => {
        handleLogin(data[0], data[1].token, data[2].acciones)
        navigate('/', {
          state: {
            prevUrl: '/auth/login',
          }
        })
      },
      onError: setErrorMsg
    })
  }

  const transformData = (data) => {
    const {clave, emailOrUsername } = data
    if (emailOrUsername.includes('@')) {
      return { email: emailOrUsername, clave }
    }
    return { username: emailOrUsername, clave }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className='form-container'>
            <FieldText
              label='Email o Username'
              name='emailOrUsername'
              type='text'
              placeholder='Email o Username'
              errors={errors.emailOrUsername}
              touched={touched.emailOrUsername}
            />

            <FieldText
              label='Clave'
              name='clave'
              type='password'
              placeholder='clave...'
              errors={errors.clave}
              touched={touched.clave}
            />

            <FieldButton type='submit' name='Iniciar sesión' />
          </div>
          {loginMutation.isLoading && <Loader />}
          <Modal active={modalActive}>
            {error && (
              <MessageInfo
                message='Login incorrecto'
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
