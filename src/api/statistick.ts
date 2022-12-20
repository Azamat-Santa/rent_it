import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const statistickApi = createApi({
    reducerPath:'statistickApi',
    tagTypes: ['statistick'],
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BASE_URL}statistics`,
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
      getCategoryBySumm: builder.query<any,any>({
        query: () => {
         return{
            url: `/get/publication-number-by-categories`,
        }
        },
        providesTags: result => ['statistick']
      }),
      getViews: builder.query<any,any>({
        query: (year) => {
         return{
            url: `get/reaches-by-months-and-year/${year}`,
        }
        },
        providesTags: result => ['statistick']

      }),
      getMyBoooking: builder.query<any,any>({
        query: () => {
         return{
            url: `get/user-bookings`,
        }
        },
        providesTags: result => ['statistick']

      }),
      getCompleteUser: builder.query<any,any>({
        query: () => ({
          url: 'get/users-info',
          
        }),
        providesTags: result => ['statistick']
      }),
      putBoookingAccept: builder.mutation<any,any>({
        query: (bookingId) => ({
          url: `accept-booking-request/${bookingId}`,
          method:'PUT',
        }),
        invalidatesTags: ['statistick']
      }),
      
     
    }),
  })
  
