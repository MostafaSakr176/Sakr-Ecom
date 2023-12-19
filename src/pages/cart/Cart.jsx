import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartProducts, removeCartProduct, updateProductCount } from '../../store/slices/CartSlice'
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addWishListProduct } from '../../store/slices/WishListSlice';


function Cart() {

const cartProducts = useSelector(state => state.Cart.cartProducts);
const getCartProductsIsLoading = useSelector(state => state.Cart.getCartProductsIsLoading);
const cartQuantity = useSelector(state => state.Cart.cartQuantity);
const totalCartPrice = useSelector(state => state.Cart.totalCartPrice);


const dispatch = useDispatch()

function increaseProductCount(count , productID){
  const info = {
    count: count-1,
    productID
  }
  if (info.count < 1) {
    toast.warning("product quantity minimum is 1 peace" ,{
      pauseOnFocusLoss: false
    })
  }else{
    dispatch(updateProductCount(info))
  }
  
}

function decreaseProductCount(count , productID){
  const info = {
    count: count+1,
    productID
  }
  dispatch(updateProductCount(info))
}

useEffect(()=>{
  dispatch(getCartProducts())
},[])





  if (getCartProductsIsLoading) {
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

  if (cartQuantity === 0) {
    return <>
      <h1>cart is impty</h1>
    </>
  }

  if (cartQuantity > 0) {

  return (
    <>
        <h1 className='text-center'>Cart</h1>
        <h2 className='text-center'>totalCartPrice : {totalCartPrice}</h2>
        <div className="container">
        <div className="row">
          {cartProducts.map(ele => 

            <div className="col-md-4 col-lg-3 mb-3" key={ele.product.id}>
            <div className="card border-0">
              <Link to={"/productDetails/"+ele.product.id}>
              <img src={ele.product.imageCover} className="card-img-top" alt="..." />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{ele.product.title}</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span>{ele.price} EGP</span> <span><i className="fa-solid fa-star text-warning"></i> {ele.product.ratingsAverage}</span>
                </div>
                <div className="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
                   <button type="button" className="btn btn-danger" onClick={()=>{increaseProductCount(ele.count , ele.product.id)}}>-</button>
                   <input className="form-control" type="number" value={ele.count}  aria-label="Disabled input example" disabled />
                   <button type="button" className="btn btn-success" onClick={()=>{decreaseProductCount(ele.count , ele.product.id)}}>+</button>
                 </div>
                 <button type="button" className="btn btn-warning" onClick={()=>{dispatch(removeCartProduct(ele.product.id))}}>remove</button>

                <button type="button" className="btn btn-danger mx-1"  onClick={()=>{dispatch(addWishListProduct(ele.id))}}>+ wishlist</button>
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

export default Cart