import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWishListProducts, removeWishListProduct } from '../../store/slices/WishListSlice'
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { addCartProduct } from '../../store/slices/CartSlice';


function WishList() {

const WishListProducts = useSelector(state => state.WishList.WishListProducts);
// const getWishListProductsIsLoading = useSelector(state => state.WishList.getWishListProductsIsLoading);
const WishListQuantity = useSelector(state => state.WishList.WishListQuantity);

const dispatch = useDispatch()



useEffect(()=>{
  dispatch(getWishListProducts())
},[WishListQuantity])




  if (WishListQuantity === 0) {
    return <>
      <h1 className='text-center'>WishList is impty</h1>
    </>
  }

  if (WishListQuantity > 0) {

  return (
    <>
        <h1 className='text-center'>WishList</h1>
        <div className="container">
        <div className="row">
          {WishListProducts.map(ele => 
                      <div className="col-md-4 col-lg-3  mb-3" key={ele.id}>
                      <div className="card border-0">
                        <Link to={"/productDetails/"+ele.id}>
                        <img src={ele.imageCover} className="card-img-top" alt="..." />
                        </Link>
                        <div className="card-body">
                          <h5 className="card-title">{ele.title}</h5>
                          <div className="d-flex justify-content-between mb-3">
                            <span>{ele.price} EGP</span> <span><i className="fa-solid fa-star text-warning"></i> {ele.ratingsAverage}</span>
                          </div>
                          
                          <button type="button" className="btn btn-success mx-1" onClick={()=>{dispatch(addCartProduct(ele.id))}}>+ cart</button>
                          <button type="button" className="btn btn-warning mx-1" onClick={()=>{dispatch(removeWishListProduct(ele.id))}}>remove</button>
                        </div>
                      </div>
                      </div>
          
          )}
          
        </div>
      </div>

    </>

  )
    
  }

}

export default WishList