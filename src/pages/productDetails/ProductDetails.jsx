import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { TailSpin } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { addCartProduct } from "../../store/slices/CartSlice";
import { addWishListProduct } from "../../store/slices/WishListSlice";

function ProductDetails() {
  const id = useParams().productID;
  const dispatch = useDispatch()


  const getProductDetails = ()=>{
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  const {data , isLoading} = useQuery("ProductDetailsQuery" , getProductDetails )
  console.log(isLoading);

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
    <>
      <div className="container">
        <div className="row">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={data.data.data.imageCover}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{data.data.data.title}</h5>
                  <p className="card-text">{data.data.data.description}</p>
                  <p className="card-text">
                    <small className="text-muted">{data.data.data.slug}</small>
                  </p>
                  <p className="card-text">
                    price :{" "}
                    <small className="text-muted">{data.data.data.price}</small>
                  </p>
                </div>
                <button type="button" className="btn btn-success" onClick={()=>{dispatch(addCartProduct(data.data.data.id))}}>+ cart</button>
                <button type="button" className="btn btn-danger"  onClick={()=>{dispatch(addWishListProduct(data.data.data.id))}}>+ wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
