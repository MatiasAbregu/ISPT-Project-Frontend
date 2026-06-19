import axios from "axios";

const API_URL = "http://localhost:5293/api/curriculum";

class CurriculumService{
    //GET
async getByCareerId(careerId){
    const response = await axios.get(`${API_URL}/career/${careerId}`);
    return response.data;
}

async getById(curriculumId){
    const response = await axios.get(`${API_URL}/${curriculumId}`);
    return response.data;
}
    //POST
async create(data){
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
}
    //PUT
async update(curriculumId, data){
    console.log(`${API_URL}/${curriculumId}`, data);
    const response = await axios.put(`${API_URL}/${curriculumId}`, data);
    return response.data;
}
    //DELETE
}

export default new CurriculumService();