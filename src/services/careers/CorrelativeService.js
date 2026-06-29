import api from "../api";

class CorrelativeService{
    //GET

    //POST
async create(data){
    return api.post(`correlatives`, data);
}

async saveChanges(subjectId, changes){
    return api.post(`correlatives/${subjectId}/saveChanges`, changes);
}
    //PUT

    //DELETE
async delete(subjectId, correlativeId){
    return api.delete(`correlatives/${subjectId}/${correlativeId}`);
}
}

export default new CorrelativeService();