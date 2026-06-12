import * as Yup from 'yup';

const countries = ["Argentina", "Chile", "Perú", "Bolivia", "Paraguay", "Uruguay", "Brasil", "Ecuador", "Colombia", "Venezuela"];
const provinces = ["Córdoba", "Buenos Aires", "Mendoza", "Santiago", "Valparaíso", "Concepción", "Lima", "Arequipa", "Cusco", "Andrés Ibáñez", "Murillo", "Cercado", "Asunción", "Ciudad del Este", "Encarnación", "Montevideo", "Canelones", "Maldonado", "São Paulo", "Río de Janeiro", "Minas Gerais", "Quito", "Guayas", "Manabí", "Medellín", "Cali", "Bogota", "Caracas", "Maracaibo", "Cumaná"];
const departments = ["Calamuchita", "Capital", "Colón", "Cruz del Eje", "General Roca", "General San Martín", "Ischilín", "Juárez Celman", "Marcos Juárez", "Minas", "Pocho", "Presidente Roque Sáenz Peña", "Punilla", "Río Cuarto", "Río Primero", "Río Seco", "Río Segundo", "San Alberto", "San Javier", "San Justo", "Santa María", "Sobremonte", "Tercero Arriba", "Totoral", "Tulumba", "Unión"
];

export default Yup.object().shape({
    country: Yup.string().oneOf(countries, "Seleccione un país válido").required("Complete este campo antes de continuar."),
    province: Yup.string().oneOf(provinces, "Seleccione una provincia válida").required("Complete este campo antes de continuar."),
    department: Yup.string().oneOf(departments, "Seleccione un departamento válido")
        .required("Complete este campo antes de continuar."),
    address: Yup.string().required("Complete este campo antes de continuar"),
})