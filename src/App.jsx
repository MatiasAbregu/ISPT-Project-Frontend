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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path='/inicio' element={<Home />} />
        <Route path='/estudiantes' element={<Students />} />
        <Route path='/cargos' element={<Positions />} />
        <Route path='/carreras' element={<Careers />} />
        <Route path='/carreras/curriculum' element={<Curriculum />} />
        <Route path='/carreras/curriculum/materias' element={<Subjects />} />
        <Route path='/carreras/curriculum/materias/correlativas' element={<Correlatives />} />
        <Route path='/docentes' element={<Teachers />} />
        <Route path='/cursos' element={<Courses />} />
        <Route path='/cursos/:id' element={<CourseDetail />} />
        <Route path='/cursos/:id/evaluaciones' element={<CourseEvaluations />} />
        <Route path='/cursos/:id/evaluaciones/:id' element={<CourseGrades />} />
        <Route path='/cursos/:id/asistencia' element={<CourseAttendance />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
