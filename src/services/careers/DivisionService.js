import api from "../api";

class DivisionService {
    //GET
    async getBySchoolYearSubject(schoolYearId, subjectId) {
        return api.get(`divisions/school-year/${schoolYearId}/subject/${subjectId}`);
    }

    //POST

    //PUT

    //DELETE
}

export default new DivisionService();