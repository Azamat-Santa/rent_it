import { $CombinedState, createSlice } from '@reduxjs/toolkit'
import { adApi } from '../../api/ad'
import { authUser, UserResponse } from '../../api/userAuth'
import { IUser } from '../../types/types'
import type { RootState } from '../index'

type AdState = {
    backgound: any
  
}

const uiSlice = createSlice({
  name: 'ad',
  initialState: { backgound : ''} as AdState,
  reducers: {
   changeBackgroundOnBlue:(state,{payload})=>{
       state.backgound = payload
   },
   changeBackgroundOnWhite:(state,{payload})=>{
    state.backgound = payload
},
  },

})

export default uiSlice.reducer

export const {changeBackgroundOnBlue,changeBackgroundOnWhite} = uiSlice.actions

// export const selectCurrentUser = (state: RootState) => state.user.user
