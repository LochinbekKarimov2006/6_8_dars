import './App.css'
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom'
import MainLeaut from './layout/MainLeaut'
import Hoome from './pages/Hoome'
import Login from './pages/Login'
import { useContext, useEffect, useState } from 'react'
import ProtectRouter from './components/ProtactRouter'
import Registir from './pages/Registir'
import { GlobalContext } from './context/GlobilContext'
function App() {
  let[user,setUser]=useState(false)
  const { state, setState } = useContext(GlobalContext);
useEffect(()=>{
  setUser(state)
},[state])
  console.log(user)
  let router=createBrowserRouter([
    {
      path:"/",
      element:
      <ProtectRouter user={user}>
        <MainLeaut/>
      </ProtectRouter>,
      children:[
        {
          path:"/",
          element:<Hoome/>
        },
      ]
    },
    {
      path:"/register",
      element: user? <Navigate to='/'/>:<Registir/>
    },
    {
      path:"/login",
      element: user? <Navigate to='/'/>:<Login user={setUser}/>
    },
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
