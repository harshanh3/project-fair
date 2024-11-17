import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import { useContext, useEffect } from 'react'
import { tokenAuthContext } from './contexts/AuthContextAPI'
import Pnf from './pages/Pnf'


function App() {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route path='/dashboard' element={isAuthorised ? <Dashboard/>: <Navigate to={'/login'} />}/>
        <Route path='/projects' element={isAuthorised ? <Projects /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister={true} />} />
        <Route path='/*' element={<Pnf />} />

      </Routes>
      <Footer />

    </>
  )
}

export default App
