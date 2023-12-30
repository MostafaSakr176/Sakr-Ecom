// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Home from './pages/home/Home';
import About from './pages/about/About';
import Products from './pages/products/Products';
import ContactUs from './pages/contact/ContactUs';
import Profile from './pages/profile/Profile';
import Cart from './pages/cart/Cart';
import WishList from './pages/wishList/WishList';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import ProductDetails from './pages/productDetails/ProductDetails';
import ProtectedRoutsMiddleWare from './store/middlewares/ProtectedRoutsMiddleWare';
import CatigoryProducts from './pages/CatigoryProducts/CatigoryProducts';
import { ToastContainer } from 'react-toastify';
import ForgetPass from './pages/forgetPassword/ForgetPass';
import VerifyResetCode from './pages/verifyResetCod/VerifyResetCode';
import ResetPassword from './pages/resetPassword/ResetPassword';
import AddUserAddress from './pages/add-address/AddUserAddress';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts } from './store/slices/CartSlice';
import { getWishListProducts } from './store/slices/WishListSlice';
import { getTokenInfo } from './store/slices/SignInSlice';
import Root from './pages/Root';
import NotFound from './pages/NotFound';

function App() {




const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getCartProducts())
    dispatch(getWishListProducts())
    dispatch(getTokenInfo())
  },[])




  return (
    <div className="App">
      {/* <Navbar /> */}
      <ToastContainer />
      <Routes>
      <Route path='/' element={<Root />} >
          <Route index element={<Home/>}/>
          <Route path='/about' element={<ProtectedRoutsMiddleWare><About/></ProtectedRoutsMiddleWare>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/contactUs' element={<ContactUs/>}/>
          <Route path='/profile' element={<ProtectedRoutsMiddleWare><Profile/></ProtectedRoutsMiddleWare>}/>
          <Route path='/cart' element={<ProtectedRoutsMiddleWare><Cart/></ProtectedRoutsMiddleWare>}/>
          <Route path='/wishlist' element={<ProtectedRoutsMiddleWare><WishList/></ProtectedRoutsMiddleWare>}/>
          
          <Route path='/productDetails/:productID' element={<ProductDetails/>}/>
          <Route path='/catigoryProducts/:categoryID' element={<CatigoryProducts/>}/>
          <Route path='/add-address' element={<ProtectedRoutsMiddleWare><AddUserAddress/></ProtectedRoutsMiddleWare>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/forget-pass' element={<ForgetPass/>}/>
          <Route path='/verify-code' element={<VerifyResetCode/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
        
          
      
    </div>
  );
}

export default App;
