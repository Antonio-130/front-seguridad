import { useState, useContext } from 'react'
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { useMessageModal } from 'hooks/useMessageModal';
import { updateUsuarioValidation } from 'schemas/validation'
import { getGrupos } from 'services/grupo';
import { getEstadosUsuario } from 'services/estadoUsuario';
import { getUsuarioById, updateUsuario } from 'services/usuario'
import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import FieldSelect from 'components/inputsForm/FieldSelect'
import CheckboxGroup from 'components/inputsForm/CheckboxGroup'
import ButtonSlicer from 'components/inputsForm/ButtonSlicer'
import Modal from 'components/Modal';
import MessaggeInfo from 'components/MessageInfo';
import Loader from 'components/Loader'
import UsuarioContext from 'context/UsuarioContext';
import 'styles/Form.css';

export default function Profile() {

  useChangeTitle('Perfil')

  const { hasAccesoByTag } = useContext(UsuarioContext);

  const { id } = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  const { error, modalActive, setSuccesMsg, setErrorMsg, setClearMsg } = useMessageModal()

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
    if (hasAccesoByTag("grupos") && hasAccesoByTag("estadosUsuario")) {
      const grupos = await getGrupos();
      const estados = await getEstadosUsuario();
      return { usuario, grupos, estados };
    }
    if (hasAccesoByTag("grupos")) {
      const grupos = await getGrupos();
      return { usuario, grupos };
    }
    if (hasAccesoByTag("estadosUsuario")) {
      const estados = await getEstadosUsuario();
      return { usuario, estados };
    }
    return { usuario };
  }

  const { isLoading, data: {grupos, estados} } = useQuery(['usuarioProfile', id], () => handleGetData(id), {
    onSuccess: ({ usuario }) => {
      setInitialValues({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        username: usuario.username,
        email: usuario.email,
        confirmEmail: usuario.email,
        estado: usuario.estado.id,
        grupos: usuario.grupos.map(grupo => grupo.id.toString())
      });
    }, refetchOnWindowFocus: false,
    initialData: {
      usuario: {},
      grupos: [],
      estados: []
    }
  });

  const profileUpdateMutation = useMutation(updateUsuario, {
    onSuccess: setSuccesMsg,
    onError: setErrorMsg
  });

  const onSubmit = ({ confirmEmail, ...newValues }) => {
    console.log({id, ...newValues})
    /* profileUpdateMutation.mutate({ id, ...newValues }) */
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
            {hasAccesoByTag('estadosUsuario') && (
            <FieldSelect
              label='Estado'
              name='estado'
              options={estados}
            />)}
            {hasAccesoByTag('grupos') && (
              <>
                <ButtonSlicer
                  fisrtSection="Usuario"
                  secondSection="Grupos"
                />
                <CheckboxGroup
                  label="Grupos"
                  name="grupos"
                  values={grupos.map(grupo => {
                    return { id: grupo.id, nombre: grupo.nombre }
                  })}
                />
              </>
            )}
            <FieldButton type='submit' name='Actualizar Datos' />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {(isLoading || profileUpdateMutation.isLoading) && <Loader />}
          <Modal active={modalActive}>
            {!error && (
              <MessaggeInfo
                message="Datos actualizados correctamente"
                type="success"
                onClick={() => {setClearMsg(); navigate(-1)}}
              />
            )}
            {error && (
              <MessaggeInfo
                message="Error al actualizar los datos"
                type="error"
                onClick={setClearMsg}
              />
            )}
          </Modal>
        </Form>
      )}
    </Formik>
  )
}