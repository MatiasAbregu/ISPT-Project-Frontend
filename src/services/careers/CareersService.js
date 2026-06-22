import axios from "axios";

const API_URL = "http://localhost:5293/api/careers";

class CareersService {
    //GET
    getAll() {
        return axios.get(`${API_URL}`);
    }

    getById(careerId) {
        return axios.get(`${API_URL}/${careerId}`);
    }

    //POST
    create(data) {
        return axios.post(`${API_URL}`, data);
    }
    //PUT
    update(careerId, data) {
        console.log(`${API_URL}/${careerId}`, data);
        return axios.put(`${API_URL}/${careerId}`, data);
    }
    //DELETE
}

export default new CareersService();