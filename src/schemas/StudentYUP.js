import * as Yup from 'yup';

const countries = ["Argentina", "Chile", "Perú", "Bolivia", "Paraguay", "Uruguay", "Brasil", "Ecuador", "Colombia", "Venezuela"];
const provinces = ["Córdoba", "Buenos Aires", "Mendoza", "Santiago", "Valparaíso", "Concepción", "Lima", "Arequipa", "Cusco", "Andrés Ibáñez", "Murillo", "Cercado", "Asunción", "Ciudad del Este", "Encarnación", "Montevideo", "Canelones", "Maldonado", "São Paulo", "Río de Janeiro", "Minas Gerais", "Quito", "Guayas", "Manabí", "Medellín", "Cali", "Bogota", "Caracas", "Maracaibo", "Cumaná"];
const departments = ["Calamuchita", "Capital", "Colón", "Cruz del Eje", "General Roca", "General San Martín", "Ischilín", "Juárez Celman", "Marcos Juárez", "Minas", "Pocho", "Presidente Roque Sáenz Peña", "Punilla", "Río Cuarto", "Río Primero", "Río Seco", "Río Segundo", "San Alberto", "San Javier", "San Justo", "Santa María", "Sobremonte", "Tercero Arriba", "Totoral", "Tulumba", "Unión"
];

export default Yup.object().shape({
    firstname: Yup.string().required("Complete este campo antes de continuar"),
    lastname: Yup.string().required("Complete este campo antes de continuar"),
    birthdate: Yup.date().required("Seleccione una fecha de nacimiento"),
    genre: Yup.string().oneOf(["Hombre", "Mujer", "Otro"], "Seleccione una opción válida")
        .required("Seleccione un género"),
    typeDocument: Yup.string().oneOf(["DNI", "Pasaporte"], "Seleccione una opción válida")
        .required("Seleccione un tipo de documento"),
    documentNumber: Yup.string().matches(/^[0-9]+$/, "El documento solo debe contener números")
        .required("Complete este campo antes de continuar."),
    nativeCountry: Yup.string().oneOf(countries, "Seleccione un país válido").required("Complete este campo antes de continuar."),
    nativeProvince: Yup.string().oneOf(provinces, "Seleccione una provincia válida").required("Complete este campo antes de continuar."),
    actualDeparment: Yup.string().oneOf(departments, "Seleccione un departamento válido")
        .required("Complete este campo antes de continuar."),
    address: Yup.string().required("Complete este campo antes de continuar"),
    email: Yup.string().email("Ingrese un formato de correo válido").required("Complete este campo antes de continuar"),
    observations: Yup.string()
});