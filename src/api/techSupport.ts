import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { message } from 'antd';



export const techSupportApi = createApi({
    reducerPath:'techSupportApi',
    tagTypes: ['techSupportApi'],
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      mode: "cors",
      prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = localStorage.getItem('accessTocken')
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
        return headers
      },
    }),
    endpoints: (builder) => ({
      fetchAllUsers: builder.query<any,any>({
        query: () => ({
          url: 'api/v1/users/not-verified',
         
        }),
        providesTags: result => ['techSupportApi']
      }),

      fetchUser: builder.query({
        query: (userId) => ({
          url: `api/v1/user/${userId}`,
       
        }),
      }),

      acceptUser: builder.mutation<any,any>({
        query: (id) => ({
          url: `api/v1/user/accept-user/${id}`,
          method:'PUT'
        }),
        invalidatesTags: ['techSupportApi']
        
      }),
      rejectUser: builder.mutation<any,any>({
        query: (id) => ({
          url: `api/v1/user/reject-user/${id}`,
          method:'PUT'
        }),
        invalidatesTags: ['techSupportApi']
        
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
  
