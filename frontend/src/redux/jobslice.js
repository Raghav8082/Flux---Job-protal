import { createSlice } from "@reduxjs/toolkit";

const jobslice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    singleJob: null,
    loading: false,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSingleJob:(state,action)=>{
      state.singleJob = action.payload;
    },
    setAllAdminJobs:(state,action)=>{
      state.allAdminJobs = action.payload;
    }
  },
});

export const { setAllJobs, setLoading ,setSingleJob,setAllAdminJobs} = jobslice.actions;
export default jobslice.reducer;
