import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useQuery , useMutation } from 'react-query'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { useAccionesSections } from 'hooks/useAccionesSections'
import { useMessageModal } from 'hooks/useMessageModal'
import { createAndUpdateGrupoValidation } from 'schemas/validation'
import { createGrupo } from 'services/grupo'
import { getAcciones } from 'services/acciones'
import Loader from 'components/Loader'
import Modal from 'components/Modal'
import MessaggeInfo from 'components/MessageInfo'
import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import CheckboxGroup from 'components/inputsForm/CheckboxGroup'
import ButtonSlicer from 'components/inputsForm/ButtonSlicer'
import 'styles/Form.css'

export default function CreateGrupo() {

  useChangeTitle('Crear Grupo')

  const navigate = useNavigate()

  const { error, modalActive, setClearMsg, setSuccesMsg, setErrorMsg } = useMessageModal()

  const { isLoading, data: acciones } = useQuery(['acciones'], getAcciones, {
    refetchOnWindowFocus: false,
    initialData: [],
  })

  const createGrupoMutation = useMutation(createGrupo, {
    onSuccess: setSuccesMsg,
    onError: setErrorMsg
  })

  const listOfAcciones = useAccionesSections(acciones)

  const initialValues = {
    nombre: '',
    descripcion: '',
    acciones: []
  }

  const onSubmit = values => createGrupoMutation.mutate(values)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createAndUpdateGrupoValidation}
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
              label='Descripcion'
              name='descripcion'
              type='text'
              placeholder='descripcion...'
              errors={errors.descripcion}
              touched={touched.descripcion}
            />
            <ButtonSlicer
              fisrtSection="Grupo"
              secondSection="Acciones"
            />
            <CheckboxGroup
              label='Acciones'
              name='acciones'
              sections={listOfAcciones}
            />
            <FieldButton type='submit' name='Crear Grupo' />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {(isLoading || createGrupoMutation.isLoading) && <Loader />}
          <Modal active={modalActive}>
            {!error && (
              <MessaggeInfo
                message='Grupo creado con exito'
                type='success'
                onClick={() => {setClearMsg(); navigate(-1)}}
              />
            )}
            {error && (
              <MessaggeInfo
                message='Error al crear el grupo'
                type='error'
                onClick={setClearMsg}
              />
            )}
          </Modal>
        </Form>
      )}
    </Formik>
  )
}