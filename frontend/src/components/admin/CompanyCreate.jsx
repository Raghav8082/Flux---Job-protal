import React, { useState } from "react";
import Navbar from "../shared/navbar.jsx";
import { Button } from "../ui/button.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../../utils/content.js";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companyslice.js";

const CompanyCreate = ()=>{
    const navigate = useNavigate()
    const [CompanyName , setCompanyName] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();
    const registerNewCompany = async ()=>{
        try{
            const name = CompanyName.trim();
            if (!name) {
                toast.error("Company name is required");
                return;
            }

            setLoading(true);
            const res = await axios.post(
              `${COMPANY_API_ENDPOINT}/register`,
              { name },
              {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
              }
            );

if(res.data.success){
    dispatch(setSingleCompany(res.data.company));
    toast.success(res.data.message)
    const companyId = res.data?.company?._id || res.data?.company?.id;
    if (!companyId) {
      toast.error("Company created but ID was missing in response");
      return;
    }
    navigate(`/admin/companies/${companyId}`);
}
else{
    toast.error(res.data?.message || "Failed to create company");
}
        }
        catch(error){
            console.log("Error creating company:", {
              message: error?.message,
              status: error?.response?.status,
              data: error?.response?.data,
            });
            if (error?.response?.status === 401) {
              toast.error("Please login to create a company");
              navigate("/login");
              return;
            }
            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Failed to create company";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return(
<div>
   <Navbar/>
    <div className="max-w-7xl mx-auto px-6 py-10">  
    <h2 className="text-2xl font-semibold mb-6">Your Company Name </h2>
        <p className="text-gray-500">What would like to give ypur company name ? you can change this later. </p>
    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
    <input type="text" 
    id="companyName" 
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
    placeholder="Enter company name" 
    value={CompanyName} onChange={(e)=>setCompanyName(e.target.value)}/>
     

     <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline" onClick={()=>navigate('/admin/companies')}> cancel </Button>
        <Button disabled={loading || !CompanyName.trim()} onClick={registerNewCompany}>
          {loading ? "Saving..." : "Save"}
        </Button>
     </div>
    </div>
</div>
    )
}

export default CompanyCreate;
