import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todos from './Component/ToDos'
import 'bootstrap/dist/css/bootstrap.min.css';
import News from './Component/News'
import NavBar from './Component/NavBar'
function App() {
  

  return (
    <>
      {/* <Todos/> */}
      <NavBar/>
      <News/>
    </>
  )
}

export default App
