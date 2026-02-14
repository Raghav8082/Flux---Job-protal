import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
name:"auth",
initialState:{
    loading:false, 
    user:null
},

reducers:{
    setLoading:(state,action)=>{
        state.loading= action.payload;
    },
    setUser:(state,action)=>{
      const nextUser = action.payload;
      if (!nextUser) {
        state.user = null;
        return;
      }

      state.user = {
        ...nextUser,
        role: String(nextUser.role ?? "").trim().toLowerCase(),
      };
    }
}
})

export const {setLoading,setUser} = authslice.actions;
export default  authslice.reducer;
