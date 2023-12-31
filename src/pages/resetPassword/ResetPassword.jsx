import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResetPasswordSuccessFalse, userResetPassword } from "../../store/slices/ResetPasswordSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, TextField } from "@mui/material";


function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isResetPasswordButtonLoading = useSelector(
    (state) => state.ResetPassword.isResetPasswordButtonLoading
  );
  const isResetPasswordSuccess = useSelector((state) => state.ResetPassword.isResetPasswordSuccess);

  const user = {
    email: "",
    newPassword: "",
  };

  const sendData = (values) => {
    console.log("submit", values);
    dispatch(userResetPassword(values));
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

      if (values.newPassword.length < 6) {
        errors.password = "password must contain at least 6 charctars";
      }

      if (values.rePassword !== values.password) {
        errors.newPassword = "password and repassword are not matching";
      }

      return errors;
    },
  });
  
    if (isResetPasswordSuccess) {
      dispatch(setResetPasswordSuccessFalse(false))
      navigate("/signin");
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

<TextField
  error = { formikObj.errors.newPassword && formikObj.touched.newPassword ? true : false}
  label="newPassword"
  name="newPassword"
  defaultValue={formikObj.values.newPassword}
  helperText={formikObj.errors.newPassword && formikObj.touched.newPassword ? formikObj.errors.newPassword : "" }
  onBlur={formikObj.handleBlur}
  onChange={formikObj.handleChange}
  value={formikObj.values.newPassword}
  required
            fullWidth={true}
  sx={{marginBottom:"20px",minWidth:"300px"}}
  type="password"
/>

<Button variant="contained" sx={{Width:"150px", height:"40px", margin:"auto"}} type="submit" disabled={!(formikObj.isValid && formikObj.dirty)}>{isResetPasswordButtonLoading ? (
      <CircularProgress sx={{color:"rgba(0, 0, 0, 0.87)"}} size={30}/>
    ) : (
      "set new password"
    )} </Button>

</Box>

      {/* <div className="container">
      <form
        className="row flex-column align-items-center mt-5"
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
            new password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.newPassword}
          />
          {formikObj.errors.newPassword && formikObj.touched.newPassword ? (
            <div className="alert alert-danger my-2" role="alert">
              {formikObj.errors.newPassword}
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
            {isResetPasswordButtonLoading ? (
              <InfinitySpin width="45" color="#fff" />
            ) : (
              "set new password"
            )}
          </button>
          
        </div>
      </form>
      </div> */}
    </>
  );
}

export default ResetPassword;
