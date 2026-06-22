import api from "../api";

class DegreeService {

    getDegreesByPersonId(personId){
        return api.get(`/degrees/${personId}`)
    }

    createDegree(data){
        return api.post(`/degrees`, data)
    }

    deleteDegree(id){
        return api.delete(`/degrees/${id}`);
    }
}

export default new DegreeService();