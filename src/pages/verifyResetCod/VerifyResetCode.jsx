
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVerifyCodeSuccessFalse, userVerifyCode } from "../../store/slices/VerifyCodeSlice";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

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

    //   if (!(values.code.includes("@") && values.code.includes(".com"))) {
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
      <form
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
      </form>
    </>
  );
}

export default VerifyResetCode;
