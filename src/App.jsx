import { useState } from 'react'
import './Global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Students } from './pages/Students'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path='/inicio' element={<Home />} />

        <Route path='/estudiantes' element={<Students />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
