import React from "react";
import styles from "./navbar.module.css"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/SignInSlice";





function Navbar() {

  const userName = useSelector(state => state.SignIn.userInfo?.name);
  console.log(userName);
  // const name = userName?.split(" ")
  const token = useSelector(state => state.SignIn.token);
  const cartQuantity = useSelector(state => state.Cart.cartQuantity);
  const WishListQuantity = useSelector(state => state.WishList.WishListQuantity);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = (e)=>{
    e.preventDefault();
    dispatch(logout());
    navigate('/signin');
  }


  // useEffect(()=>{
  //   dispatch(getCartProducts())
  //   dispatch(getWishListProducts())
  //   dispatch(getTokenInfo())
  // },[cartQuantity , WishListQuantity])



  return (
    <>
      <nav className={styles.nav}>
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-8 col-sm-12">
              <div className={styles.links}>
                <div className="row">
                <div className="col-md-4 col-sm-12">
                  <div className="logo">
                    <Link className={styles.logoLink} to="/">Sakr Ecom</Link>
                  </div>
                </div>
                <div className="col-md-8 col-sm-12">
                  <ul className=" d-flex list-unstyled m-0 ">
                  <li className={styles.navLinks} >
                    <NavLink className={styles.navLink} to="/home">Home</NavLink>
                  </li>
                  <li className={styles.navLinks} >
                    <NavLink className={styles.navLink} to="/products">Products</NavLink>
                  </li>
                  <li className={styles.navLinks} >
                    <NavLink className={styles.navLink} to="/about">About</NavLink>
                  </li>
                  <li className={styles.navLinks} >
                    <NavLink className={styles.navLink} to="/contactUs">Contact Us</NavLink>
                  </li>
                  
                </ul>
                </div>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              
                <ul className={styles.icons}>
                  {token && <><li className={styles.iconCyrcle}>
                    <Link className={styles.iconLink} to="/cart">
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span className={styles.icon_quantity}>{cartQuantity}</span>
                    </Link>
                  </li>
                  
                  <li className={styles.iconCyrcle}>
                    <Link className={styles.iconLink} to="/wishlist">
                    <i className="fa-solid fa-heart"></i>
                    <span className={styles.icon_quantity}>{WishListQuantity}</span>
                    </Link>
                  </li></>}
                  {token && <li className={styles.iconCyrcle}>
                    <Link className={styles.iconLink} to="/profile">
                    <i className="fa-solid fa-user"></i>
                    </Link>
                  </li>}
                  {token && <li className={styles.navLinks} >
                    <NavLink className={styles.navLink} to="/profile">Hi, {userName}</NavLink>
                  </li>}
                  <li>
                    {!token && <Link type="button" className="btn btn-light ms-3" to="/signin">Sign In</Link>}
                    {!token && <Link type="button" className="btn btn-dark ms-3" to="/signup">Sign Up</Link>}
                    {token && <Link type="button" className="btn btn-light ms-3" to="/signin" onClick={handleLogout}>Logout</Link>}
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
