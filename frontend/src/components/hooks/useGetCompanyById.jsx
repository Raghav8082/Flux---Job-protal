import { COMPANY_API_ENDPOINT } from "../../../utils/content.js";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice.js";

const useGetCompanyById = (companyid) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyid) return;

    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyid}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) {
          dispatch(setSingleCompany(null));
          return;
        }
        console.error("Error fetching company:", error);
      }
    };

    fetchCompany();
  }, [companyid, dispatch]);
};

export default useGetCompanyById;
