import React from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { addCartProduct } from "../../store/slices/CartSlice";
import { addWishListProduct } from "../../store/slices/WishListSlice";

function Products() {

  const dispatch = useDispatch()


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
      <h1>Products</h1>

      <div className="container">
        <div className="row">
          {data?.data.data.map(ele => 
            <div className="col-md-4 col-lg-3 mb-3" key={ele.id}>
            <div className="card border-0">
              <Link to={"/productDetails/"+ele.id}>
              <img src={ele.imageCover} className="card-img-top" alt="..." />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{ele.title}</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span>{ele.price} EGP</span> <span><i class="fa-solid fa-star text-warning"></i> {ele.ratingsAverage}</span>
                </div>
                
                <button type="button" className="btn btn-success mx-1" onClick={()=>{dispatch(addCartProduct(ele.id))}}>+ cart</button>
                <button type="button" className="btn btn-danger mx-1"  onClick={()=>{dispatch(addWishListProduct(ele.id))}}>+ wishlist</button>
              </div>
            </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Products;
