import React from "react";

import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Slider from "react-slick";
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
import { CardActionArea, Tooltip , Link } from "@mui/material";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllProducts = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  };

  const ProductsInfo = useQuery("productsQuery", getAllProducts, {
    refetchOnMount: false,
  });

  const getAllCatigories = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  };

  const CatigoriesInfo = useQuery("CatigoriesQuery", getAllCatigories);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: "30px",
    autoplay: true ,
    autoplaySpeed: 2000,
    pauseOnHover:true,
    easing: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          fade:true,
          slidesToShow: 1 ,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (ProductsInfo.isLoading) {
    return (
      <div className="container">
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
    );
  }

  return (
    <div className="container">
      <h1>Home</h1>

      <div className="my-5">
        <Slider {...settings} className="px-2">
          {CatigoriesInfo.data?.data.data.map((ele, idx) => (
            <div key={idx}>
            <Link sx={{textDecoration:"none" , textAlign:"center"}} onClick={() => {
                          navigate(`/catigoryProducts/${ele.id}`);
                        }}>
              <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={ele.image}
          alt="green iguana"
        />
        <CardContent sx={{backgroundColor:"transparent"}}>
          <Typography gutterBottom variant="h6" component="div">
            {ele.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
            </Link></div>
          ))}
        </Slider>
      </div>

      <div className="container mt-5">
        <div className="row">
          {ProductsInfo.data?.data.data.map(
            (ele) => (
              <div className="col-md-3 col-sm-12 mb-3" key={ele.id}>
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
            )

            //   <div className="col-md-4 col-lg-3 mb-3" key={ele.id}>
            //   <div className="card border-0">
            //     <Link to={"/productDetails/"+ele.id}>
            //     <img src={ele.imageCover} className="card-img-top" alt="..." />
            //     </Link>
            //     <div className="card-body">
            //       <h5 className="card-title">{ele.title}</h5>
            //       <div className="d-flex justify-content-between mb-3">
            //         <span>{ele.price}</span> <span><i className="fa-solid fa-star text-warning"></i> {ele.ratingsAverage}</span>
            //       </div>

            //       <button type="button" className="btn btn-success mx-1" onClick={()=>{dispatch(addCartProduct(ele.id))}}>+ cart</button>
            //       <button type="button" className="btn btn-danger mx-1"  onClick={()=>{dispatch(addWishListProduct(ele.id))}}>+ wishlist</button>
            //     </div>
            //   </div>
            // </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
