import "./signIn.css";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../../store/slices/SignInSlice";
import { Link, useNavigate } from "react-router-dom";
import { getCartProducts } from "../../store/slices/CartSlice";
import { getWishListProducts } from "../../store/slices/WishListSlice";
import { Box, Button, CircularProgress, TextField } from "@mui/material";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isSignInButtonLoading = useSelector(
    (state) => state.SignIn.isSignInButtonLoading
  );
  const isSignInSuccess = useSelector((state) => state.SignIn.isSignInSuccess);

  const user = {
    email: "",
    password: "",
  };

  const sendData = (values) => {
    console.log("submit", values);
    dispatch(userSignIn(values));
  };

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: sendData,
    validate: (values) => {
      console.log("validating");

      const errors = {};

      if (!(values.email.includes("@") && values.email.includes(".com"))) {
        errors.email = "email is invalid";
      }

      if (values.password.length < 6) {
        errors.password = "password must contain at least 6 charctars";
      }

      return errors;
    },
  });
  
    if (isSignInSuccess) {
      navigate("/")
      dispatch(getCartProducts())
      dispatch(getWishListProducts())
    }




  return (
    <>

    <Box className="container" component="form" onSubmit={formikObj.handleSubmit} autoComplete="off" sx={{display: "flex" , flexDirection: "column" ,alignContent: "center", justifyContent: "center" , maxWidth:"500px",minWidth:"300px",margin:"auto"}}>

        <TextField
          error = { formikObj.errors.email && formikObj.touched.email ? true : false}
          label="Email"
          name="email"
          defaultValue={formikObj.values.email}
          helperText={formikObj.errors.email && formikObj.touched.email ? formikObj.errors.email : "" }
          onBlur={formikObj.handleBlur}
          onChange={formikObj.handleChange}
          value={formikObj.values.email}
          required
                    fullWidth={true}
          sx={{marginBottom:"20px",minWidth:"300px"}}
        />
        
        <TextField
          error = { formikObj.errors.password && formikObj.touched.password ? true : false}
          label="Password"
          name="password"
          defaultValue={formikObj.values.password}
          helperText={formikObj.errors.password && formikObj.touched.password ? formikObj.errors.password : "" }
          onBlur={formikObj.handleBlur}
          onChange={formikObj.handleChange}
          value={formikObj.values.password}
          required
                    fullWidth={true}
          sx={{marginBottom:"20px",minWidth:"300px"}}
          type="password"
        />
        
        <Button variant="contained" sx={{Width:"150px", height:"40px", margin:"auto"}} type="submit" disabled={!(formikObj.isValid && formikObj.dirty)}>{isSignInButtonLoading ? (
              <CircularProgress sx={{color:"rgba(0, 0, 0, 0.87)"}} size={30}/>
            ) : (
              "Log In"
            )} </Button>

        <Link to="/forget-pass" className="text-center my-2">forget password</Link>
        <p className="text-center">do you haven't account ? <Link to="/signup">sign up</Link></p>
      
    </Box>
    
      {/* <form
        className="row flex-column align-items-center justify-content-center mt-5"
        onSubmit={formikObj.handleSubmit}
      >
        <div className="col-md-6 col-sm-12 mb-2 text-start">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.email}
          />
          {formikObj.errors.email && formikObj.touched.email ? (
            <div className="alert alert-danger my-2" role="alert">
              {formikObj.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 col-sm-12 mb-2 text-start">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.password}
          />
          {formikObj.errors.password && formikObj.touched.password ? (
            <div className="alert alert-danger my-2" role="alert">
              {formikObj.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-12 mt-4 text-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!(formikObj.isValid && formikObj.dirty)}
          >
            {isSignInButtonLoading ? (
              <InfinitySpin width="45" color="#fff" />
            ) : (
              "Sign in"
            )}
          </button>
          
        </div>
        <Link to="/forget-pass" className="text-center">forget password</Link>
        <p className="text-center">do you haven't account ? <Link to="/signup">sign up</Link></p>
      </form> */}
      
    </>
  );
}

export default SignIn;
