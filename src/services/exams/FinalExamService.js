import api from "../api";

class FinalExamService {
    //GET
    async getAll() {
        return api.get(`/final-exams`);
    }
    //POST
    async create(data) {
        return api.post(`/final-exams`, data);
    }
    //PUT

    //DELETE
}

export default new FinalExamService();