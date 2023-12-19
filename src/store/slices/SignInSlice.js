import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";



const initialState = {
  token: localStorage.getItem("token"),
  isSignIn: false,
  isSignInSuccess: false,
  isSignInFaild: false,
  userInfo: '',
  isSignInButtonLoading: false
}



export const userSignIn = createAsyncThunk('SignIn/userSignIn', async (userInfo)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , userInfo)
  
  return data

})

export const SignInSlice = createSlice({
  name: 'SignIn',
  initialState,
  reducers: {
    logout: (state , action)=>{
      localStorage.removeItem('token');
      state.token = null;
      state.isSignInSuccess = false;
      state.userInfo = null
      toast.success("you logout successfuly" ,{
        pauseOnFocusLoss: false
      })
    },
    getTokenInfo: (state ,action)=>{
      if (state.token) {
        const decodedToken = jwtDecode(state.token);
        state.userInfo = decodedToken
      }
      
    }
  },
  extraReducers: (builder)=>{

    builder.addCase( userSignIn.pending , (state , action)=>{
      state.isSignInButtonLoading = true;
    });

    builder.addCase( userSignIn.fulfilled , (state , action)=>{
      // console.log(action.payload.user.name);
      state.userInfo = action.payload.user;
      localStorage.setItem('token' , action.payload.token)
      state.token = action.payload.token;
      state.isSignInSuccess = true;
      state.isSignInFaild = false;
      state.isSignIn = true;
      state.isSignInButtonLoading = false;
      toast.success("you sign in successfuly ^_^" ,{
        pauseOnFocusLoss: false
      })
    });

    builder.addCase( userSignIn.rejected , (state , action)=>{
      // state.user = action.payload
      console.log(action.error);
      state.isSignInButtonLoading = false;
      state.isSignInSuccess = false;
      state.isSignInFaild = true;
      toast.error("the email or password is wrong -_-" ,{
        pauseOnFocusLoss: false
      })
    });


  }
})

// Action creators are generated for each case reducer function
export const {logout , getTokenInfo} = SignInSlice.actions

export default SignInSlice.reducer