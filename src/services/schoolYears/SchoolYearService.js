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

async getCurriculumsBySchoolYearId(schoolYearId) {
    return api.get(`/schoolyears/${schoolYearId}/curriculums`);
}

    //POST
async create(data){
    return api.post(`/schoolyears`, data);
}

async createByGrade(data){
    return api.post(`/schoolyears/by-grade`, data);
}
    //PUT
    //DELETE
}

export default new SchoolYearService();