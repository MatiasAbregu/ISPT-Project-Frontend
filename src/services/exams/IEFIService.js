import api from "../api";

class IEFIService {
    async getAll() {
        return api.get(`/iefis`);
    }

    async getIEFIById(id) {
        return api.get(`/iefis/${id}`);
    }

    async create(data) {
        return api.post(`/iefis`, data);
    }

    async updateIEFI(data) {
        return api.put(`/iefis`, data);
    }

    async deleteIEFI(id) {
        return api.delete(`/iefis/${id}`);
    }

    async getDivisionStudents(divisionId) {
        return api.get(`/iefis/division/${divisionId}/students`);
    }

    async registerStudent(divisionId, fileDivisionId) {
        return api.post(`/iefis/division/${divisionId}/students/${fileDivisionId}`);
    }

    async saveGrade(divisionId, fileDivisionId, grade) {
        return api.put(`/iefis/division/${divisionId}/students/${fileDivisionId}/grade`, { grade });
    }
}

export default new IEFIService();
