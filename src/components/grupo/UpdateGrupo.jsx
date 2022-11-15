import React, {useState} from 'react'
import { Formik, Form } from 'formik'
import { createAndUpdateGrupoValidation } from 'schemas/validation'
import 'styles/Form.css'
import Loader from 'components/Loader'

import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import CheckboxGroup from 'components/inputsForm/CheckboxGroup'
import ButtonSlicer from 'components/inputsForm/ButtonSlicer'
import { updateGrupo, getGrupoById } from 'services/grupo'
import { getAcciones } from 'services/acciones'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

import {useAccionesSections} from 'hooks/useAccionesSections'

import { useChangeTitle } from 'hooks/useChangeTitle'

export default function UpdateGrupo() {

  useChangeTitle('Actualizar Grupo')

  const { id } = useParams()

  const navigate = useNavigate()

  const [acciones, setAcciones] = useState([])

  const [initialValues, setInitialValues] = useState({
    nombre: '',
    descripcion: '',
    acciones: []
  })

  const handleGetData = async (idGrupo) => {
    const acciones = await getAcciones()
    const grupo = await getGrupoById(idGrupo)

    return {
      grupo: grupo.data,
      acciones: acciones.data
    }
  }

  const { isLoading } = useQuery(['grupoUpdateData', id], () => handleGetData(id), {
    onSuccess: (data) => {
      const {grupo, acciones } = data
      setAcciones(acciones)
      setInitialValues({
        nombre: grupo.nombre,
        descripcion: grupo.descripcion,
        acciones: grupo.acciones.map(accion => accion.id_accion.toString())
      })
    },
    refetchOnWindowFocus: false
  })

  const listOfAcciones = useAccionesSections(acciones)

  const onSubmit = values => {

    values.id = id
    alert(JSON.stringify(values))


    /* updateGrupo(values).then(response => {
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

            <FieldButton type='submit' name='Actualizar Grupo' />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {isLoading && <Loader />}
        </Form>
      )}
    </Formik>
  )
}