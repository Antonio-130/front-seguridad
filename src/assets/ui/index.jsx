import 'styles/Icons.css'

import addIcon from './create.svg'
import deleteIcon from './delete.svg'
import lookupIcon from './lookup.svg'
import updateIcon from './update.svg'
import arrowDownIcon from './arrow-down.svg'
import arrowUpIcon from './arrow-up.svg'
import infoIcon from './info.svg'
import keyIcon from './key.svg'

export const AddIcon = ({name}) => {
  return (
    <img src={addIcon} alt={`create ${name} icon`} title="Añadir" className='icon add'/>
  )
}

export const UpdateIcon = ({name}) => {
  return (
    <img src={updateIcon} alt={`update ${name} icon`} title="Actualizar" className='icon'/>
  )
}

export const DeleteIcon = ({name}) => {
  return (
    <img src={deleteIcon} alt={`delete ${name} icon`} title="Eliminar" className='icon'/>
  )
}

export const LookupIcon = ({name}) => {
  return (
    <img src={lookupIcon} alt={`view ${name} icon`} title="Ver" className='icon'/>
  )
}

export const ArrowDownIcon = () => {
  return (
    <img src={arrowDownIcon} alt="arrow down icon" title="Mostrar" className='icon arrow'/>
  )
}

export const ArrowUpIcon = () => {
  return (
    <img src={arrowUpIcon} alt="arrow up icon" title="Ocultar" className='icon arrow'/>
  )
}

export const InfoIcon = () => {
  return (
    <img src={infoIcon} alt="info icon" title="Información" className='icon info'/>
  )
}

export const KeyIcon = () => {
  return (
    <img src={keyIcon} alt="key icon" title="Restablecer clave" className='icon'/>
  )
}

