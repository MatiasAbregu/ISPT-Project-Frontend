import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number().optional(),
    createdById: Yup.string().nullable(),
    updatedById: Yup.string().nullable(),
    Resolution: Yup.string().required('La resolución es requerida'),
    VigencyDate: Yup.date().required('La fecha de vigencia es requerida'),
    EndDate: Yup.date().nullable(),
    Duration: Yup.number().required('La duración es requerida')
})