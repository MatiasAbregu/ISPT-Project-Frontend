import api from "../api";


class CurriculumService{
    //GET
async getByCareerId(careerId){
    return api.get(`/curriculum/career/${careerId}`);
}

async getById(curriculumId){
    return api.get(`/curriculum/${curriculumId}`);
}
    //POST
async create(data){
    return api.post(`/curriculum`, data);
}
    //PUT
async update(curriculumId, data){
    return api.put(`/curriculum/${curriculumId}`, data);
}
    //DELETE
}

export default new CurriculumService();