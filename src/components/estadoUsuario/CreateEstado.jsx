import React from 'react'
import { Formik, Form } from 'formik'
import { createAndUpdateEstadoUsuarioValidation } from 'schemas/validation'
import 'styles/Form.css'
import Loader from 'components/Loader'

import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import { createEstadoUsuario } from 'services/estadoUsuario'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

import { useChangeTitle } from 'hooks/useChangeTitle'

export default function CreateEstado() {

  useChangeTitle('Crear Estado')

  const navigate = useNavigate()

  const initialValues = {
    nombre: '',
  }

  const createEstadoUsuarioMutation = useMutation(createEstadoUsuario)

  const onSubmit = values => {
    createEstadoUsuarioMutation.mutate(values)
  }

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
        </Form>
      )}
    </Formik>
  )
}