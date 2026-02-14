
import { Job_API_ENDPOINT } from "../../../utils/content.js";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../../redux/jobslice.js";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(
          `${Job_API_ENDPOINT}/getadminjobs`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) {
          dispatch(setAllJobs([]));
          return;
        }
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;