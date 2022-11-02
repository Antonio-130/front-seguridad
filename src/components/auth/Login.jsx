import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { loginValidation } from 'schemas/validation';
import 'styles/Form.css';
import Loader from 'components/Loader';

import FieldText from 'components/inputsForm/FieldText';
import FieldButton from 'components/inputsForm/FieldButton';

import UsuarioContext from 'context/UsuarioContext';

import { login } from 'services/auth';

export default function Login() {

  const {types, dispatch} = useContext(UsuarioContext);

  let navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    emailOrUsername: '',
    clave: ''
  }

  const onSubmit = values => {
    setLoading(true);
    const new_data = transformData(values)
    login(new_data).then((res) => {
      if (res.status === "success") {
        dispatch({
          type: types.LOGIN,
          payload: {
            usuario: res.data[0],
            acciones: res.data[2].acciones,
          },
        });
        localStorage.setItem('usuario', JSON.stringify(res.data[0]));
        localStorage.setItem('token', JSON.stringify(res.data[1].token));
        localStorage.setItem('acciones', JSON.stringify(res.data[2].acciones));
        setError(false);
        setLoading(false);
        navigate('/');
      }
      else {
        setLoading(false);
        setError(true);
      }
    }).catch((err) => {
      setError(true);
      setLoading(false);
      console.log(err);
    });
  }

  const transformData = (data) => {
    const {clave, emailOrUsername } = data
    if (emailOrUsername.includes('@')) {
      return { email: emailOrUsername, clave }
    }
    return { username: emailOrUsername, clave }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className='form-container'>
            <FieldText
              label='Email o Username'
              name='emailOrUsername'
              type='text'
              placeholder='Email o Username'
              errors={errors.emailOrUsername}
              touched={touched.emailOrUsername}
            />

            <FieldText
              label='Clave'
              name='clave'
              type='password'
              placeholder='clave...'
              errors={errors.clave}
              touched={touched.clave}
            />

            <FieldButton type='submit' name='Iniciar sesión' />
            {error &&
              <div className='error-container'>
                <p>Login incorrecto</p>
              </div>
            }
          </div>
          {loading && <Loader />}
        </Form>
      )}
    </Formik>
  )
}
