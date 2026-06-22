import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number().optional(),
    Code: Yup.string().required("Complete este campo antes de continuar"),
    Year: Yup.number().required("Complete este campo antes de continuar"),
    Name:  Yup.string().required("Complete este campo antes de continuar"),
    Format: Yup.string().oneOf(["Asignatura", "Seminario"], "Seleccione una opción válida")
        .required("Seleccione un tipo de espacio curricular"),
    Type: Yup.string().oneOf(["Anual", "Bimestral", "Cuatrimestral"], "Seleccione una opción válida")
        .required("Seleccione un tipo de espacio curricular"),
    Duration: Yup.number().min(1, "El minimo es 1 hora cátedra").max(10, "El máximo son 10 horas cátedras")
    .required("Complete este campo antes de continuar"),
    IsCorrelative: Yup.boolean().optional()
});