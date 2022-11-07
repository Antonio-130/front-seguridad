import React from 'react'
import { Formik, Form } from 'formik'
import { createAndUpdateEstadoUsuarioValidation } from 'schemas/validation'
import 'styles/Form.css'

import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import { createEstadoUsuario } from 'services/estadoUsuario'
import { useNavigate } from 'react-router-dom'

export default function CreateEstado() {

  const navigate = useNavigate()

  const initialValues = {
    nombre: '',
  }

  const onSubmit = values => {
    alert(JSON.stringify(values))

    /* createEstadoUsuario(values).then(response => {
      console.log(response)
      setTimeout(() => {
        navigate(-1)
      }
      , 1000)
    }
    ).catch(error => {
      console.log(error)
    }) */
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
        </Form>
      )}
    </Formik>
  )
}