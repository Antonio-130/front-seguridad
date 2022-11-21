import { Field } from 'formik'
import Message from './Message'

export default function FieldText({ label, name, type, placeholder, errors, touched }) {

  const handleTxtClass = (errors, touched) => {
    return (
      `form-input-text
      ${errors && touched
        ? 'error'
        :touched && !errors
        ? 'ok' : ''
      }`
    )
  }

  return (
    <div className='form-input-container'>
      <label htmlFor={name} className='form-input-label'>{label}</label>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className={handleTxtClass(errors, touched)}
        />
      <Message errors={errors} touched={touched} name={name} />
    </div>
  )
}
