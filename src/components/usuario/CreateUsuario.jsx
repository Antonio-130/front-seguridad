import React, {useState, useEffect} from 'react'
import { Formik, Form } from 'formik';
import { createUsuarioValidation } from 'schemas/validation';
import 'styles/Form.css';

import FieldText from 'components/inputsForm/FieldText';
import FieldButton from 'components/inputsForm/FieldButton';
import FieldSelect from 'components/inputsForm/FieldSelect';
import CheckboxGroup from './CheckboxGroup';
import { createUsuario } from 'services/usuario';
import { getEstadosUsuario } from 'services/estadoUsuario';
import { getGrupos } from 'services/grupo';
import { useNavigate } from 'react-router-dom';

export default function CreateUsuario() {

  const navigate = useNavigate()

  const [estados, setEstados] = useState([]);

  const [grupos, setGrupos] = useState([]);

  const [textSlicer, setTextSlicer] = useState("Grupos ➡");

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
    const estados = await getEstadosUsuario();
    const grupos = await getGrupos();
    setEstados(estados.data);
    setGrupos(grupos.data.map((grupo) => {
      return {
        id: grupo.id,
        nombre: grupo.nombre
      }
    }));
  }

  useEffect(() => {
    handleGetData();
  }, []);

  const onSubmit = values => {
    delete values.confirmEmail;
    delete values.confirmClave;

    alert(JSON.stringify(values));

    createUsuario(values).then(response => {
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

            <button type='button' onClick={handleToggleGrupos} className='btn-slicer'>{textSlicer}</button>
            <CheckboxGroup
              label='Grupos'
              name='grupos'
              values={grupos}
            />

            <FieldButton type='submit' name='Crear Usuario' />
          </div>
        </Form>
      )}
    </Formik>
  )
}