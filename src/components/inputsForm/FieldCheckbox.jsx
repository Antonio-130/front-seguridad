import { Field } from 'formik'
import 'styles/Form.css'

export default function FieldCheckbox({ label, name, value }) {
  return (
    <div className='form-checkbox-container'>
      <label htmlFor={name} className='form-checkbox-label'>{label}</label>
        <Field type="checkbox" name={name} value={value.toString()} id={value} />
    </div>
  )
}