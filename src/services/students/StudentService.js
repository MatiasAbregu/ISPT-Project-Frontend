import api from "../api";

class StudentService {

    // GET
    getAllStudents() {
        return api.get("/students");
    }

    getStudentById(id) {
        return api.get(`/students/${id}`)
    }

    getStudentsBySchoolYearId(schoolYearId) {
        return api.get(`/students/school-year/${schoolYearId}`)
    }

    // POST
    createStudent(data) {
        return api.post("/students", data);
    }

    addPersonInStudent(data) {
        return api.post("/students/add-with-cuil", data);
    }

    importExcel(formData) {
        return api.post("/students/import-excel", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
    }
    // PUT
    updateStudent(data) {
        return api.put("/students", data);
    }

}

export default new StudentService();