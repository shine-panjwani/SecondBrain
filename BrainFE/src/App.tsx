import './App.css'
import DashBoard from './pages/Dashboard'
import HomePage from './pages/Home'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import {  Routes,Route } from 'react-router-dom'

function App() { 
  return (
    <>
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
    </>)

}
export default App

