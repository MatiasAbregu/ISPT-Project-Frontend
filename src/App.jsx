import { useState } from 'react'
import './Global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Students } from './pages/Students'
import { Careers } from './pages/Careers'
import { Teachers } from './pages/Teachers'
import { Curriculum } from './pages/Curriculum'
import { Subjects } from './pages/Subjects'
import { Correlatives } from './pages/Correlatives'
import { Courses } from './pages/Courses'
import { CourseDetail } from './pages/CourseDetail'
import { CourseGrades } from './pages/CourseGrades'
import { CourseEvaluations } from './pages/CourseEvaluations'
import { CourseAttendance } from './pages/CourseAttendance'
import { Positions } from './pages/Positions'
import { ExamDates } from './pages/ExamDates'
import { ExamGrades } from './pages/ExamGrades'
import { Enrollments } from './pages/Enrollments'
import { StudentSubjects } from './pages/StudentSubjects'
import { StudentEvaluations } from './pages/StudentEvaluations'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path='/inicio' element={<Home />} />
        <Route path='/estudiantes' element={<Students />} />
        <Route path='/inscripciones' element={<Enrollments />} />
        <Route path='/mis-materias' element={<StudentSubjects />} />
        <Route path='/mis-materias/:id/evaluaciones' element={<StudentEvaluations />} />
        <Route path='/cargos' element={<Positions />} />
        <Route path='/carreras' element={<Careers />} />
        <Route path='/carreras/curriculum' element={<Curriculum />} />
        <Route path='/carreras/curriculum/materias' element={<Subjects />} />
        <Route path='/carreras/curriculum/materias/correlativas' element={<Correlatives />} />
        <Route path='/docentes' element={<Teachers />} />
        <Route path='/cursos' element={<Courses />} />
        <Route path='/cursos/:id/alumnos' element={<CourseDetail />} />
        <Route path='/cursos/:id/evaluaciones' element={<CourseEvaluations />} />
        <Route path='/cursos/:id/evaluaciones/:id/notas' element={<CourseGrades />} />
        <Route path='/cursos/:id/asistencia' element={<CourseAttendance />} />
        <Route path='/cursos/:id/mesas-examenes' element={<ExamDates />} />
        <Route path='/cursos/:id/mesas-examenes/:id/notas' element={<ExamGrades />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
