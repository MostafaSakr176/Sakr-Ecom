import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';




const initialState = {
  isVerifyCodeSuccess: false,
  isVerifyCodeFaild: false,
  isVerifyCodeButtonLoading: false
}



export const userVerifyCode = createAsyncThunk('VerifyCode/userVerifyCode', async (code)=>{    
  // console.log(JSON.stringify(code));
  const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , code)
  // .catch(err => console.log(err))
  
  return data

})

export const VerifyCodeSlice = createSlice({
  name: 'VerifyCode',
  initialState,
  reducers: {
    setVerifyCodeSuccessFalse : (state , action)=>{
      state.isVerifyCodeSuccess = action.payload
    }
  },
  extraReducers: (builder)=>{

    builder.addCase( userVerifyCode.pending , (state , action)=>{
      state.isVerifyCodeButtonLoading = true;
    });

    builder.addCase( userVerifyCode.fulfilled , (state , action)=>{
      console.log(action.payload);
      state.isVerifyCodeSuccess = true;
      state.isVerifyCodeFaild = false;
      state.isVerifyCodeButtonLoading = false;
      toast.success("you verify code successfully" ,{
        pauseOnFocusLoss: false
      })
    });

    builder.addCase( userVerifyCode.rejected , (state , action)=>{
      console.log(action.error);
      state.isVerifyCodeButtonLoading = false;
      state.isVerifyCodeSuccess = false;
      state.isVerifyCodeFaild = true;
      toast.error("Reset code is invalid or has expired" ,{
        pauseOnFocusLoss: false
      })
    });


  }
})

// Action creators are generated for each case reducer function
export const {setVerifyCodeSuccessFalse} = VerifyCodeSlice.actions

export default VerifyCodeSlice.reducer