import { $CombinedState, createSlice } from '@reduxjs/toolkit'
import { adApi } from '../../core/api/ad'
import { authUser } from '../../core/api/userAuth'
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
        state.mainProduct = payload
      }
    );
    

  }
  

})

export default adSlice.reducer

export const {adCategoryData} = adSlice.actions


