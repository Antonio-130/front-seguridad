import React, {useState} from 'react'
import { Formik, Form } from 'formik'
import { createAndUpdateEstadoUsuarioValidation } from 'schemas/validation'
import 'styles/Form.css'
import Loader from 'components/Loader'

import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import { updateEstadoUsuario, getEstadoUsuarioById } from 'services/estadoUsuario'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

export default function UpdateEstado() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [initialValues, setInitialValues] = useState({
    nombre: '',
  })

  const { isLoading } = useQuery(['estadoUsuario', id], () => getEstadoUsuarioById(id), {
    onSuccess: (data) => {
      const { nombre } = data.data
      setInitialValues({
        nombre
      })
    }, refetchOnWindowFocus: false
  })

  const onSubmit = values => {
    alert(JSON.stringify(values))

    /* updateEstadoUsuario(values).then(response => {
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
        </Form>
      )}
    </Formik>
  )
}