import React, {useState, useContext} from 'react'
import { Formik, Form } from 'formik'
import { changeClaveValidation } from 'schemas/validation'
import 'styles/Form.css'
import Loader from 'components/Loader'

import UsuarioContext from 'context/UsuarioContext'

import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

import { changeClave } from 'services/auth'

import Modal from './Modal'
import { MessaggeErrorAndSuccess } from './MessageInfo'

import { useChangeTitle } from 'hooks/useChangeTitle'

export default function ChangeClave() {

  useChangeTitle('Cambiar contraseña')

  const {handleLogout} = useContext(UsuarioContext)

  const navigate = useNavigate()

  const [modalActive, setModalActive] = useState(false);

  const initialValues = {
    clave: '',
    newClave: '',
    confirmNewClave: '',
  }

  const changeClaveMutation = useMutation(changeClave)

  const onSubmit = values => {
    const newValues = {
      token: JSON.parse(localStorage.getItem('token')),
      clave: values.clave,
      newClave: values.newClave,
    }

    changeClaveMutation.mutate(newValues)
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

            <FieldButton type='submit' name='Cambiar contraseña' onClick={() => setModalActive(true)} />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {changeClaveMutation.isLoading && <Loader />}
          <Modal active={modalActive}>
            <MessaggeErrorAndSuccess
              isSuccess={changeClaveMutation.isSuccess}
              messageSuccess="Clave actualizada!"
              onClickSuccess={() => {setModalActive(false); handleLogout(); navigate('/auth/login')}}
              isError={changeClaveMutation.isError}
              messageError="Error al actualizar la clave"
              onClickError={() => setModalActive(false)}
            />
          </Modal>
        </Form>
      )}
    </Formik>
  )
}