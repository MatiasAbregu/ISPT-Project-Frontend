import api from "../api";

class TeacherCoursesService {

    //GET
    getCourses(teacherId) {
        return api.get(`/teacher-courses/${teacherId}`);
    }

    getSchedules(divisionId) {
        return api.get(`/teacher-courses/schedules/${divisionId}`);
    }

    getAttendanceDays(divisionId) {
        return api.get(`/teacher-courses/attendance/${divisionId}`);
    }

    createAttendanceDay(divisionId, date) {
        return api.post(`/teacher-courses/attendance/${divisionId}/today`, null, { params: { date } });
    }

    getDailyAttendance(dayId) {
        return api.get(`/teacher-courses/attendance/day/${dayId}`);
    }

    updateDailyAttendance(dayId, attendances) {
        return api.put(`/teacher-courses/attendance/day/${dayId}`, attendances);
    }

    //POST


    //PUT

}

export default new TeacherCoursesService();
