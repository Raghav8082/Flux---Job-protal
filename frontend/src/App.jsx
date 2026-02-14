import React from 'react'
import './App.css'
import Navbar from './components/shared/navbar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LogIn from './components/auth/login.jsx'
import SignUp from './components/auth/signup.jsx'
import Home from './components/home.jsx'
import Jobs from "./components/jobs.jsx"
import Browse from "./components/Browse.jsx"
import Profile from "./components/profile.jsx"
import JobDescription from './components/JobDescription'
import AdminCompanies from "./components/admin/AdminCompanies.jsx"
import AdminJobs from "./components/admin/AdminJobs.jsx"
import CompanyCreate from "./components/admin/CompanyCreate.jsx"
import CompanySetup from './components/admin/CompanySetup'
import JobCreate from "./components/admin/JobCreate.jsx"
import Applicants from './components/admin/Applicants'
// import About from './components/about/about.jsx'

const appRouter= createBrowserRouter(
[
{path:'/',
element:<Home/>
},
{
  path:'/jobs',
  element:<Jobs/>
},
{
  path:'/login',
  element:<LogIn/>
},
{
  path:'/signup',
  element:<SignUp/>,
},
{
  path:'/browse',
  element: <Browse/>
},
{
  path:'/description/:id',
  element:<JobDescription/>
},
{
  path:'/profile',
  element:<Profile/>
},
{
  path:'/admin/companies',
  element:<AdminCompanies/>
},
{
  path:'/admin/jobs',
   element:<AdminJobs/>
},
{
  path:'/admin/companies/create',
  element:<CompanyCreate/>
},
{
  path:'/admin/companies/:id',
  element:<CompanySetup/>
},
{
  path:'/admin/jobs/create',
  element:<JobCreate/>
},
{
  path:"/admin/job/:id/applicants",
  element:<Applicants/>
}

])


function App() {
 


  return (
    <>
      
     <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
