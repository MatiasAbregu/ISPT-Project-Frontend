import axios from 'axios';
const API_URL_ENV = import.meta.env.VITE_API_URL_DEVELOPMENT;

const API_URL = `${API_URL_ENV}/auth`;

class AuthService {

    login(data){
        return axios.post(`${API_URL}/login`, data);
    }

    refresh(data) {
        return axios.post(`${API_URL}/refresh`, data);
    }
}

export default new AuthService();