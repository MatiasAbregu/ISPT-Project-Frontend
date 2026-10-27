import api from "../api";

class TeacherCoursesService {

    //GET
    getCourses(teacherId) {
        return api.get(`/teacher-courses/${teacherId}`);
    }

    getSchedules(divisionId) {
        return api.get(`/teacher-courses/schedules/${divisionId}`);
    }

    //POST


    //PUT

}

export default new TeacherCoursesService();