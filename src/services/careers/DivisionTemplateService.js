import axios from "axios";

const API_URL = "http://localhost:5293/api/division-templates";

class DivisionTemplateService {
    //GET
    async getBySubject(subjectId) {
        const response = await axios.get(`${API_URL}/subject/${subjectId}`);
        return response.data;
    }

    //POST
    async create(subjectId) {
        const response = await axios.post(`${API_URL}/subject/${subjectId}`);
        return response.data;
    }
    //PUT

    //DELETE
}

export default new DivisionTemplateService();