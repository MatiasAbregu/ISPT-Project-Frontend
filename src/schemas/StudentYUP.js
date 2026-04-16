import * as Yup from 'yup';
import PersonYUP from './PersonYUP';

const StudentYUP = PersonYUP.concat(
    Yup.object({
        file: Yup.string().required("Complete este campo antes de continuar"),
        status: Yup.string().oneOf(["Activo", "Inactivo", "Egresado"], "Seleccione una opción válida").required(),
        startDate: Yup.date().required("Seleccione una fecha de nacimiento"),
        practicePlace: Yup.string()
    })
);

export default StudentYUP;