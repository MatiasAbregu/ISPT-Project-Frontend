import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number(),
    personId: Yup.number().required('El título/certificado debe ser enviado desde una persona.'),
    Name: Yup.string().required('El nombre del título/certificado es requerido')
})