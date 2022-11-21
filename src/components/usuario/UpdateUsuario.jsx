import { useState } from 'react'
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { useMessageModal } from 'hooks/useMessageModal';
import { updateUsuarioValidation } from 'schemas/validation'
import { getUsuarioById, updateUsuario } from 'services/usuario'
import { getEstadosUsuario } from 'services/estadoUsuario'
import { getGrupos } from 'services/grupo'
import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import FieldSelect from 'components/inputsForm/FieldSelect'
import CheckboxGroup from 'components/inputsForm/CheckboxGroup'
import ButtonSlicer from 'components/inputsForm/ButtonSlicer'
import Modal from 'components/Modal';
import MessaggeInfo from 'components/MessageInfo';
import Loader from 'components/Loader'
import 'styles/Form.css';

export default function UpdateUsuario() {

  useChangeTitle('Actualizar Usuario')

  const { id } = useParams();
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
    const estados = await getEstadosUsuario();
    const grupos = await getGrupos();

    return { usuario, estados, grupos }
  }

  const { isLoading, data: { estados, grupos } } = useQuery(['usuarioUpdateData', id], () => handleGetData(id), {
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
      estados: [],
      grupos: []
    }
  });

  const usuarioUpdateMutation = useMutation(updateUsuario, {
    onSuccess: setSuccesMsg,
    onError: setErrorMsg
  });

  const onSubmit = ({ confirmEmail, ...newValues }) => usuarioUpdateMutation.mutate({ id, ...newValues })

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
              values={grupos.map(grupo => {
                return { id: grupo.id, nombre: grupo.nombre }
              })}
            />
            <FieldButton type='submit' name='Actualizar Usuario' />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {(isLoading || usuarioUpdateMutation.isLoading) && <Loader />}
          <Modal active={modalActive}>
            {!error && (
              <MessaggeInfo
                message="Usuario actualizado correctamente"
                type="success"
                onClick={() => {setClearMsg(); navigate(-1)}}
              />
            )}
            {error && (
              <MessaggeInfo
                message="Error al actualizar el usuario"
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