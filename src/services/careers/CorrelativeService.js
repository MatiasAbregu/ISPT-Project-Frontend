import api from "../api";

class CorrelativeService {
    //GET

    //POST
async saveChanges(subjectId, changes){
    return api.post(`correlatives/${subjectId}/saveChanges`, changes);
}
    //PUT

    //DELETE

}

export default new CorrelativeService();