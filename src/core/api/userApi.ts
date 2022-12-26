import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { message } from 'antd';




export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    tin: number;
    dateOfBirth:string;
    registeredAddress: string;
    residenceAddress: string;
    email: string;
    phoneNumber: string;
    imageUrl: string;
    roleId: number;
    password: string;
    provider: string;
    providerId: string
}
export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = localStorage.getItem('accessTocken')
      headers.set('referrerPolicy', "unsafe_url" )

        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
        return headers
      },
    }),
    endpoints: (builder) => ({
      fetchAllUsers: builder.query<UserResponse[],void>({
        query: () => ({
          url: 'api/v1/users',
         
        }),
      }),
      fetchUser: builder.query({
        query: () => ({
          url: 'api/v1/user',
       
        }),

      }),
      removeUser: builder.mutation<any,any>({
        query: (id) => ({
          url: `api/v1/user/${id}`,
        })
        
      }),
      getOwenerId: builder.query<any,any>({
        query: (id) => ({
          url: `api/v1/users/get-profile-by-id/${id}`,
        })
        
      }),
     
    }),
  })


/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      message.error(action.error.data.message)
    }

    return next(action)
  }
  
