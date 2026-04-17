import * as Yup from 'yup';
import PersonYUP from './PersonYUP';

const PositionYUP = PersonYUP.concat(
    Yup.object({
        roles: Yup.array().of(Yup.string().required("El nombre del rol es obligatorio"))
            .min(1).required("Complete este campo antes de continuar")
    })
);

export default PositionYUP;