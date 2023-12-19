import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';


const initialState = {
  getUserAddressesIsLoading: false,

  addUserAddressIsLoading: false,
  isAddUserAddressSuccess: false,

  removeUserAddressIsLoading: false,

  UserAddresses: [],
}
export const getUserAddresses = createAsyncThunk('UserAddress/getUserAddresses', async ()=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`, {headers : {"token": localStorage.getItem('token')}})
  return data
})


export const addUserAddress = createAsyncThunk('UserAddress/addUserAddress', async (addressDetails)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`,addressDetails, {
    headers : {"token": localStorage.getItem('token')}
  })
  console.log(data);
  return data
})

export const removeUserAddress = createAsyncThunk('UserAddress/removeUserAddress', async (addressID)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${addressID}`, {
    headers : {"token": localStorage.getItem('token')}
  })
  console.log(data);
  return data
})


export const UserAddressSlice = createSlice({
  name: 'UserAddress',
  initialState,
  reducers: {
    setAddUserAddressSuccessFalse: (state , action)=>{
      state.isAddUserAddressSuccess = action.payload
    }
  },
  extraReducers: (builder)=>{

    builder.addCase( getUserAddresses.pending , (state , action)=>{
      state.getUserAddressesIsLoading = true;
    });
    builder.addCase( getUserAddresses.fulfilled , (state , action)=>{
      console.log(action.payload);
      state.UserAddresses = action.payload.data
      // state.UserAddressQuantity = action.payload.count
      state.getUserAddressesIsLoading = false;
      // state.getUserAddressesMessage = ""
    });
    builder.addCase( getUserAddresses.rejected , (state , action)=>{
      // state.getUserAddressesMessage = "there is no products in UserAddress"
      // state.getUserAddressesIsLoading = false;
      // state.UserAddresses =[]
    });





    builder.addCase( addUserAddress.pending , (state , action)=>{
      state.addUserAddressIsLoading = true;
    });
    builder.addCase( addUserAddress.fulfilled , (state , action)=>{
      // console.log("adding product",action.payload);
      state.UserAddresses = action.payload.data
      state.addUserAddressIsLoading = false;
      state.isAddUserAddressSuccess = true;
      toast.success(action.payload.message,{
        pauseOnFocusLoss: false
      })
    });
    builder.addCase( addUserAddress.rejected , (state , action)=>{
      toast.error("adding product to UserAddress faild" ,{
        pauseOnFocusLoss: false
      })
      state.addUserAddressIsLoading = false;
    });





    builder.addCase( removeUserAddress.fulfilled , (state , action)=>{
      state.UserAddresses = action.payload.data
      toast.success(action.payload.message ,{
        pauseOnFocusLoss: false
      })
    });
    builder.addCase( removeUserAddress.rejected , (state , action)=>{
      toast.error("remove product from UserAddress faild" ,{
        pauseOnFocusLoss: false
      })
    });


  }
})

// Action creators are generated for each case reducer function
export const {setAddUserAddressSuccessFalse} = UserAddressSlice.actions

export default UserAddressSlice.reducer;




