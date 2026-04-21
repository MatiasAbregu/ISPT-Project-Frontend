import * as Yup from 'yup';

export default Yup.object().shape({
    cupof: Yup.string().length(12, "El CUPOF debe ser de 12 dígitos.").required("Complete este campo antes de continuar"),
    academicYear: Yup.number().required("Complete este campo antes de continuar"),
    turn: Yup.string().oneOf(["Mañana", "Tarde"], "Seleccione una opción válida en el turno")
        .required("Seleccione una turno"),
    nameSubject:  Yup.string().required("Complete este campo antes de continuar"),
    subjectType: Yup.string().oneOf(["Asignatura", "Seminario"], "Seleccione una opción válida")
        .required("Seleccione un tipo de espacio curricular"),
    typeSemester: Yup.string().oneOf(["Anual", "Bimestral", "Cuatrimestral"], "Seleccione una opción válida")
        .required("Seleccione un tipo de espacio curricular"),
    division: Yup.string().max(4, "Se admite un máximo de 4 carácteres.").required("Complete este campo antes de continuar"),
    startTime: Yup.string()
        .required('La hora de inicio es obligatoria')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato debe ser HH:mm'),
    endTime: Yup.string()
        .required('La hora de finalización es obligatoria')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato debe ser HH:mm')
        .test('is-after', 'La hora de fin debe ser posterior a la de inicio', function (value) {
            const { startTime } = this.parent;
            if (!startTime || !value) return true;
            return value > startTime;
        }),
    professorship: Yup.number().min(1, "El minimo es 1 hora cátedra").max(10, "El máximo son 10 horas cátedras")
    .required("Complete este campo antes de continuar"),
    observations: Yup.string()
});