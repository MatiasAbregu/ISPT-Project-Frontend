import api from "../api";

class DivisionTemplateService {
    //GET
    async getBySubject(subjectId) {
        return api.get(`division-templates/subject/${subjectId}`);
    }

    //POST
    async create(subjectId, userId) {
        return api.post(`division-templates/subject/${subjectId}/${userId}`);
    }

    //PUT
    async changeDivisionStatus(divisionTemplateId){
        return api.put(`division-templates/subject/${divisionTemplateId}`);
    }

    //DELETE
}

export default new DivisionTemplateService();