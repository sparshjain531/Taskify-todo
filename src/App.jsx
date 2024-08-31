import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, server } from "./main"

function App() {

  const {setUser,setIsAuthenticated,setLoading}=useContext(Context)

  useEffect(()=>{
    setLoading(true)
    axios.get(`${server}/users/me`,{
      withCredentials:true,
    }).then((res)=>{
      setUser(res.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    }).catch((error)=>{
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
    })
  },[])

  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<Home/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App
