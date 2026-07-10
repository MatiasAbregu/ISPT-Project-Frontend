import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number().optional(),
    createdById: Yup.string().nullable(),
    updatedById: Yup.string().nullable(),
    Resolution: Yup.string().required('La resolución es requerida'),
    StartDate: Yup.date().required('La fecha de inicio es requerida'),
    EndDate: Yup.date().required('La fecha de fin es requerida'),
    VigencyDate: Yup.date().required('La fecha de vigencia es requerida'),
    Duration: Yup.number().required('La duración es requerida')
})