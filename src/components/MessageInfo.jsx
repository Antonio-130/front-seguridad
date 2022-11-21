import FieldButton from './inputsForm/FieldButton'
import 'styles/MessageInfo.css'

export default function MessageInfo({ message, type, onClick, optionalButton }) {
  return (
    <div className={`msg-info-container ${type}`}>
      <h1 className='message-info'>{message}</h1>
      <div className='btn-container'>
        <FieldButton type='button' name='Aceptar' onClick={onClick}/>
        {optionalButton}
      </div>
    </div>
  )
}