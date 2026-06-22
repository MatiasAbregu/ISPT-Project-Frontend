import axios from "axios";

const API_URL = "http://localhost:5293/api/subjects";

class SubjectsService{
    //GET
getByCurriculumId(curriculumId){
    return axios.get(`${API_URL}/curriculum/${curriculumId}`);
}

getById(subjectId){
    return axios.get(`${API_URL}/${subjectId}`);
}

getPossibleCorrelatives(curriculumId, subjectId){
    return axios.get(`${API_URL}/${curriculumId}/${subjectId}`)
}
    //POST
create(data){
    return axios.post(`${API_URL}`, data);
}
    //PUT
update(subjectId, data){
    console.log(`${API_URL}/${subjectId}`, data);
    return axios.put(`${API_URL}/${subjectId}`, data);
}
    //DELETE
}

export default new SubjectsService();