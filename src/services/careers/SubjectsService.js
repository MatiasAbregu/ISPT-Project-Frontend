import api from "../api";

class SubjectsService{
    //GET
async getByCurriculumId(curriculumId){
    return api.get(`/subjects/curriculum/${curriculumId}`);
}

async getBySchoolYear(schoolYearId){
    return api.get(`/subjects/schoolyear/${schoolYearId}`);
}

async getById(subjectId){
    return api.get(`/subjects/${subjectId}`);
}

async getPossibleCorrelatives(curriculumId, subjectId){
    return api.get(`/subjects/${curriculumId}/${subjectId}`);
}
    //POST
async create(data){
    return api.post(`/subjects`, data);
}
    //PUT
async update(subjectId, data){
    return api.put(`/subjects/${subjectId}`, data);
}
    //DELETE
}

export default new SubjectsService();