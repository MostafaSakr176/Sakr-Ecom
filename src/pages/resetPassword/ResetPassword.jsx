import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResetPasswordSuccessFalse, userResetPassword } from "../../store/slices/ResetPasswordSlice";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

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

      return errors;
    },
  });
  
    if (isResetPasswordSuccess) {
      dispatch(setResetPasswordSuccessFalse(false))
      navigate("/signin");
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
        <div className="col-md-6 col-sm-12 m-2 text-start">
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
              <InfinitySpin width="100" color="#fff" />
            ) : (
              "set new password"
            )}
          </button>
          
        </div>
      </form>
    </>
  );
}

export default ResetPassword;
