import { COMPANY_API_ENDPOINT } from "../../../utils/content.js";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setAllCompanies } from "@/redux/companyslice.js";

const useGetAllCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllCompanies(res.data.companies));
        }
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) {
          dispatch(setAllCompanies([]));
          return;
        }
        console.error("Error fetching companies:", error);
      }
    };

    fetchAllCompanies();
  }, [dispatch]);
};

export default useGetAllCompany;
