import * as Yup from 'yup';

export default Yup.object().shape({
    id: Yup.number(),
    updatedById: Yup.string().nullable(),
    email: Yup.string().email("Ingrese un formato de correo válido"),
    phoneNumber: Yup.string()
        .transform((value) => (value === "" ? null : value))
        .nullable()
        .matches(/^[0-9]+$/, "El número de télefono solo debe contener números"),
    contactNameEmergency: Yup.string().nullable(),
    emergencyNumber: Yup.string()
        .transform((value) => (value === "" ? null : value))
        .nullable()
        .matches(/^[0-9]+$/, "El número de télefono solo debe contener números"),
})