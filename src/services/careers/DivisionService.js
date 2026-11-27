import api from "../api";

class DivisionService {
    //GET
    async getBySchoolYearSubject(schoolYearId, subjectId) {
        return api.get(`divisions/school-year/${schoolYearId}/subject/${subjectId}`);
    }

    async unlock(divisionId) {
        return api.put(`divisions/${divisionId}/unlock`);
    }

    //POST

    //PUT

    //DELETE
}

export default new DivisionService();
