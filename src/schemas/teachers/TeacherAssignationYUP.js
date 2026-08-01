import * as Yup from 'yup';

export default Yup.object().shape({
    id: Yup.number(),
    createdById: Yup.string().nullable(),
    updatedById: Yup.string().nullable(),
    teacherId: Yup.number().required("Es obligatorio seleccionar un docente."),
    divisionId: Yup.number().required("ID de la división obligatorio."),
    teacherStatus: Yup.number()
        .oneOf([1, 2, 3, 4], "Seleccione un estado de docente válido.")
        .required("El estado del docente es obligatorio."),
    startDate: Yup.date().required("Seleccione una fecha de inicio."),
    endDate: Yup.date().nullable(),
    observations: Yup.string().nullable(),
});