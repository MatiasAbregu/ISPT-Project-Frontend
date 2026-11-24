import api from '../api';

class InscriptionRequestsService {
    getBySchoolYear(schoolYearId) {
        return api.get(`/file-divisions/school-year/${schoolYearId}/inscription-requests`);
    }

    review(schoolYearId, decisions) {
        return api.put(`/file-divisions/school-year/${schoolYearId}/inscription-requests`, { decisions });
    }
}

export default new InscriptionRequestsService();
