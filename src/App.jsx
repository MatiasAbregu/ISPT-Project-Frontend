import { useState } from 'react'
import './Global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path='/inicio' element={<Home />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
