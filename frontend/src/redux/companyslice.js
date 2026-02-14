import { createSlice } from "@reduxjs/toolkit";

const companyslice = createSlice({
    name:"company",
    initialState:{  
        singleCompany:null,
        companies:[],
        searchCompanyByText:""
    },
        reducers:{
            setSingleCompany:(state,action)=>{
                state.singleCompany = action.payload;
            },
            setAllCompanies:(state,action)=>{
                state.companies = action.payload;
            },
            setsearchCompanyByText:(state,action)=>{
                state.searchCompanyByText = action.payload;
        },
}})

export const {setSingleCompany, setAllCompanies, setsearchCompanyByText} = companyslice.actions;
export default companyslice.reducer;
