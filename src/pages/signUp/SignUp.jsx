import "./signUp.css";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp , setIsSignUpSuccessFalse } from "../../store/slices/SignUpSlice";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, TextField } from "@mui/material";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isSignUpButtonLoading = useSelector(
    (state) => state.SignUp.isSignUpButtonLoading
  );
  const isSignUpSuccess = useSelector((state) => state.SignUp.isSignUpSuccess);
  const isSignUpFaild = useSelector((state) => state.SignUp.isSignUpFaild);

  const user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const sendData = (values) => {
    console.log("submit", values);
    dispatch(userSignUp(values));
  };

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: sendData,
    validate: (values) => {
      console.log("validating");

      const errors = {};
      if (values.name.length < 3 || values.name.length > 20) {
        errors.name = "name must be contain from 3 to 20 charctars";
      }

      const regex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
      if (!regex.test(values.phone)) {
        errors.phone = "phone number is invalid";
      }

      if (!(values.email.includes("@") && values.email.includes(".com"))) {
        errors.email = "email is invalid";
      }

      if (values.password.length < 6) {
        errors.password = "password must contain at least 6 charctars";
      }

      if (values.rePassword !== values.password) {
        errors.rePassword = "password and repassword are not matching";
      }

      console.log(errors);
      return errors;
    },
  });

  useEffect(()=>{
    if (isSignUpSuccess) {
      setTimeout(()=>{navigate("/signin")} , 1000);
      dispatch(setIsSignUpSuccessFalse())
    }

  },[isSignUpSuccess])



  return (
    <>
      

      <Box component="form" onSubmit={formikObj.handleSubmit} autoComplete="off" sx={{display: "flex" , flexDirection: "column" ,alignContent: "center", justifyContent: "center"}}>
      <TextField
          error = { formikObj.errors.name && formikObj.touched.name ? true : false}
          label="Name"
          name="name"
          defaultValue={formikObj.values.name}
          helperText={formikObj.errors.name && formikObj.touched.name ? formikObj.errors.name : "" }
          onBlur={formikObj.handleBlur}
          onChange={formikObj.handleChange}
          value={formikObj.values.name}
          required
          fullWidth={true}
          sx={{marginBottom:"20px", minWidth:"300px"}}
        />
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
          error = { formikObj.errors.phone && formikObj.touched.phone ? true : false}
          label="Phone"
          name="phone"
          defaultValue={formikObj.values.phone}
          helperText={formikObj.errors.phone && formikObj.touched.phone ? formikObj.errors.phone : "" }
          onBlur={formikObj.handleBlur}
          onChange={formikObj.handleChange}
          value={formikObj.values.phone}
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
        <TextField
          error = { formikObj.errors.rePassword && formikObj.touched.rePassword ? true : false}
          label="rePassword"
          name="rePassword"
          defaultValue={formikObj.values.rePassword}
          helperText={formikObj.errors.rePassword && formikObj.touched.rePassword ? formikObj.errors.rePassword : "" }
          onBlur={formikObj.handleBlur}
          onChange={formikObj.handleChange}
          value={formikObj.values.rePassword}
          required
                    fullWidth={true}
          sx={{marginBottom:"20px",minWidth:"300px"}}
          type="password"
        />
        <Button variant="contained" sx={{Width:"150px", height:"40px", margin:"auto"}} type="submit" disabled={!(formikObj.isValid && formikObj.dirty)}>{isSignUpButtonLoading ? (
              <CircularProgress sx={{color:"rgba(0, 0, 0, 0.87)"}} size={30}/>
            ) : (
              "Sign Up"
            )} </Button>
      
    </Box>


      {/* <form
        className="row align-items-center mt-5"
        onSubmit={formikObj.handleSubmit}
      >
        <div className="col-md-6 col-sm-12 mb-2 text-start">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.name}
          />
          {formikObj.errors.name && formikObj.touched.name ? (
            <div className="alert alert-danger my-2" role="alert">
              {formikObj.errors.name}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 col-sm-12 mb-2 text-start">
          <label htmlFor="phone" className="form-label">
            phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.phone}
          />
          {formikObj.errors.phone && formikObj.touched.phone ? (
            <div className="alert alert-danger my-2" role="alert">
              {formikObj.errors.phone}
            </div>
          ) : (
            ""
          )}
        </div>
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
        <div className="col-md-6 col-sm-12 mb-2 text-start">
          <label htmlFor="repassword" className="form-label">
            rePassword
          </label>
          <input
            type="password"
            className="form-control"
            id="repassword"
            name="rePassword"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.rePassword}
          />
          {formikObj.errors.rePassword && formikObj.touched.rePassword ? (
            <div className="alert alert-danger my-2" role="alert">
              {formikObj.errors.rePassword}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-12 mt-4 mb-2 text-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!(formikObj.isValid && formikObj.dirty)}
          >
            {isSignUpButtonLoading ? (
              <InfinitySpin width="45" color="#fff" />
            ) : (
              "sign up"
            )}
          </button>
          
        </div>
        <p className="text-center">do you have account ? <Link to="/signin">sign in</Link></p>
      </form> */}
      
    </>
  );
}

export default SignUp;
