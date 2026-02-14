import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar.jsx";
import CompaniesTable from "./CompaniesTable.jsx";
import { Button } from "../ui/button.jsx";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "../hooks/useGetallCompany.jsx";
import { useDispatch } from "react-redux";
import { setsearchCompanyByText } from "@/redux/companyslice.js";

const AdminCompanies = () => {
  const navigate = useNavigate();
  useGetAllCompany();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchCompanyByText(input));
  }, [input, dispatch]);
  return (
  
   <>
    <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
      
      <div className="flex items-center justify-between my-5"> 
        <input type="search"
        className="w-fit"
        placeholder="filter by name "
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/companies/create")}>New Company </Button>


      </div>
      <CompaniesTable/>
      </div>
    </>
  );
};

export default AdminCompanies;
