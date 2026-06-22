import api from "../api";

class StudentService {

    // GET
    getAllStudents() {
        return api.get("/students");
    }

    getStudentById(id) {
        return api.get(`/students/${id}`)
    }

    // POST
    createStudent(data) {
        return api.post("/students", data);
    }

    // PUT
    updateStudent(data) {
        return api.put("/students", data);
    }

}

export default new StudentService();