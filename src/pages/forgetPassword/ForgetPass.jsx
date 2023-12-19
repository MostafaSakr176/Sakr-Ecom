
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSendCodeSuccessFalse, userSendCode } from "../../store/slices/ForgetPassSlice";
import { InfinitySpin } from "react-loader-spinner";
import {useNavigate } from "react-router-dom";

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
      console.log(isSendCodeSuccess);
      navigate("/verify-code");
    }




  return (
    <>
      <form
        className="row flex-column align-items-center mt-5"
        onSubmit={formikObj.handleSubmit}
      >
        <div className="col-md-6 col-sm-12 m-2 text-start">
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
              <InfinitySpin width="100" color="#fff" />
            ) : (
              "send code"
            )}
          </button>
          
        </div>
      </form>
    </>
  );
}

export default ForgetPass;
