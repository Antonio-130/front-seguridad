import React, {useState } from 'react'
import { Formik, Form } from 'formik';
import { updateUsuarioValidation } from 'schemas/validation';
import { useNavigate, useParams } from 'react-router-dom';
import 'styles/Form.css';
import Loader from 'components/Loader';
import { useQuery } from 'react-query';

import FieldText from 'components/inputsForm/FieldText';
import FieldButton from 'components/inputsForm/FieldButton';
import FieldSelect from 'components/inputsForm/FieldSelect';
import CheckboxGroup from './CheckboxGroup';

import { getUsuarioById, updateUsuario } from 'services/usuario';
import { getEstadosUsuario } from 'services/estadoUsuario';
import { getGrupos } from 'services/grupo';

export default function UpdateUsuario() {

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
  const [textSlicer, setTextSlicer] = useState("Grupos ➡");

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
        estado: usuario.estado,
        grupos: usuario.grupos.map((grupo) => grupo.id.toString())
      });
    }, refetchOnWindowFocus: false }
  );

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

  const onSubmit = values => {
    delete values.confirmEmail;
    values.id = id;

    updateUsuario(values).then(response => {
      console.log(response);
      setTimeout(() => {
        navigate(-1);
      }
      , 1000);
    }
    ).catch(error => {
      console.log(error);
    });
  }

  const handleToggleGrupos = () => {
    document.querySelector('.checkboxGroup-container').classList.toggle('active');
    if (textSlicer === "Grupos ➡") {
      setTextSlicer("⬅ Usuario");
    } else {
      setTextSlicer("Grupos ➡");
    }
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

            <button type='button' onClick={handleToggleGrupos} className='btn-slicer'>{textSlicer}</button>
            <CheckboxGroup
              label="Grupos"
              name="grupos"
              values={grupos}
            />

            <FieldButton type='submit' name='Actualizar Usuario' />
          </div>
          {isLoading && <Loader />}
        </Form>
      )}
    </Formik>
  )
}