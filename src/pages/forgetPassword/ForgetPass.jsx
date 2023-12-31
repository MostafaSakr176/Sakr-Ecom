
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSendCodeSuccessFalse, userSendCode } from "../../store/slices/ForgetPassSlice";
import {useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, TextField } from "@mui/material";


function ForgetPass() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isSendCodeButtonLoading = useSelector(
    (state) => state.SendCode.isSendCodeButtonLoading
  );
  const isSendCodeSuccess = useSelector((state) => state.SendCode.isSendCodeSuccess);

  const user = {
    email: ""
  };

  const sendData = (values) => {
    console.log("submit", values);
    dispatch(userSendCode(values));

  };

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: sendData,
    validate: (values) => {
      // console.log("validating");

      const errors = {};

      if (!(values.email.includes("@") && values.email.includes(".com"))) {
        errors.email = "email is invalid";
      }

      return errors;
    },
  });
  
    if (isSendCodeSuccess) {
      dispatch(setSendCodeSuccessFalse(false))
      navigate("/verify-code");
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

<Button variant="contained" sx={{Width:"150px", height:"40px", margin:"auto"}} type="submit" disabled={!(formikObj.isValid && formikObj.dirty)}>{isSendCodeButtonLoading ? (
      <CircularProgress sx={{color:"rgba(0, 0, 0, 0.87)"}} size={30}/>
    ) : (
      "send code"
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
        <div className="col-12 mt-4 text-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!(formikObj.isValid && formikObj.dirty)}
          >
            {isSendCodeButtonLoading ? (
              <InfinitySpin width="45" color="#fff" />
            ) : (
              "send code"
            )}
          </button>
          
        </div>
      </form>
      </div> */}
    </>
  );
}

export default ForgetPass;
