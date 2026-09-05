import api from "../api";

class SectionStudentsService{
    //GET
    async getByDivisionId(divisionId) {
        return api.get(`/file-divisions/${divisionId}`);
    }

    //POST
    async PostFileDivision(data) {
        return api.post(`/file-divisions`, data);
    }
    //PUT
    //DELETE
}

export default new SectionStudentsService();