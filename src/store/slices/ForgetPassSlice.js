import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';




const initialState = {
  isSendCodeSuccess: false,
  isSendCodeFaild: false,
  isSendCodeButtonLoading: false
}



export const userSendCode = createAsyncThunk('SendCode/userSendCode', async (email)=>{    

  console.log(email);
  const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , email)
  
  return data

})

export const SendCodeSlice = createSlice({
  name: 'SendCode',
  initialState,
  reducers: {
    setSendCodeSuccessFalse : (state , action)=>{
      state.isSendCodeSuccess = action.payload
    }
  },
  extraReducers: (builder)=>{

    builder.addCase( userSendCode.pending , (state , action)=>{
      state.isSendCodeButtonLoading = true;
    });

    builder.addCase( userSendCode.fulfilled , (state , action)=>{
      console.log(action.payload);
      state.isSendCodeSuccess = true;
      state.isSendCodeFaild = false;
      state.isSendCodeButtonLoading = false;
      toast.success(action.payload.message ,{
        pauseOnFocusLoss: false
      })
      
    });

    builder.addCase( userSendCode.rejected , (state , action)=>{
      console.log(action.error);
      state.isSendCodeButtonLoading = false;
      state.isSendCodeSuccess = false;
      state.isSendCodeFaild = true;
      if (action.error.message === "Request failed with status code 500") {
        toast.error("There was an error sending the email. Try again later!" ,{
          pauseOnFocusLoss: false
        })
      }else{
        toast.error("There is no user registered with this email -_-" ,{
        pauseOnFocusLoss: false
      })
      }
      
    });


  }
})

// Action creators are generated for each case reducer function
export const {setSendCodeSuccessFalse} = SendCodeSlice.actions

export default SendCodeSlice.reducer