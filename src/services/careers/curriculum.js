import axios from "axios";

const API_URL = "http://localhost:5293/api/curriculum";

class CurriculumService{
    //GET
getByCareerId(careerId){
    return axios.get(`${API_URL}/career/${careerId}`);
}

getById(curriculumId){
    return axios.get(`${API_URL}/${curriculumId}`);
}
    //POST
create(data){
    return axios.post(`${API_URL}`, data);
}
    //PUT
update(curriculumId, data){
    console.log(`${API_URL}/${curriculumId}`, data);
    return axios.put(`${API_URL}/${curriculumId}`, data);
}
    //DELETE
}

export default new CurriculumService();