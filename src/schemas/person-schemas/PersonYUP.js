import * as Yup from 'yup';
import ContactYUP from "./ContactYUP";
import LocationYUP from "./LocationYUP";

export default Yup.object().shape({
    id: Yup.number(),
    createdById: Yup.string(),
    updatedById: Yup.string(),
    firstname: Yup.string().required("Complete este campo antes de continuar"),
    lastname: Yup.string().required("Complete este campo antes de continuar"),
    birthdate: Yup.date().required("Seleccione una fecha de nacimiento"),
    gender: Yup.string().oneOf(["Masculino", "Femenino", "Otro"], "Seleccione una opción válida")
        .required("Seleccione un género"),
    typeDocument: Yup.string().oneOf(["DNI", "Pasaporte"], "Seleccione una opción válida")
        .required("Seleccione un tipo de documento"),
    documentNumber: Yup.string().matches(/^[0-9]+$/, "El documento solo debe contener números")
        .required("Complete este campo antes de continuar."),
    cuil: Yup.string().matches(/^[0-9]+$/, "El CUIL solo debe contener números")
        .required("Complete este campo antes de continuar."),
    locationDTO: LocationYUP,
    contactDTO: ContactYUP,
    practicePlace: Yup.string(),
    observations: Yup.string(),
    roleName: Yup.string()
});