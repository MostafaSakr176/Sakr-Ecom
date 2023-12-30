import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';



const initialState = {
  // token: "",
  isSignUp: false,
  isSignUpSuccess: false,
  isSignUpFaild: false,
  // userInfo: "",
  isSignUpButtonLoading: false
}


export const userSignUp = createAsyncThunk('SignUp/userSignUp', async (userInfo)=>{  
  console.log(userInfo);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , userInfo)
  console.log(data);
  return data
  // .catch(err => err.response.data.message)

})

export const SignUpSlice = createSlice({
  name: 'SignUp',
  initialState,
  reducers: {
    setIsSignUpSuccessFalse : (state , acttion)=>{
      state.isSignUpSuccess = false
    }
  },
  extraReducers: (builder)=>{

    builder.addCase( userSignUp.pending , (state , action)=>{
      state.isSignUpButtonLoading = true;
    });

    builder.addCase( userSignUp.fulfilled , (state , action)=>{
      console.log(action.payload);
      // state.userInfo = action.payload.user.name;
      // state.token = action.payload.token;
      state.isSignUpSuccess = true;
      state.isSignUpFaild = false;
      state.isSignUp = true;
      state.isSignUpButtonLoading = false;
      toast.success("you sign up successfuly ^_^" ,{
        pauseOnFocusLoss: false
      })
      // console.log(state.isLogin , state.token , state.userInfo);
    });

    builder.addCase( userSignUp.rejected , (state , action)=>{
      // state.user = action.payload
      state.isSignUpButtonLoading = false;
      state.isSignUpSuccess = false;
      state.isSignUpFaild = true;
      toast.error("email already exist -_-" ,{
        pauseOnFocusLoss: false
      })
      console.log();
    });


  }
})

// Action creators are generated for each case reducer function
export const {setIsSignUpSuccessFalse} = SignUpSlice.actions

export default SignUpSlice.reducer