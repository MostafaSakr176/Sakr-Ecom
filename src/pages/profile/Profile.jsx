import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAddresses,
  removeUserAddress,
} from "../../store/slices/UserAdressSlice";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

function Profile() {
  const dispatch = useDispatch();
  const userAddresses = useSelector((state) => state.UserAddress.UserAddresses);
  const userInfo = useSelector((state) => state.SignIn.userInfo);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, []);

  return (
      <Box component="div" className="container" >
        <h1>Hello {userInfo.name}</h1>
        <Link
          to="/add-address"
          type="button"
          className="btn btn-success mt-2 mb-3"
        >
          Add address
        </Link>
        <div className="container">
        <div className="row">
          {userAddresses.map((ele) => (
            <div className="col-md-4 col-sm-12">
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Name
                  </Typography>
                  <Typography variant="h5" component="div">
                    {ele.name}
                  </Typography>
                  <Typography sx={{ mb: 1, mt: 2 }} color="text.secondary">
                    Details
                  </Typography>
                  <Typography variant="body2">{ele.details}</Typography>
                  <Typography sx={{ mb: 1, mt: 2 }} color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body2">{ele.phone}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      dispatch(removeUserAddress(ele._id));
                    }}
                  >
                    <Delete color="error" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <Edit />
                  </IconButton>
                </CardActions>
              </Card>
            </div>

            // <div className="card mb-2" key={ele._id}>
            //   <div className="card-body">
            //     <h5 className="card-title">{ele.name}</h5>
            //     <h6 className="card-subtitle mb-2 text-muted">{ele.city}</h6>
            //     <p className="card-text">{ele.details}</p>
            //     <p className="card-text">{ele.phone}</p>
            //     <button type="button" className="btn btn-danger" onClick={()=>{dispatch(removeUserAddress(ele._id))}}>remove</button>
            //   </div>

            // </div>
          ))}
        </div>
        </div>
      </Box>
  );
}

export default Profile;
