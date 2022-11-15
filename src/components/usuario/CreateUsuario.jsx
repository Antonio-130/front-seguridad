import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { createUsuarioValidation } from 'schemas/validation'
import 'styles/Form.css'
import Loader from 'components/Loader'

import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import FieldSelect from 'components/inputsForm/FieldSelect'
import CheckboxGroup from 'components/inputsForm/CheckboxGroup'
import ButtonSlicer from 'components/inputsForm/ButtonSlicer'
import { createUsuario } from 'services/usuario'
import { getEstadosUsuario } from 'services/estadoUsuario'
import { getGrupos } from 'services/grupo'
import { useNavigate } from 'react-router-dom'

import { useQuery } from 'react-query'

import { useChangeTitle } from 'hooks/useChangeTitle'

export default function CreateUsuario() {

  useChangeTitle('Crear Usuario')

  const navigate = useNavigate()

  const [estados, setEstados] = useState([])

  const [grupos, setGrupos] = useState([])

  const initialValues = {
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    confirmEmail: '',
    clave: '',
    confirmClave: '',
    estado: '',
    grupos: []
  }

  const handleGetData = async () => {
    const estados = await getEstadosUsuario()
    const grupos = await getGrupos()

    return {
      estados: estados.data,
      grupos: grupos.data
    }
  }
  const {isLoading} = useQuery('createUsuarioData', handleGetData, {
    onSuccess: (data) => {
      const {estados, grupos} = data
      setEstados(estados)
      setGrupos(grupos.map((grupo) => {
        return {
          id: grupo.id,
          nombre: grupo.nombre
        }
      }))
    }
  })

  const onSubmit = values => {
    delete values.confirmEmail
    delete values.confirmClave

    alert(JSON.stringify(values))

    createUsuario(values).then(response => {
      console.log(response)
      setTimeout(() => {
        navigate(-1)
      }
      , 1000)
    }
    ).catch(error => {
      console.log(error)
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createUsuarioValidation}
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
              label='Apellido'
              name='apellido'
              type='text'
              placeholder='apellido...'
              errors={errors.apellido}
              touched={touched.apellido}
            />

            <FieldText
              label='Username'
              name='username'
              type='text'
              placeholder='username...'
              errors={errors.username}
              touched={touched.username}
            />

            <FieldText
              label='Email'
              name='email'
              type='email'
              placeholder='example@mail.com...'
              errors={errors.email}
              touched={touched.email}
            />

            <FieldText
              label='Confirma el Email'
              name='confirmEmail'
              type='email'
              placeholder='example@mail.com...'
              errors={errors.confirmEmail}
              touched={touched.confirmEmail}
            />

            <FieldText
              label='Contraseña'
              name='clave'
              type='password'
              placeholder='contraseña...'
              errors={errors.clave}
              touched={touched.clave}
            />

            <FieldText
              label='Confirma la Contraseña'
              name='confirmClave'
              type='password'
              placeholder='contraseña...'
              errors={errors.confirmClave}
              touched={touched.confirmClave}
            />

            <FieldSelect
              label='Estado'
              name='estado'
              options={estados}
            />

            <ButtonSlicer
              fisrtSection="Usuario"
              secondSection="Grupos"
            />
            <CheckboxGroup
              label='Grupos'
              name='grupos'
              values={grupos}
            />

            <FieldButton type='submit' name='Crear Usuario' />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {isLoading && <Loader />}
        </Form>
      )}
    </Formik>
  )
}