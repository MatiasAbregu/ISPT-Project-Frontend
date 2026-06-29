import PersonSchema from './PersonYUP';
import * as Yup from 'yup';

const StrictPersonSchema = PersonSchema.concat(
    Yup.object({
        roleName: Yup.string().required("Seleccione un rol antes de continuar")
    })
);

export default StrictPersonSchema;