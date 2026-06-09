import axios from 'axios';

const API_URL = "http://localhost:5293/api-v1/auth";

class AuthService {

    login(data){
        return axios.post(`${API_URL}/login`, data);
    }

    refresh(data) {
        return axios.post(`${API_URL}/refresh`, data);
    }
}

export default new AuthService();