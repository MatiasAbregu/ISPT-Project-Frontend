import axios from "axios";

const API_URL = "http://localhost:5293/api/subjects";

class SubjectsService{
    //GET
async getByCurriculumId(curriculumId){
    const response = await axios.get(`${API_URL}/curriculum/${curriculumId}`);
    return response.data;
}

async getById(subjectId){
    const response = await axios.get(`${API_URL}/${subjectId}`);
    return response.data;
}

async getPossibleCorrelatives(curriculumId, subjectId){
    const response = await axios.get(`${API_URL}/${curriculumId}/${subjectId}`);
    return response.data;
}
    //POST
async create(data){
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
}
    //PUT
async update(subjectId, data){
    console.log(`${API_URL}/${subjectId}`, data);
    const response = await axios.put(`${API_URL}/${subjectId}`, data);
    return response.data;
}
    //DELETE
}

export default new SubjectsService();