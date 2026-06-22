import axios from "axios";

const API_URL = "http://localhost:5293/api/schoolyears";

class CareersService{
    //GET
async getAll(){
    const response = await axios.get(`${API_URL}`);
    return response.data;
}

async getRaw(){
    const response = await axios.get(`${API_URL}/raw`);
    return response.data;
}

async getById(careerId){
    const response = await axios.get(`${API_URL}/${careerId}`);
    return response.data;
}

    //POST
async create(data){
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
}
    //PUT
    //DELETE
}

export default new CareersService();