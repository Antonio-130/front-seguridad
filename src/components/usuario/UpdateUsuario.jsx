import React, {useState, useEffect } from 'react'
import { Formik, Form } from 'formik';
import { updateUsuarioValidation } from 'schemas/validation';
import { useNavigate, useParams } from 'react-router-dom';
import 'styles/Form.css';

import FieldText from 'components/inputsForm/FieldText';
import FieldButton from 'components/inputsForm/FieldButton';
import FieldSelect from 'components/inputsForm/FieldSelect';
import GrupoSection from './GrupoSection';

import { getUsuarioById, updateUsuario } from 'services/usuario';
import { getEstadosUsuario } from 'services/estadoUsuario';

export default function UpdateUsuario() {

  const [estados, setEstados] = useState([]);
  const [textSlicer, setTextSlicer] = useState("Grupos ➡");

  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    confirmEmail: '',
    estado: '',
    grupos: []
  });

  const handleGetEstados = () => {
    getEstadosUsuario().then(response => {
      setEstados(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  const handleGetUsuario = (idUsuario) => {
    getUsuarioById(idUsuario).then(response => {
      setInitialValues({
        nombre: response.data.nombre,
        apellido: response.data.apellido,
        username: response.data.username,
        email: response.data.email,
        confirmEmail: response.data.email,
        estado: response.data.estado.id,
        grupos: response.data.grupos.map(grupo => grupo.id.toString())
      });
    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    handleGetUsuario(id);
    handleGetEstados();
  }, [id]);

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
    document.querySelector('.grupos-container').classList.toggle('active');
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
            <GrupoSection />

            <FieldButton type='submit' name='Actualizar Usuario' />
          </div>
        </Form>
      )}
    </Formik>
  )
}