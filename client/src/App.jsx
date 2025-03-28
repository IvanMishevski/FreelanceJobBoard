import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import Home from './components/home/Home'
import CreateJob from './components/Jobs/createJob/CreateJob'
import Register from './components/register/Register'
import Login from './components/login/Login'
import JobCatalog from './components/Jobs/jobCatalog/JobCatalog'

function App() {
  const [authData, setAuthData] = useState({});
  const userLoginHandler = (resultData) => {
    setAuthData(resultData)
  }
  return (
    <>
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/create" element={<CreateJob />} />
            <Route path="/login" element={<Login onLogin={userLoginHandler} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobCatalog />} />

          </Routes>
        </main>
      </div>


    </>
  )
}

export default App
