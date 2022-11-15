import React, {useState } from 'react'
import { Formik, Form } from 'formik';
import { updateUsuarioValidation } from 'schemas/validation'
import { useNavigate, useParams } from 'react-router-dom'
import 'styles/Form.css';
import Loader from 'components/Loader'
import { useQuery, useMutation } from 'react-query'

import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import FieldSelect from 'components/inputsForm/FieldSelect'
import CheckboxGroup from 'components/inputsForm/CheckboxGroup'
import ButtonSlicer from 'components/inputsForm/ButtonSlicer'

import { getUsuarioById, updateUsuario } from 'services/usuario'
import { getEstadosUsuario } from 'services/estadoUsuario'
import { getGrupos } from 'services/grupo'

import Modal from 'components/Modal';
import { MessaggeErrorAndSuccess } from 'components/MessageInfo';

import { useChangeTitle } from 'hooks/useChangeTitle'

export default function UpdateUsuario() {

  useChangeTitle('Actualizar Usuario')

  const { id } = useParams();
  const navigate = useNavigate();

  const [estados, setEstados] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [initialValues, setInitialValues] = useState({
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    confirmEmail: '',
    estado: '',
    grupos: []
  });

  const handleGetData = async (idUsuario) => {
    const usuario = await getUsuarioById(idUsuario);
    const estados = await getEstadosUsuario();
    const grupos = await getGrupos();

    return {
      usuario: usuario.data,
      estados: estados.data,
      grupos: grupos.data
    }
  }

  const [modalActive, setModalActive] = useState(false);

  const { isLoading } = useQuery(['usuarioUpdateData', id], () => handleGetData(id), {
    onSuccess: (data) => {
      const { usuario, estados, grupos } = data;
      setEstados(estados);
      setGrupos(grupos.map((grupo) => {
        return {
          id: grupo.id,
          nombre: grupo.nombre
        }
      }));
      setInitialValues({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        username: usuario.username,
        email: usuario.email,
        confirmEmail: usuario.email,
        estado: usuario.estado.id,
        grupos: usuario.grupos.map((grupo) => grupo.id.toString())
      });
    }, refetchOnWindowFocus: false }
  );

  const usuarioUpdateMutation = useMutation(updateUsuario);

  const onSubmit = values => {
    const newValues = {
      id,
      nombre: values.nombre,
      apellido: values.apellido,
      username: values.username,
      email: values.email,
      estado: values.estado,
      grupos: values.grupos
    }
    usuarioUpdateMutation.mutate(newValues)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateUsuarioValidation}
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
              label="Grupos"
              name="grupos"
              values={grupos}
            />

            <FieldButton type='submit' name='Actualizar Usuario' onClick={() => setModalActive(true)} />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {(isLoading || usuarioUpdateMutation.isLoading) && <Loader />}
          <Modal active={modalActive}>
            <MessaggeErrorAndSuccess
              isSuccess={usuarioUpdateMutation.isSuccess}
              messageSuccess="Usuario actualizado!"
              onClickSuccess={() => {setModalActive(false); navigate(-1)}}
              isError={usuarioUpdateMutation.isError}
              messageError="Error al actualizar el usuario"
              onClickError={() => setModalActive(false)}
            />
          </Modal>
        </Form>
      )}
    </Formik>
  )
}