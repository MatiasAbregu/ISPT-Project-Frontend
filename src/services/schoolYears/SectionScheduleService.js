import api from "../api";

class SectionScheduleService{
    //GET
    async getByDivisionId(divisionId) {
        return api.get(`/schedules/${divisionId}`);
    }

    //POST
    //PUT
    //DELETE
}

export default new SectionScheduleService();