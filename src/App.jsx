import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Home } from './components/Home'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { Quiz } from './components/Quiz'
import { PrivateRoute } from './components/PrivateRoute'
import { Result } from './components/Result'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login'element={<Login />}></Route>
        <Route path='/result' element={<PrivateRoute><Result /></PrivateRoute>}></Route>
        <Route path='/quiz' element={<PrivateRoute>
          <Quiz />
        </PrivateRoute>}></Route>
      </Routes>
    </>
  )
}

export default App
