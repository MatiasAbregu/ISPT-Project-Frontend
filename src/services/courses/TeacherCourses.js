import api from "../api";

class FinalExamService {

    //GET
    getCourses(teacherId) {
        return api.get(`/teacher-courses/${teacherId}`);
    }



    //POST


    //PUT

}

export default new FinalExamService();