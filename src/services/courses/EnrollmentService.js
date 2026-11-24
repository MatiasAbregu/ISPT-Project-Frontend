import api from "../api";

class EnrollmentService {

    // GET
    getAllCareersForInscription() {
        return api.get(`/student-courses/get-careers`);
    }

    getAllSubjectsByCurriculumId(curriculumId, schoolYear) {
        return api.get(`/student-courses/${curriculumId}/get-subjects/${schoolYear}`);
    }

    // POST
    getSchedules(divisionsIds) {
        return api.post(`/student-courses/get-subjects/schedules`, divisionsIds);
    }

    submitInscription(divisionIds) {
        return api.post(`/student-courses/inscriptions`, { divisionIds });
    }
}

export default new EnrollmentService();
