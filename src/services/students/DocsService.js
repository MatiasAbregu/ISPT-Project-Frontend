import api from "../api";

class DocsService {

    // GET
    getAllDocumentsByFileId(fileId) {
        return api.get(`/file-documentation/${fileId}`);
    }

    reloadDocumentsDeliverableByYear(fileId) {
        return api.get(`/file-documentation/${fileId}/reload`)
    }

    // PUT
    changeDocumentsStatus(data) {
        return api.put("/file-documentation", data);
    }

    // POST
    addYearInDeliverableDocumentsPerYear(data) {
        return api.post("/file-documentation/row", data);
    }

    // DELETE
    deleteYearInDeliverableDocumentsPerYear(id) {
        return api.delete(`/file-documentation/row/${id}`);
    }

}

export default new DocsService();