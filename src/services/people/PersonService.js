import api from "../api";

class PersonService {

    // GET
    getContactByPersonId(id) {
        return api.get(`/students/contact/${id}`);
    }

    getObservationByPersonId(id) {
        return api.get(`/students/observation/${id}`);
    }

    // PUT
    updateContact(data) {
        return api.put(`/students/contact`, data);
    }

    updateObservation(data) {
        return api.put(`/students/observation`, data);
    }
}

export default new PersonService();