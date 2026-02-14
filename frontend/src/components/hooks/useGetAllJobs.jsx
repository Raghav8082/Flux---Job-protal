
import { Job_API_ENDPOINT } from "../../../utils/content.js";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../../redux/jobslice.js";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${Job_API_ENDPOINT}/get`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401 || status === 404) {
          dispatch(setAllJobs([]));
          return;
        }
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
