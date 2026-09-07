import * as Yup from 'yup';

export default Yup.object().shape({
    FileId: Yup.number().required('El ID del estudiante es requerido'),
    createdById: Yup.string().nullable()
})