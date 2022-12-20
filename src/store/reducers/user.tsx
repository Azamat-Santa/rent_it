import { $CombinedState, createSlice } from '@reduxjs/toolkit'
import { authUser, UserResponse } from '../../api/userAuth'
import { IUser } from '../../types/types'
import type { RootState } from '../index'

type AuthState = {
  isAuth: boolean | null
  user: IUser | {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuth: false, user:{} } as AuthState,
  reducers: {
    checkIsAuth:(state,action)=>{
      state.isAuth = true
      
    },
    logOut:(state)=>{
      state.isAuth = false
      state.user = {}
      localStorage.removeItem('accessTocken')
      localStorage.removeItem('refreshTocken')

    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authUser.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log(payload)
        state.user = payload
        state.isAuth = true
        localStorage.setItem('accessTocken',payload.accessToken)
        localStorage.setItem('refreshTocken',payload.refreshToken)
      }
    );
    builder.addMatcher(
      authUser.endpoints.refreshTocken.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.user = payload
        state.isAuth = true
        localStorage.setItem('accessTocken',payload.accessToken)
        localStorage.setItem('refreshTocken',payload.refreshToken)
      }
    )
   
  },

})

export default authSlice.reducer

export const {checkIsAuth,logOut} = authSlice.actions

// export const selectCurrentUser = (state: RootState) => state.user.user
