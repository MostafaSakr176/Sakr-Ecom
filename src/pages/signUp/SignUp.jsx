import "./signUp.css";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../../store/slices/SignUpSlice";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

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
    }
  },[isSignUpSuccess , navigate])



  return (
    <>
      <form
        className="d-flex flex-column align-items-center mt-5"
        onSubmit={formikObj.handleSubmit}
      >
        <div className="col-md-6 m-2 text-start">
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
        <div className="col-md-6 m-2 text-start">
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
        <div className="col-md-6 m-2 text-start">
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
        <div className="col-md-6 m-2 text-start">
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
        <div className="col-md-6 m-2 text-start">
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

        <div className="col-12 mt-4 text-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!(formikObj.isValid && formikObj.dirty)}
          >
            {isSignUpButtonLoading ? (
              <InfinitySpin width="100" color="#fff" />
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
