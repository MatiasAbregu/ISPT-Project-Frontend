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

    // GRADES
    getGrades(evaluationId) {
        return api.get(`/teacher-courses/evaluations/${evaluationId}/grades`);
    }

    saveGrades(evaluationId, grades) {
        return api.put(`/teacher-courses/evaluations/${evaluationId}/grades`, grades);
    }
}

export default new EvaluationsCourse();
