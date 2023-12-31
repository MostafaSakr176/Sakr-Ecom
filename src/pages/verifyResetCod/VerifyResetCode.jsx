
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVerifyCodeSuccessFalse, userVerifyCode } from "../../store/slices/VerifyCodeSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, TextField } from "@mui/material";


function VerifyResetCode() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isVerifyCodeButtonLoading = useSelector(
    (state) => state.VerifyCode.isVerifyCodeButtonLoading
  );
  const isVerifyCodeSuccess = useSelector((state) => state.VerifyCode.isVerifyCodeSuccess);

  const user = {
    resetCode : ""
  };

  const sendData = (values) => {
    console.log("submit", values);
    dispatch(userVerifyCode(values));
  };

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: sendData,
    // validate: (values) => {
    //   // console.log("validating");

    //   const errors = {};

    //   if (values.code.length < 6) {
    //     errors.code = "code is invalid";
    //   }

    //   return errors;
    // },
  });
  
    if (isVerifyCodeSuccess) {
      dispatch(setVerifyCodeSuccessFalse(false))
      navigate("/reset-password");
    }




  return (
    <>

<Box className="container" component="form" onSubmit={formikObj.handleSubmit} autoComplete="off" sx={{display: "flex" , flexDirection: "column" ,alignContent: "center", justifyContent: "center" , maxWidth:"500px",minWidth:"300px",margin:"auto"}}>

<TextField
  label="verification Code"
  name="resetCode"
  defaultValue={formikObj.values.resetCode}
  // helperText={formikObj.errors.resetCode && formikObj.touched.resetCode ? formikObj.errors.resetCode : "" }
  onBlur={formikObj.handleBlur}
  onChange={formikObj.handleChange}
  value={formikObj.values.resetCode}
  required
  fullWidth={true}
  sx={{marginBottom:"20px",minWidth:"300px"}}
/>

<Button variant="contained" sx={{Width:"150px", height:"40px", margin:"auto"}} type="submit" disabled={!(formikObj.isValid && formikObj.dirty)}>{isVerifyCodeButtonLoading ? (
      <CircularProgress sx={{color:"rgba(0, 0, 0, 0.87)"}} size={30}/>
    ) : (
      "Verify code"
    )} </Button>

</Box>
      {/* <form
        className="row flex-column align-items-center mt-5"
        onSubmit={formikObj.handleSubmit}
      >
        <div className="col-md-6 col-sm-12 m-2 text-start">
          <label htmlFor="code" className="form-label">
            Enter the code
          </label>
          <input
            type="text"
            className="form-control"
            id="resetCode"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.resetCode}
          />
        </div>
        <div className="col-12 mt-4 text-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!(formikObj.isValid && formikObj.dirty)}
          >
            {isVerifyCodeButtonLoading ? (
              <InfinitySpin width="45" color="#fff" />
            ) : (
              "Verify code "
            )}
          </button>
          
        </div>
      </form> */}
    </>
  );
}

export default VerifyResetCode;
