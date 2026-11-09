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
    async update(id, data) {
        return api.put(`schedule-templates/${id}`, data);
    }


    //DELETE
}

export default new ScheduleTemplateService();
