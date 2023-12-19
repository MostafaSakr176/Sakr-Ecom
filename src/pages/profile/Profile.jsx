import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses, removeUserAddress } from "../../store/slices/UserAdressSlice";
import { Link } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const userAddresses = useSelector((state) => state.UserAddress.UserAddresses);
  const userInfo = useSelector((state) => state.SignIn.userInfo);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1>Hello {userInfo.name}</h1>
      <Link to='/add-address' type="button" className="btn btn-success mt-2 mb-3" >Add address</Link>
      {userAddresses.map((ele) => (
          <div className="card mb-2" key={ele._id}>
            <div className="card-body">
              <h5 className="card-title">{ele.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{ele.city}</h6>
              <p className="card-text">{ele.details}</p>
              <p className="card-text">{ele.phone}</p>
              <button type="button" className="btn btn-danger" onClick={()=>{dispatch(removeUserAddress(ele._id))}}>remove</button>
            </div>
            
          </div>
      ))}
      </div>
    </>
  );
}

export default Profile;
