import React, { useEffect } from "react";
import Navbar from "./shared/navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCrousel";
import LatestJobs from "./LatestJobs"
import Footer from "./shared/footer";
import useGetAllJobs from "./hooks/useGetAllJobs.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Home =()=>{

    const { user } = useSelector((store) => store.auth);
    const navigate= useNavigate();
   useEffect(()=>{
    if (user?.role === "recruiter") {
        navigate("/admin/companies", { replace: true });
    }
}, [user, navigate])
   
    useGetAllJobs();
    return(
        <div>
            <Navbar/>
            <HeroSection />
           <CategoryCarousel/>
            <LatestJobs/>
             <Footer/>

        </div>
    )
}

export default Home;
