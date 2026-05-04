import { useState } from 'react'
import './Global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Students } from './pages/students/Students'
import { Careers } from './pages/careers/Careers'
import { Teachers } from './pages/teachers/Teachers'
import { Curriculum } from './pages/careers/Curriculum'
import { Subjects } from './pages/careers/Subjects'
import { Correlatives } from './pages/careers/Correlatives'
import { Courses } from './pages/courses/Courses'
import { CourseDetail } from './pages/courses/CourseDetail'
import { CourseGrades } from './pages/courses/CourseGrades'
import { CourseEvaluations } from './pages/courses/CourseEvaluations'
import { CourseAttendance } from './pages/courses/CourseAttendance'
import { DailyAttendance } from './pages/courses/DailyAttendance'
import { Positions } from './pages/positions/Positions'
import { ExamDates } from './pages/exams/ExamDates'
import { ExamGrades } from './pages/exams/ExamGrades'
import { Enrollments } from './pages/enrollments/Enrollments'
import { StudentSubjects } from './pages/studentSubjects/StudentSubjects'
import { StudentEvaluations } from './pages/studentSubjects/StudentEvaluations'
import { AcademicYear } from './pages/careers/AcademicYear'
import { Assignations } from './pages/teachers/Assignations'
import { EnrollmentSubjects } from './pages/enrollments/EnrollmentSubjects'
import { ExamRegistrations } from './pages/studentExams/ExamRegistrations'
import { StudentExamDate } from './pages/studentExams/StudentExamDate'
import { StudentsInDanger } from './pages/students-in-danger/StudentsInDanger'
import { Attendance } from './pages/attendance/Attendance'
import { SchoolYear } from './pages/schoolYear/SchoolYear'
import { SchoolYearSections } from './pages/schoolYear/SchoolYearSections'
import { SectionStudents } from './pages/schoolYear/SectionStudents'
import { Commissions } from './pages/careers/Commissions'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path='/inicio' element={<Home />} />

        <Route path='/estudiantes' element={<Students />} />
        <Route path='/inscripciones-carreras' element={<Enrollments />} />
        <Route path='/inscripciones-carreras/:id/materias' element={<EnrollmentSubjects />} />
        <Route path='/mis-materias' element={<StudentSubjects />} />
        <Route path='/mis-materias/:id/evaluaciones' element={<StudentEvaluations />} />

        <Route path='/inscripciones-examenes' element={<ExamRegistrations />} />
        <Route path='/inscripciones-examenes/:id/fechas' element={<StudentExamDate />} />

        <Route path='/cargos' element={<Positions />} />

        <Route path='/ciclos-lectivos' element={<SchoolYear />} />
        <Route path='/ciclos-lectivos/:id/comisiones' element={<SchoolYearSections />} />
        <Route path='/ciclos-lectivos/:id/comisiones/:idSection/estudiantes' element={<SectionStudents />} />

        <Route path='/alumnos-riesgo' element={<StudentsInDanger />} />

        <Route path='/carreras' element={<Careers />} />
        <Route path='/carreras/plan-de-estudio' element={<Curriculum />} />
        <Route path='/carreras/plan-de-estudio/ciclo-academico' element={<AcademicYear />} />
        <Route path='/carreras/plan-de-estudio/ciclo-academico/:id/espacios-curriculares' element={<Subjects />} />
        <Route path='/carreras/plan-de-estudio/ciclo-academico/:idCA/espacios-curriculares/:id/divisiones'
          element={<Commissions />} />
        <Route path='/carreras/plan-de-estudio/ciclo-academico/:idCA/espacios-curriculares/:id/divisiones/:commission/asignaciones' element={<Assignations />} />
        <Route path='/carreras/plan-de-estudio/ciclo-academico/:idCA/espacios-curriculares/:id/correlativas' element={<Correlatives />} />

        <Route path='/docentes' element={<Teachers />} />
        <Route path='/cursos' element={<Courses />} />
        <Route path='/cursos/:id/alumnos' element={<CourseDetail />} />
        <Route path='/cursos/:id/evaluaciones' element={<CourseEvaluations />} />
        <Route path='/cursos/:id/evaluaciones/:id/notas' element={<CourseGrades />} />
        <Route path='/cursos/:id/asistencia' element={<CourseAttendance />} />
        <Route path='/cursos/:cursoId/asistencia/:fecha' element={<DailyAttendance />} />

        <Route path='/mesas-examen' element={<ExamDates />} />
        <Route path='/mesas-examen/:id/notas' element={<ExamGrades />} />

        <Route path='/asistencias-cursos' element={<Attendance />} />
        <Route path='/asistencias-cursos/:id/asistencia' element={<CourseAttendance />} />
        <Route path='/asistencias-cursos/:id/asistencia/:fecha' element={<DailyAttendance />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
