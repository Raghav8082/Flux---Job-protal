import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar.jsx";
import { Button } from "../ui/button.jsx";
import { ArrowLeft } from "lucide-react";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../../utils/content.js";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../hooks/useGetCompanyById.jsx";


 const CompanySetup =()=>{

    const [form, setForm]=useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file: null ,
    })
    const params = useParams();
    const navigate= useNavigate();
    const singleCompany = useSelector((store) => store.company.singleCompany);

    useGetCompanyById(params.id);

    const [loading,setLoading] = useState(false);

    const ChangeEventHandler =(e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const FileChangeEventHandler=(e)=>{

        setForm({...form, file: e.target.files[0]}) 
    }
    const SubmitEventHandler= async (e)=> {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("name", form.name);
        formdata.append("description", form.description);
        formdata.append("website", form.website);
        formdata.append("location", form.location);
       
       if(form.file){
          formdata.append("file", form.file);
       }
      try{
        setLoading(true);
        const res = await axios.post(
          `${COMPANY_API_ENDPOINT}/update/${params.id}`,
          formdata,
          { withCredentials: true }
        );

          if(res.data.success){
            toast.success(res.data.message)
            navigate("/admin/companies")

          }
      }
      catch(error){
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update company";
        toast.error(message);
      }
      finally{
        setLoading(false)
      }
        
    }
    useEffect(()=>{
        setForm({
            name: singleCompany?.name ||"",
            description: singleCompany?.description ||"",
            website: singleCompany?.website ||"",
            location: singleCompany?.location ||"",
            file:null
        })

    }, [singleCompany])



    return (
        <div>
          <Navbar/>
          <div className="max-w-4xl mx-auto my-19">
        <form action="" onSubmit={SubmitEventHandler}>
            <div className="flex items-center gap-4 mb-6"   >
            <Button type="button" variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold " onClick={()=>navigate("/admin/companies")}> 
                <ArrowLeft/>
                <span>Back</span>
                
            </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Label>Company Name </Label>
                    <Input type="text" placeholder="Company Name" className="w-full mt-4" name="name" value={form.name} onChange={ChangeEventHandler}/>
                    
                    <Label>Description</Label>
                    <Input type="text" placeholder="Description" className="w-full mt-4" name="description" value={form.description} onChange={ChangeEventHandler}/>
                    
                    <Label>Website URL</Label>  
                    <Input type="text" placeholder="Website URL" className="w-full mt-4" name="website" value={form.website} onChange={ChangeEventHandler}/>
                    
                    <Label>Location</Label>
                    <Input type="text" placeholder="Location" className="w-full mt-4" name="location" value={form.location} onChange={ChangeEventHandler}/>

                     <Label>Logo</Label>
                    <Input type="file" className="w-full mt-4" name="file" onChange={FileChangeEventHandler}/>
                    

                </div>
                <Button disabled={loading}>{loading ? "Updating..." : "Update"}</Button>
        </form>
          
        </div>
   </div> )
 }

 export default CompanySetup;
