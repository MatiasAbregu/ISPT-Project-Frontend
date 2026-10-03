import api from "../api";

class SchoolYearService{
    //GET
async getAll(){
    return api.get(`/schoolyears`);
}

async getRaw(){
    return api.get(`/schoolyears/raw`);
}

async getById(careerId){
    return api.get(`/schoolyears/${careerId}`);
}

    //POST
async create(data){
    return api.post(`/schoolyears`, data);
}
    //PUT
    //DELETE
}

export default new SchoolYearService();