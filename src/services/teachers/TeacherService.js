import api from "../api";

class TeacherService {

    // GET
    getAllTeachers() {
        return api.get("/teachers");
    }

    getTeacherById(id) {
        return api.get(`/teachers/${id}`)
    }

    // POST
    createTeacher(data) {
        return api.post("/teachers", data);
    }

    addPersonInTeacher(data) {
        return api.post("/teachers/add-with-cuil", data);
    }

    // PUT
    updateTeacher(data) {
        return api.put("/teachers", data);
    }
}

export default new TeacherService();