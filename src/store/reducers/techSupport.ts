import { createSlice } from '@reduxjs/toolkit'


type AdState = {
  user: any
}

const techSupportSlice = createSlice({
  name: 'techSupport',
  initialState: { user : []} as AdState,
  reducers: {
   userDatail:(state,{payload})=>{
       state.user = payload
   }
  },
})

export default techSupportSlice.reducer

export const {userDatail} = techSupportSlice.actions


