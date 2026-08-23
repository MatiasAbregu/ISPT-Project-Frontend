import api from "../api";

class ScheduleTemplateService {
    //GET
    async getByDivisionTemplate(divisionTemplateId) {
        return api.get(`schedule-templates/${divisionTemplateId}`);
    }

    async getById(id) {
        return api.get(`schedule-templates/getById/${id}`);
    }
    //POST
    async create(divisionTemplateId, data) {
        return api.post(`schedule-templates/${divisionTemplateId}`, data);
    }
    //PUT


    //DELETE
}

export default new ScheduleTemplateService();