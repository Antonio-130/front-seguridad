import { ErrorMessage } from 'formik'

export default function Message({ errors, touched, name }) {
  return (
    <p className='error-msg'>
      {errors && touched
        ? (<ErrorMessage name={name} />)
        : touched && !errors
        ? (<span className='ok-msg'>Correcto</span>)
        : null}
    </p>
  )
}