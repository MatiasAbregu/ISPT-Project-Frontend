import * as Yup from 'yup';

export default Yup.object().shape({
    username: Yup.string().required("Complete este campo antes de continuar."),
    password: Yup.string().required("Complete este campo antes de continuar."),
    sessiontype: Yup.boolean().default(false)
})