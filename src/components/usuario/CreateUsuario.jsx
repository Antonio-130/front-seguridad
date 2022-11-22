import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { useMessageModal } from 'hooks/useMessageModal'
import { useGeneratePassword } from 'hooks/useGeneratePassword'
import { createUsuarioValidation } from 'schemas/validation'
import { createUsuario } from 'services/usuario'
import { getEstadosUsuario } from 'services/estadoUsuario'
import { getGrupos } from 'services/grupo'
import { sendEmail } from 'services/auth'
import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import FieldSelect from 'components/inputsForm/FieldSelect'
import CheckboxGroup from 'components/inputsForm/CheckboxGroup'
import ButtonSlicer from 'components/inputsForm/ButtonSlicer'
import Modal from 'components/Modal'
import MessaggeInfo from 'components/MessageInfo'
import Loader from 'components/Loader'
import 'styles/Form.css'

export default function CreateUsuario() {

  useChangeTitle('Crear Usuario')

  const { error, modalActive, setClearMsg, setSuccesMsg, setErrorMsg } = useMessageModal()

  const navigate = useNavigate()

  const initialValues = {
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    confirmEmail: '',
    estado: '1',
    grupos: ["2"]
  }

  const handleGetData = async () => {
    const estados = await getEstadosUsuario()
    const grupos = await getGrupos()

    return { estados, grupos }
  }

  const { isLoading, data: { estados, grupos } } = useQuery('createUsuarioData', handleGetData, {
    refetchOnWindowFocus: false,
    initialData: {
      estados: [],
      grupos: []
    }
  })

  const createUsuarioMutation = useMutation(createUsuario, {
    onError: setErrorMsg
  })

  const sendEmailMutation = useMutation(sendEmail, {
    onSuccess: setSuccesMsg,
    onError: setErrorMsg
  })

  const newPass = useGeneratePassword(8)

  const onSubmit = ({ confirmEmail, ...newValues }) => {
    createUsuarioMutation.mutate({ clave: newPass, ...newValues }, {
      onSuccess: () => {
        sendEmailMutation.mutate({
          email: newValues.email,
          username: newValues.username,
          new_clave: newPass
        })
      }
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
              values={grupos.map(grupo => {
                return { id: grupo.id, nombre: grupo.nombre }
              })}
            />
            <FieldButton type='submit' name='Crear Usuario' />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {(isLoading || createUsuarioMutation.isLoading || sendEmailMutation.isLoading) && <Loader />}
          <Modal active={modalActive}>
            {!error && (
              <MessaggeInfo
                message="Usuario creado correctamente"
                type="success"
                onClick={() => {setClearMsg(); navigate(-1)}}
              />
            )}
            {error && (
              <MessaggeInfo
                message={
                  (createUsuarioMutation.isError && "Error al crear el usuario")
                  || (sendEmailMutation.isError && "Usuario creado pero hubo un error al enviar el email")
                }
                type="error"
                onClick={() => {
                  if (createUsuarioMutation.isError) setClearMsg()
                  if (sendEmailMutation.isError) {setClearMsg(); navigate(-1)}
                }}
              />
            )}
          </Modal>
        </Form>
      )}
    </Formik>
  )
}