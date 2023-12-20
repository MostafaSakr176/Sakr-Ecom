import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';


const initialState = {
  token: localStorage.getItem('token'),
  getCartProductsMessage: "",
  getCartProductsIsLoading: false,

  addCartProductMessage: "",
  addCartProductIsLoading: false,

  removeCartProductMessage: "",
  removeCartProductIsLoading: false,

  updateProductCountMessage: "",
  updateProductCountIsLoading:false,
  cartProducts: [],
  cartQuantity : 0,
  totalCartPrice : 0
}
export const getCartProducts = createAsyncThunk('Cart/getCartProducts', async ()=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers : {"token": localStorage.getItem('token')}})
  
  return data
})
export const addCartProduct = createAsyncThunk('Cart/addCartProduct', async (productID)=>{
  console.log(productID , localStorage.getItem('token'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{"productId" : productID}, {
    headers : {"token": localStorage.getItem('token')}
  })
  return data
})

export const removeCartProduct = createAsyncThunk('Cart/removeCartProduct', async (productID)=>{
  console.log(productID , localStorage.getItem('token'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`, {
    headers : {"token": localStorage.getItem('token')}
  })
  return data
})

export const updateProductCount = createAsyncThunk('Cart/updateProductCount', async (info)=>{
  console.log(info);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
  const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${info.productID}`,{"count" : info.count }, {
    headers : {"token": localStorage.getItem('token')}
  }).catch(err => console.log(err))
  return data
})



export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    
    builder.addCase( getCartProducts.pending , (state , action)=>{
      state.getCartProductsIsLoading = true;
    });
    builder.addCase( getCartProducts.fulfilled , (state , action)=>{
      // console.log("getCartProducts" , action.payload);
      state.cartProducts = action.payload.data.products
      state.cartQuantity = action.payload.numOfCartItems
      state.totalCartPrice = action.payload.data.totalCartPrice
      state.getCartProductsIsLoading = false;

      // console.log(state.cartQuantity);

    });
    builder.addCase( getCartProducts.rejected , (state , action)=>{
      // state.cartProducts = action.payload
      state.getCartProductsIsLoading = false;
      state.cartProducts =[]
      // console.log(action.error);
    });


    builder.addCase( addCartProduct.pending , (state , action)=>{
      // state.addCartProductIsLoading = true;
    });
    builder.addCase( addCartProduct.fulfilled , (state , action)=>{
      
      state.cartProducts = action.payload.data.products
      state.addCartProductMessage = action.payload.message
      state.cartQuantity = action.payload.numOfCartItems
      state.totalCartPrice = action.payload.data.totalCartPrice

      toast.success(action.payload.message ,{
        pauseOnFocusLoss: false
      })

    });
    builder.addCase( addCartProduct.rejected , (state , action)=>{
      if (state.token) {
        toast.error("adding product faild" ,{
          pauseOnFocusLoss: false
        })
      }
      toast.error("sorry you must login first!" ,{
        pauseOnFocusLoss: false
      })
      // state.addCartProductIsLoading = false;
      // console.log(action.error);
    });



    builder.addCase( removeCartProduct.fulfilled , (state , action)=>{
      state.cartProducts = action.payload.data.products
      state.removeCartProductIsLoading = false;
      toast.success("product removed successfuly" ,{
        pauseOnFocusLoss: false
      })
      state.cartQuantity = action.payload.numOfCartItems
      state.totalCartPrice = action.payload.data.totalCartPrice


    });
    builder.addCase( removeCartProduct.rejected , (state , action)=>{
      toast.error("remove product faild" ,{
        pauseOnFocusLoss: false
      })
      state.removeCartProductIsLoading = false;
      // console.log(action.error);
    });




    
    builder.addCase( updateProductCount.pending , (state , action)=>{
      // state.updateProductCountIsLoading = true;
    });
    builder.addCase( updateProductCount.fulfilled , (state , action)=>{
      // console.log(action.payload);
      state.cartProducts = action.payload.data.products
      state.totalCartPrice = action.payload.data.totalCartPrice

      // state.updateProductCountIsLoading = false;
      toast.success("product count updated successfuly")

    });
    builder.addCase( updateProductCount.rejected , (state , action)=>{
      // state.cartProducts = action.payload
      toast.error("product count updated faild")
      // state.updateProductCountIsLoading = false;
      // console.log(action.error);
    });
  }
})

// Action creators are generated for each case reducer function
export const {} = CartSlice.actions

export default CartSlice.reducer;




