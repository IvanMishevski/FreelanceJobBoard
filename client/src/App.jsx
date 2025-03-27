import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'

function App() {

  return (
    <>
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </main>
        <Footer/>
      </div>


    </>
  )
}

export default App
