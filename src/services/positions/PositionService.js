import api from "../api";

class PositionService {

    // GET
    getAllPersonal() {
        return api.get("/positions");
    }

    getPositionById(id) {
        return api.get(`/positions/${id}`)
    }

    // POST
    createPosition(data) {
        return api.post("/positions", data);
    }

    addPersonInPosition(data) {
        return api.post("/positions/add-with-cuil", data);
    }

    // PUT
    updatePosition(data) {
        return api.put("/positions", data);
    }

    // DELETE
    deletePosition(id) {
        return api.delete(`/positions/${id}`);
    }
}

export default new PositionService();