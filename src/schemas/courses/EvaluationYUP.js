import * as Yup from 'yup';

export default Yup.object().shape({
    date: Yup.date().required("Seleccione la fecha antes de continuar"),
    type: Yup.number().typeError("Seleccione un tipo de instancia evaluativa").required("Seleccione el tipo de instancia evaluativa"),
    number: Yup.number()
        .typeError("Ingrese un número válido")
        .required("Complete este campo antes de continuar")
        .min(1, "El número debe ser mayor o igual a 1"),
    divisionId: Yup.number().nullable().optional(),
    createdById: Yup.string().nullable().optional()
});
