import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProtectedRoutsMiddleWare({children}) {

  const token = useSelector(state => state.SignIn.token);
  console.log("fgh");




  if (token === null) {
    console.log("yyy");
    toast.error("You must login first !")
    return <Navigate to='/signin' />
  }

  if (token) {
    return (
      <div>{children}</div>
    )
  }
}

export default ProtectedRoutsMiddleWare