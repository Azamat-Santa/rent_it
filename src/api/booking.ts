import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../data/const'

export const bookingApi = createApi({
    reducerPath:'bookingApi',
    tagTypes: ['bookingApi'],
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BASE_URL}bookings/`,
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
      getBoookingAd: builder.query<any,any>({
        query: (option) => {
         const {productId,year,month} = option
         return{
            url: `get/product-schedule/${productId}/${year}/${month}`,
        }
        },
        providesTags: result => ['bookingApi']
      }),
      getBoookingConfirm: builder.query<any,any>({
        query: () => {
         return{
            url: `get/requests`,
        }
        },
        providesTags: result => ['bookingApi']

      }),
      getMyBoooking: builder.query<any,any>({
        query: () => {
         return{
            url: `get/user-bookings`,
        }
        },
        providesTags: result => ['bookingApi']

      }),
      postBoookingAd: builder.mutation<any,any>({
        query: (option) => ({
          url: 'book-product',
          method:'POST',
          body:option
        }),
        invalidatesTags: ['bookingApi']
      }),
      putBoookingAccept: builder.mutation<any,any>({
        query: (bookingId) => ({
          url: `accept-booking-request/${bookingId}`,
          method:'PUT',
        }),
        invalidatesTags: ['bookingApi']
      }),
      
     
    }),
  })
  
