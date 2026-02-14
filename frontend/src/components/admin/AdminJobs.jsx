import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar.jsx";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setsearchCompanyByText } from "@/redux/companyslice.js";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import AdminJobsTable from "./AdminJobsTable.jsx";


const AdminJobs = () => {
  useGetAllAdminJobs()

  const [input,setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setsearchCompanyByText(input))
  }, [input, dispatch])

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between my-5">
          <Input
          className="w-fit"
          placeholder="filter by role "
          onChange={(e)=>setInput(e.target.value)}
          />
  <Button onClick={()=>navigate("/admin/jobs/create")}>
    Create Job
  </Button>
        </div>
        <AdminJobsTable />
      </div>
    </>
  );
};

export default AdminJobs;
