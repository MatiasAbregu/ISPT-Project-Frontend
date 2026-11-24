import * as Yup from 'yup';

const StudentInscriptionYUP = Yup.object({
    requestedDivisions: Yup.array()
        .of(Yup.object({
            divisionId: Yup.number().integer().positive().required()
        }))
        .min(1, 'Selecciona al menos una comisión para enviar la solicitud.')
        .required('Selecciona al menos una comisión para enviar la solicitud.')
        .test('unique-divisions', 'Selecciona una sola comisión por espacio curricular.', divisions => {
            const divisionIds = (divisions ?? []).map(item => item.divisionId);
            return new Set(divisionIds).size === divisionIds.length;
        })
});

export default StudentInscriptionYUP;
