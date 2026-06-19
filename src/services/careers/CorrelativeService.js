import axios from "axios";

const API_URL = "http://localhost:5293/api/correlatives";

class CorrelativeService{
    //GET

    //POST
async create(data){
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
}

async saveChanges(subjectId, changes){
    const response = await axios.post(`${API_URL}/${subjectId}/saveChanges`, changes);
    return response.data;
}
    //PUT

    //DELETE
async delete(subjectId, correlativeId){
    const response = await axios.delete(`${API_URL}/${subjectId}/${correlativeId}`);
    return response.data;
}
}

export default new CorrelativeService();