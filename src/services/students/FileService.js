import api from "../api";

class FileService {

    // GET
    getFilesByStudentId(studentId) {
        return api.get(`/files/${studentId}`);
    }

    getFileById(id) {
        return api.get(`/files/file/${id}`)
    }

    // POST
    createFile(data) {
        return api.post("/files", data);
    }

    // PUT
    updateFile(data) {
        return api.put("/files", data);
    }

}

export default new FileService();