import api from "../api";

class TeacherAssignationService {

    // GET
    getAllTeachersByDivisionId(id) {
        return api.get(`/teachers-division/division/${id}`);
    }

    getTeacherDivisionById(id) {
        return api.get(`/teachers-division/${id}`);
    }

    getObservationByTeacherDivisionId(id) {
        return api.get(`/teachers-division/observation/${id}`);
    }

    // POST
    assignTeacher(data) {
        return api.post("/teachers-division", data);
    }

    // PUT
    updateAssignation(data) {
        return api.put("/teachers-division", data);
    }

    updateObservation(data) {
        return api.put(`/teachers-division/observation`, data);
    }
}

export default new TeacherAssignationService();