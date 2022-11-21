import { useState } from 'react'
import { Formik, Form } from 'formik'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { useAccionesSections } from 'hooks/useAccionesSections'
import { useChangeTitle } from 'hooks/useChangeTitle'
import { useMessageModal } from 'hooks/useMessageModal'
import { createAndUpdateGrupoValidation } from 'schemas/validation'
import { getAcciones } from 'services/acciones'
import { updateGrupo, getGrupoById } from 'services/grupo'
import FieldText from 'components/inputsForm/FieldText'
import FieldButton from 'components/inputsForm/FieldButton'
import CheckboxGroup from 'components/inputsForm/CheckboxGroup'
import ButtonSlicer from 'components/inputsForm/ButtonSlicer'
import Modal from 'components/Modal'
import MessaggeInfo from 'components/MessageInfo'
import Loader from 'components/Loader'
import 'styles/Form.css'


export default function UpdateGrupo() {

  useChangeTitle('Actualizar Grupo')

  const { id: idGrupo } = useParams()

  const navigate = useNavigate()

  const { error, modalActive, setClearMsg, setSuccesMsg, setErrorMsg } = useMessageModal()

  const [initialValues, setInitialValues] = useState({
    nombre: '',
    descripcion: '',
    acciones: []
  })

  const handleGetData = async (idGrupo) => {
    const acciones = await getAcciones()
    const grupo = await getGrupoById(idGrupo)

    return { grupo, acciones }
  }

  const { isLoading, data: { acciones } } = useQuery(['grupoUpdateData', idGrupo], () => handleGetData(idGrupo), {
    onSuccess: ({ grupo }) => {
      setInitialValues({
        nombre: grupo.nombre,
        descripcion: grupo.descripcion,
        acciones: grupo.acciones.map(accion => accion.id_accion.toString())
      })
    },
    refetchOnWindowFocus: false,
    initialData: {
      grupo: {},
      acciones: []
    }
  })

  const updateGrupoMutation = useMutation(updateGrupo, {
    onSuccess: setSuccesMsg,
    onError: setErrorMsg
  })

  const listOfAcciones = useAccionesSections(acciones)

  const onSubmit = values => updateGrupoMutation.mutate({id: idGrupo, ...values})

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createAndUpdateGrupoValidation}
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
            <FieldButton type='submit' name='Actualizar Grupo' />
            <FieldButton type='button' name='Cancelar' onClick={() => navigate(-1)} />
          </div>
          {(isLoading || updateGrupoMutation.isLoading) && <Loader />}
          <Modal active={modalActive}>
            {!error && (
              <MessaggeInfo
                message='Grupo actualizado correctamente'
                type='success'
                onClick={() => {setClearMsg(); navigate(-1)}}
              />
            )}
            {error && (
              <MessaggeInfo
                message='Error al actualizar el grupo'
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