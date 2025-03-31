import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import Home from './components/home/Home'
import CreateJob from './components/Jobs/createJob/CreateJob'
import Register from './components/register/Register'
import Login from './components/login/Login'
import JobCatalog from './components/Jobs/jobCatalog/JobCatalog'
import JobDetails from './components/Jobs/jobDetails/jobDetails'
import Logout from './components/logout/Logout'
import GuestGuard from './guards/GuestGuard'
import AuthGuard from './guards/AuthGuard'
import JobEdit from './components/Jobs/jobEdit/JobEdit'
import UserProvider from './providers/UserProvider.jsx'

function App() {
  return (
    <UserProvider>
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/jobs/:jobId/details" element={<JobDetails />} />
            <Route path="/jobs" element={<JobCatalog />} />

            <Route element={<AuthGuard />}>
              <Route path="/create" element={<CreateJob />} />
              <Route path="/jobs/:jobId/edit" element={<JobEdit />} />
              <Route path="/logout" element={<Logout />} />
            </Route>


            <Route element={<GuestGuard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>


          </Routes>
        </main>
      </div>


    </UserProvider>
  )
}

export default App
