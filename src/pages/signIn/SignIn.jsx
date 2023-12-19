import "./signIn.css";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../../store/slices/SignInSlice";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { getCartProducts } from "../../store/slices/CartSlice";
import { getWishListProducts } from "../../store/slices/WishListSlice";

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
      navigate("/home")
      dispatch(getCartProducts())
      dispatch(getWishListProducts())
    }




  return (
    <>
    <div className="container">
      <form
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
        <p className="text-center">do you haven't account ? <Link to="/signin">sign up</Link></p>
      </form>
    </div>
      
    </>
  );
}

export default SignIn;
