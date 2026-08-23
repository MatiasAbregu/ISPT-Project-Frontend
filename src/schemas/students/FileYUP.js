import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number(),
    createdById: Yup.string().nullable(),
    updatedById: Yup.string().nullable(),
    code: Yup.string().required("Complete este campo antes de continuar"),
    studentId: Yup.number().required('El legajo debe ser enviado desde un estudiante.'),
    curriculumId: Yup.number().required('Seleccione un curriculum antes de continuar.'),
    status: Yup.number().oneOf([1, 2, 3], "Seleccione una opción válida.").required("Seleccione un estado antes de continuar.")
})