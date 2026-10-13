import api from "../api";

class EvaluationsCourse {

    //GET
    getAllEvaluations(divisionId) {
        return api.get(`/teacher-courses/evaluations/${divisionId}`);
    }

    //POST
    createEvaluation(data) {
        return api.post(`/teacher-courses/evaluations`, data);
    }

    //DELETE
    deleteEvaluation(evaluationId) {
        return api.delete(`/teacher-courses/evaluations/${evaluationId}`);
    }
}

export default new EvaluationsCourse();
