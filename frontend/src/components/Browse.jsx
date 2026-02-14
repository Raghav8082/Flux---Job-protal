import React from "react";
import Navbar from "./shared/navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "./hooks/useGetAllJobs.jsx";

const Browse = () =>{
    useGetAllJobs();
    const { alljobs } = useSelector((store) => store.job);

    return (
<div>
    <Navbar/>

    <div className="max-w-7xl mx-auto my-18">
        <h1 className="font-bold text-xl my-10">
            Search Result : ({alljobs?.length ?? 0})
        </h1>
        <div className="grid grid-cols-3 gap-4 ">
     {
    alljobs?.map((job) => <Job key={job._id} job={job} />)
        }
        </div>
   
    </div>
</div>
    )
}
export default Browse ; 
