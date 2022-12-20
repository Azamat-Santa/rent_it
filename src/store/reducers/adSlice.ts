import { $CombinedState, createSlice } from '@reduxjs/toolkit'
import { adApi } from '../../api/ad'
import { authUser, UserResponse } from '../../api/userAuth'
import { IUser } from '../../types/types'
import type { RootState } from '../index'

type AdState = {
  mainProduct: any
  
}

const adSlice = createSlice({
  name: 'ad',
  initialState: { mainProduct : []} as AdState,
  reducers: {
   adCategoryData:(state,{payload})=>{

       state.mainProduct = payload
   }
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      adApi.endpoints.fetchAllAds.matchFulfilled,
      (state, { payload }) => {
        console.log(payload,'payload');
        state.mainProduct = payload
      }
    );
    

  }
  

})

export default adSlice.reducer

export const {adCategoryData} = adSlice.actions

// export const selectCurrentUser = (state: RootState) => state.user.user
