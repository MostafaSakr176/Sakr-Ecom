import React from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { addCartProduct } from "../../store/slices/CartSlice";
import { addWishListProduct } from "../../store/slices/WishListSlice";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RemoveRedEye, ShoppingCart, Star } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Products() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getAllProducts = ()=>{
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  const {data , isLoading } = useQuery("queryClient" , getAllProducts , {

  })

  if (isLoading) {
    return <div className="container">
      <div className="d-flex justify-content-center alien-items-center">
      <TailSpin
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
      </div>
    </div>
  }

  return (
    <div>
      

      <div className="container">
      <h1 className="mb-4">Products</h1>
        <div className="row">
          {data?.data.data.map(ele => 
            <div className="col-md-4 col-lg-3 mb-3" key={ele.id}>
            <Card>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {ele.title[0]}
                      </Avatar>
                    }
                    action={
                      <Typography>
                        {ele.ratingsAverage} <Star color="warning" />
                      </Typography>
                    }
                    title={ele.title}
                    subheader={ele.category.name}
                  />
                  <CardMedia
                    component="img"
                    height="250"
                    image={ele.imageCover}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {ele.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Tooltip placement="top" title="add to favorites" >
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                          dispatch(addWishListProduct(ele.id));
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement="top" title="add to cart">
                      <IconButton
                        aria-label="add to cart"
                        onClick={() => {
                          dispatch(addCartProduct(ele.id));
                        }}
                      >
                        <ShoppingCart />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement="top" title="show details">
                      <IconButton
                        aria-label="show details"
                        onClick={() => {
                          navigate(`/productDetails/${ele.id}`);
                        }}
                      >
                        <RemoveRedEye />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Products;
