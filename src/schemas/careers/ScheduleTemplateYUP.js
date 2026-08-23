import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number().optional(),
    createdById: Yup.string().nullable(),
    updatedById: Yup.string().nullable(),
    Day: Yup.string().required('El día es requerido'),
    StartTime: Yup.string().required('La hora de inicio es requerida'),
    EndTime: Yup.string().required('La hora de fin es requerida')
})