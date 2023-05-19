import { $CombinedState, createSlice } from '@reduxjs/toolkit'
import { adApi } from '../../core/api/ad'
import { authUser } from '../../core/api/userAuth'
import type { RootState } from '../index'

type AdState = {
    backgound: any
}

const uiSlice = createSlice({
  name: 'ad',
  initialState: { backgound : ''} as AdState,
  reducers: {
   changeBackground:(state,{payload})=>{
       state.backgound = payload
   },
   
  },

})

export default uiSlice.reducer

export const {changeBackground} = uiSlice.actions

// export const selectCurrentUser = (state: RootState) => state.user.user
