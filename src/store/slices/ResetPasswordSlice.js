import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';




const initialState = {
  token: localStorage.getItem("token"),
  isResetPassword: false,
  isResetPasswordSuccess: false,
  isResetPasswordFaild: false,
  userInfo: '',
  isResetPasswordButtonLoading: false
}



export const userResetPassword = createAsyncThunk('ResetPassword/userResetPassword', async (userInfo)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , userInfo)
  .catch(err => console.log(err))
  console.log(data);
  return data

})

export const ResetPasswordSlice = createSlice({
  name: 'ResetPassword',
  initialState,
  reducers: {
    setResetPasswordSuccessFalse: (state , action)=>{
      state.isResetPasswordSuccess = action.payload
    }
  },
  extraReducers: (builder)=>{

    builder.addCase( userResetPassword.pending , (state , action)=>{
      state.isResetPasswordButtonLoading = true;
    });

    builder.addCase( userResetPassword.fulfilled , (state , action)=>{
      console.log(action.payload);
      state.userInfo = action.payload.user;
      localStorage.setItem('token' , action.payload.token)
      state.token = action.payload.token;
      state.isResetPasswordSuccess = true;
      state.isResetPasswordFaild = false;
      state.isResetPassword = true;
      state.isResetPasswordButtonLoading = false;
      toast.success("you reset password successfuly ^_^" ,{
        pauseOnFocusLoss: false
      })
    });

    builder.addCase( userResetPassword.rejected , (state , action)=>{
      // state.user = action.payload
      console.log(action.error);
      state.isResetPasswordButtonLoading = false;
      state.isResetPasswordSuccess = false;
      state.isResetPasswordFaild = true;
      toast.error("reset code not verified" ,{
        pauseOnFocusLoss: false
      })
    });


  }
})

// Action creators are generated for each case reducer function
export const {setResetPasswordSuccessFalse} = ResetPasswordSlice.actions

export default ResetPasswordSlice.reducer