import * as Yup from 'yup';

export default Yup.object().shape({
    dni: Yup.boolean().default(false),
    photo: Yup.boolean().default(false),
    birth: Yup.boolean().default(false),
    cus: Yup.boolean().default(false),
    cds: Yup.boolean().default(false),
    cbc: Yup.boolean().default(false)
})