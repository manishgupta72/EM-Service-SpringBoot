import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Employee from './components/Employee'
import AddEmployee from './components/AddEmployee'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import UpdateEmployee from './components/UpdateEmployee'
import Profile from './components/Profile'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>

          
          <Route path='/' element={<Employee />} />
          <Route path='/addEmployee' element={<AddEmployee />} />
          <Route path='/addEmployee/:id' element={<UpdateEmployee />} />
          <Route path='/profile/:id' element={<Profile />} />

        </Routes>

      </BrowserRouter>



    </>
  )
}

export default App
