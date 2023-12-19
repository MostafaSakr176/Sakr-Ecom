
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { addUserAddress, setAddUserAddressSuccessFalse } from "../../store/slices/UserAdressSlice";

function AddUserAddress() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isAddUserAddressButtonLoading = useSelector(
    (state) => state.UserAddress.addUserAddressIsLoading
  );
  const isAddUserAddressSuccess = useSelector((state) => state.UserAddress.isAddUserAddressSuccess);

  const addressDetails = {
    name: "",
    details: "",
    phone: "",
    city: ""
};

  const sendData = (values) => {
    console.log("submit", values);
    dispatch(addUserAddress(values));
  };

  const formikObj = useFormik({
    initialValues: addressDetails,
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

      if (values.city.length < 3 || values.city.length > 20) {
        errors.city = "city must be contain from 3 to 20 charctars";
      }

      console.log(errors);
      return errors;
    },
  });
  
    if (isAddUserAddressSuccess) {
      navigate("/profile");
      dispatch(setAddUserAddressSuccessFalse(false))
    }




  return (
    <>
      <form
        className="row flex-column align-items-center mt-5"
        onSubmit={formikObj.handleSubmit}
      >
        <div className="col-md-6 col-sm-12 m-2 text-start">
          <label htmlFor="text" className="form-label">
            name
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
        <div className="col-md-6 col-sm-12 m-2 text-start">
          <label htmlFor="details" className="form-label">
            details
          </label>
          <input
            type="text"
            className="form-control"
            id="details"
            name="details"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.details}
          />
          
        </div>
        <div className="col-md-6 col-sm-12 m-2 text-start">
          <label htmlFor="phone" className="form-label">
            phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
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
        <div className="col-md-6 col-sm-12 m-2 text-start">
          <label htmlFor="city" className="form-label">
            city
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.city}
          />
          {formikObj.errors.city && formikObj.touched.city ? (
            <div className="alert alert-danger my-2" role="alert">
              {formikObj.errors.city}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-12 text-center mt-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!(formikObj.isValid && formikObj.dirty)}
          >
            {isAddUserAddressButtonLoading ? (
              <InfinitySpin width="100" color="#fff" />
            ) : (
              "add address"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default AddUserAddress;
