import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';


const initialState = {
  token: localStorage.getItem('token'),

  getWishListProductsIsLoading: false,

  WishListProducts: [],
  WishListQuantity : 0
}
export const getWishListProducts = createAsyncThunk('Products/getWishListProducts', async ()=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers : {"token": localStorage.getItem('token')}})
  return data
})
export const addWishListProduct = createAsyncThunk('Products/addWishListProduct', async (productID)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{"productId" : productID}, {
    headers : {"token": localStorage.getItem('token')}
  })
  console.log(data);
  return data
})

export const removeWishListProduct = createAsyncThunk('Products/removeWishListProduct', async (productID)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productID}`, {
    headers : {"token": localStorage.getItem('token')}
  })
  console.log(data);
  return data
})


export const WishListSlice = createSlice({
  name: 'WishList',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{

    builder.addCase( getWishListProducts.pending , (state , action)=>{
      state.getWishListProductsIsLoading = true;
    });
    builder.addCase( getWishListProducts.fulfilled , (state , action)=>{
      console.log(action.payload);
      state.WishListProducts = action.payload.data
      state.WishListQuantity = action.payload.count
      state.getWishListProductsIsLoading = false;
    });
    builder.addCase( getWishListProducts.rejected , (state , action)=>{
      state.getWishListProductsMessage = "there is no products in WishList"
      state.getWishListProductsIsLoading = false;
      state.WishListProducts =[]
    });




    builder.addCase( addWishListProduct.fulfilled , (state , action)=>{

      state.WishListQuantity = action.payload.data.length
      toast.success("product added to wishlist successfuly",{
        pauseOnFocusLoss: false
      })
    });
    builder.addCase( addWishListProduct.rejected , (state , action)=>{
      if (state.token) {
        toast.error("adding product to wishlist faild" ,{
          pauseOnFocusLoss: false
        })
      }
      toast.error("sorry you must login first!" ,{
        pauseOnFocusLoss: false
      })

      state.addWishListProductIsLoading = false;
    });




    builder.addCase( removeWishListProduct.pending , (state , action)=>{
      state.removeWishListProductIsLoading = true;
    });
    builder.addCase( removeWishListProduct.fulfilled , (state , action)=>{
      // state.WishListProducts = action.payload.data
      console.log("remove product",action.payload);
      state.removeWishListProductIsLoading = false;
      toast.success("product removed from wishlist successfuly" ,{
        pauseOnFocusLoss: false
      })
      state.WishListQuantity = action.payload.data.length
    });
    builder.addCase( removeWishListProduct.rejected , (state , action)=>{
      toast.error("remove product from wishlist faild" ,{
        pauseOnFocusLoss: false
      })
      state.removeWishListProductIsLoading = false;
    });


  }
})

// Action creators are generated for each case reducer function
export const {} = WishListSlice.actions

export default WishListSlice.reducer;




