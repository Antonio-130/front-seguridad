import React, {useState} from 'react'
import { Formik, Form } from 'formik'
import { createAndUpdateGrupoValidation } from 'schemas/validation'
import 'styles/Form.css'
import Loader from 'components/Loader'

import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import CheckboxGroup from 'components/inputsForm/CheckboxGroup'
import ButtonSlicer from 'components/inputsForm/ButtonSlicer'
import { createGrupo } from 'services/grupo'
import { getAcciones } from 'services/acciones'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

import {useAccionesSections} from 'hooks/useAccionesSections'

export default function CreateGrupo() {

  const navigate = useNavigate()

  const [acciones, setAcciones] = useState([])

  const { isLoading } = useQuery(['acciones'], getAcciones, {
    onSuccess: (acciones) => {
      setAcciones(acciones.data)
    },
    refetchOnWindowFocus: false
  })


  const listOfAcciones = useAccionesSections(acciones)

  const initialValues = {
    nombre: '',
    descripcion: '',
    acciones: []
  }

  const onSubmit = values => {

    alert(JSON.stringify(values))

    /* createGrupo(values).then(response => {
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
      validationSchema={createAndUpdateGrupoValidation}
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

            <FieldText
              label='Descripcion'
              name='descripcion'
              type='text'
              placeholder='descripcion...'
              errors={errors.descripcion}
              touched={touched.descripcion}
            />

            <ButtonSlicer
              fisrtSection="Grupo"
              secondSection="Acciones"
            />

            <CheckboxGroup
              label='Acciones'
              name='acciones'
              sections={listOfAcciones}
            />

            <FieldButton type='submit' name='Crear Grupo' />
          </div>
          {isLoading && <Loader />}
        </Form>
      )}
    </Formik>
  )
}