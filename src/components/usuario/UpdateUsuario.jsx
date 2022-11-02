import React, {useState, useEffect } from 'react'
import { Formik, Form } from 'formik';
import { updateUsuarioValidation } from 'schemas/validation';
import { useNavigate, useParams } from 'react-router-dom';
import 'styles/Form.css';
import Loader from 'components/Loader';
import { useQuery, useQueries } from 'react-query';

import FieldText from 'components/inputsForm/FieldText';
import FieldButton from 'components/inputsForm/FieldButton';
import FieldSelect from 'components/inputsForm/FieldSelect';
import GrupoSection from './GrupoSection';

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

  /* useQueries([
    useQuery(['usuarioUpdate', id], () => getUsuarioById(id), {
      onSuccess: (res) => {
        if (res.status === "success") {
          setInitialValues({
            nombre: res.data.nombre,
            apellido: res.data.apellido,
            username: res.data.username,
            email: res.data.email,
            confirmEmail: res.data.email,
            estado: res.data.estado.id,
            grupos: res.data.grupos.map(grupo => grupo.id.toString())
          });
        }
      }, refetchOnWindowFocus: false }
    ),
    useQuery(['estadosUpdate'], getEstadosUsuario,{
      onSuccess: (res) => {
        if (res.status === "success") {
          setEstados(res.data)
        }
      }, refetchOnWindowFocus: false }
    ),
    useQuery(['gruposUpdate'], getGrupos, {
      onSuccess: (res) => {
        if (res.status === "success") {
          setGrupos(res.data.map(grupo => {
            return {
              id: grupo.id,
              nombre: grupo.nombre
            }
          }))
        }
      }, refetchOnWindowFocus: false }
    )
  ]); */

  const { isLoading: loadingUsuario } = useQuery(['usuarioUpdate', id], () => getUsuarioById(id), {
    onSuccess: (res) => {
      if (res.status === "success") {
        setInitialValues({
          nombre: res.data.nombre,
          apellido: res.data.apellido,
          username: res.data.username,
          email: res.data.email,
          confirmEmail: res.data.email,
          estado: res.data.estado.id,
          grupos: res.data.grupos.map(grupo => grupo.id.toString())
        });
      }
    }, refetchOnWindowFocus: false }
  );
  const { isLoading: loadingEstados } = useQuery(['estadosUpdate'], getEstadosUsuario,{
    onSuccess: (res) => {
      if (res.status === "success") {
        setEstados(res.data)
      }
    }, refetchOnWindowFocus: false }
  );
  const { isLoading: loadingGrupos } = useQuery(['gruposUpdate'], getGrupos, {
    onSuccess: (res) => {
      if (res.status === "success") {
        setGrupos(res.data.map(grupo => {
          return {
            id: grupo.id,
            nombre: grupo.nombre
          }
        }))
      }
    }, refetchOnWindowFocus: false }
  );

  /* const handleGetData = async (idUsuario) => {
    const usuario = await getUsuarioById(idUsuario);
    const estados = await getEstadosUsuario();
    const grupos = await getGrupos();
    setInitialValues({
      nombre: usuario.data.nombre,
      apellido: usuario.data.apellido,
      username: usuario.data.username,
      email: usuario.data.email,
      confirmEmail: usuario.data.email,
      estado: usuario.data.estado.id,
      grupos: usuario.data.grupos.map(grupo => grupo.id.toString())
    });
    setEstados(estados.data);
    setGrupos(grupos.data.map(grupo => {
      return {
        id: grupo.id,
        nombre: grupo.nombre
      }
    }));
  }

  useEffect(() => {
    handleGetData(id);
  }, [id]); */

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
            <GrupoSection
              label="Grupos"
              values={grupos}
            />

            <FieldButton type='submit' name='Actualizar Usuario' />
          </div>
          {/* {loadingUsuario || loadingEstados || loadingGrupos ? <Loader /> : null} */}
        </Form>
      )}
    </Formik>
  )
}