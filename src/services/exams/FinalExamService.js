import api from "../api";

class FinalExamService {

    //GET
    async getAll() {
        return api.get(`/final-exams`);
    }

    async getFinalExamById(id) {
        return api.get(`/final-exams/${id}`);
    }

    //POST
    async create(data) {
        return api.post(`/final-exams`, data);
    }

    //PUT
    async updateExam(data) {
        return api.put(`/final-exams`, data);
    }

    //DELETE
    async deleteExam(id) {
        return api.delete(`/final-exams/${id}`);
    }
}

export default new FinalExamService();