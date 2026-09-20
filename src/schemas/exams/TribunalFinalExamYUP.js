import * as Yup from 'yup';

const nullableSelect = () =>
    Yup.mixed()
        .nullable()
        .notRequired()
        .transform((value) => (value === '' || value === undefined ? null : value));

export default Yup.object().shape({
    PresidentId: Yup.mixed()
        .required('Debe seleccionar un titular para la mesa'),

    Vocal1Id: nullableSelect().test(
        'not-same-as-president',
        'El Vocal N°1 no puede ser la misma persona que el titular',
        function (value) {
            if (!value) return true;
            return value !== this.resolve(Yup.ref('PresidentId'));
        }
    ),

    Vocal2Id: nullableSelect().test(
        'not-same-as-others',
        'El Vocal N°2 no puede repetirse con el titular ni con el Vocal N°1',
        function (value) {
            if (!value) return true;
            const president = this.resolve(Yup.ref('PresidentId'));
            const vocal1 = this.resolve(Yup.ref('Vocal1Id'));
            return value !== president && value !== vocal1;
        }
    )
});