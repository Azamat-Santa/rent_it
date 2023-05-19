import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserInComplete } from '../types/IUserInComplete';





export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('accessTocken')
      headers.set('referrerPolicy', "unsafe_url" )

        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
        return headers
      },
    }),
    endpoints: (builder) => ({
      fetchAllUsers: builder.query<IUserInComplete[] | [] , any>({
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



  
