import * as Yup from 'yup';

export const createUsuarioValidation = Yup.object({
  nombre: Yup.string()
    .required('Requerido')
    .trim()
    .matches(/^[a-zA-Z]+$/, 'El nombre solo puede contener letras')
    .max(30, "Nombre muy largo"),
  apellido: Yup.string()
    .required('Requerido')
    .trim()
    .matches(/^[a-zA-Z]+$/, 'El apellido solo puede contener letras')
    .max(30, "Nombre muy largo"),
  username: Yup.string()
    .required('Requerido')
    .trim()
    .matches(/^[a-zA-Z0-9]+$/, 'El nombre de usuario solo puede contener letras y números')
    .max(30, "Nombre de usuario muy largo"),
  email: Yup.string()
    .email('Direccion de Email invalida')
    .required('Requerido')
    .trim(),
  confirmEmail: Yup.string()
    .email('Direccion de Email invalida')
    .required('Requerido')
    .trim()
    .oneOf([Yup.ref('email'), null], 'Las direcciones de email no coinciden'),
  clave: Yup.string()
    .required('Requerido')
    .min(6, 'La clave debe tener más de 6 caracteres')
    .trim(),
  confirmClave: Yup.string()
    .required('Requerido')
    .min(6, 'La clave debe tener más de 6 caracteres')
    .trim()
    .oneOf([Yup.ref('clave'), null], 'Las claves no coinciden')
})

export const updateUsuarioValidation = Yup.object({
  nombre: Yup.string()
    .required('Requerido')
    .trim()
    .matches(/^[a-zA-Z]+$/, 'El nombre solo puede contener letras')
    .max(30, "Nombre muy largo"),
  apellido: Yup.string()
    .required('Requerido')
    .trim()
    .matches(/^[a-zA-Z]+$/, 'El apellido solo puede contener letras')
    .max(30, "Nombre muy largo"),
  username: Yup.string()
    .required('Requerido')
    .trim()
    .matches(/^[a-zA-Z0-9]+$/, 'El nombre de usuario solo puede contener letras y números')
    .max(30, "Nombre de usuario muy largo"),
  email: Yup.string()
    .email('Direccion de Email invalida')
    .required('Requerido')
    .trim(),
  confirmEmail: Yup.string()
    .email('Direccion de Email invalida')
    .required('Requerido')
    .trim()
    .oneOf([Yup.ref('email'), null], 'Las direcciones de email no coinciden')
})

export const loginValidation = Yup.object({
  emailOrUsername: Yup.string()
    .required('Requerido')
    .trim(),
  clave: Yup.string()
    .required('Requerido')
    .min(6, 'La clave debe tener más de 6 caracteres')
    .trim()
})