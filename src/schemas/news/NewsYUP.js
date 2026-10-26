import * as Yup from 'yup'

export default Yup.object().shape({
    title: Yup.string()
        .trim()
        .min(3, 'El título debe tener al menos 3 caracteres.')
        .max(120, 'El título no puede superar los 120 caracteres.')
        .required('El título es requerido.'),
    content: Yup.string()
        .trim()
        .min(3, 'El texto debe tener al menos 3 caracteres.')
        .max(4000, 'El texto no puede superar los 4000 caracteres.')
        .required('El texto es requerido.')
})
