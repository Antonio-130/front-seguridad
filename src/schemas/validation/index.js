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
    .oneOf([Yup.ref('email'), null], 'Las direcciones de email no coinciden')
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

export const createAndUpdateGrupoValidation = Yup.object({
  nombre: Yup.string()
    .required('Requerido')
    .trim()
    .matches(/^[a-zA-Z]+$/, 'El nombre solo puede contener letras')
    .max(20, "Nombre muy largo"),
  descripcion: Yup.string()
    .required('Requerido')
    .trim()
    .max(30, "Descripcion muy larga"),
})

export const createAndUpdateEstadoUsuarioValidation = Yup.object({
  nombre: Yup.string()
    .required('Requerido')
    .trim()
    .matches(/^[a-zA-Z]+$/, 'El nombre solo puede contener letras')
    .max(15, "Nombre muy largo"),
})

export const changeClaveValidation = Yup.object({
  clave: Yup.string()
    .required('Requerido')
    .min(6, 'La clave debe tener más de 6 caracteres')
    .trim(),
  newClave: Yup.string()
    .required('Requerido')
    .min(6, 'La clave debe tener más de 6 caracteres')
    .trim(),
  confirmNewClave: Yup.string()
    .required('Requerido')
    .min(6, 'La clave debe tener más de 6 caracteres')
    .trim()
    .oneOf([Yup.ref('newClave'), null], 'Las claves no coinciden')
})