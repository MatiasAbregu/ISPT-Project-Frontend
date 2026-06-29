import api from "../api";

class CareersService {
    //GET
    async getAll() {
        return api.get(`/careers`);
    }

    async getById(careerId) {
        return api.get(`/careers/${careerId}`);
    }

    //POST
    async create(data) {
        return api.post(`/careers`, data);
    }
    //PUT
    async update(careerId, data) {
        return api.put(`/careers/${careerId}`, data);
    }
    //DELETE
}

export default new CareersService();