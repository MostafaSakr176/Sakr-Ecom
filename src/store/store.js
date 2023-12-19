import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './slices/CartSlice'
import SignUpReducer from './slices/SignUpSlice'
import SignInReducer from './slices/SignInSlice'
import WishListReducer from './slices/WishListSlice'
import SendCodeReducer from './slices/ForgetPassSlice'
import VerifyCodeReducer from './slices/VerifyCodeSlice'
import ResetPasswordReducer from './slices/ResetPasswordSlice'
import UserAddressReducer from './slices/UserAdressSlice'



export const store = configureStore({
  reducer: {
    Cart : CartReducer ,
    WishList : WishListReducer ,
    SignUp : SignUpReducer,
    SignIn : SignInReducer,
    SendCode : SendCodeReducer,
    VerifyCode : VerifyCodeReducer,
    ResetPassword : ResetPasswordReducer,
    UserAddress : UserAddressReducer
  },

})
