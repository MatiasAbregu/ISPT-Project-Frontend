import * as Yup from 'yup';
import ContactYUP from "./ContactYUP";
import LocationYUP from "./LocationYUP";

export const PersonWithCUILYUP = (isRoleRequired = false) => {
    return Yup.object().shape({
        cuil: Yup.string().matches(/^[0-9]+$/, "El CUIL solo debe contener números")
            .required("Complete este campo antes de continuar."),
        roleName: isRoleRequired
            ? Yup.string().required("Seleccione un rol antes de continuar")
            : Yup.string().nullable()
    });
};

export default PersonWithCUILYUP;