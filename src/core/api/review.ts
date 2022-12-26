import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const reviewApi = createApi({
    reducerPath:'reviewApi',
    tagTypes: ['reviewApi'],
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('accessTocken')
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
        return headers
      },
     
    }),
    endpoints: (builder) => ({
      getReview: builder.query<any,any>({
        query: (productId) => ({
          url: `products/get/reviews/${productId}`,
        
        }),
        providesTags: result => ['reviewApi']

      }),
      postReview: builder.mutation<any,any>({
        query: (review) => ({
          url: 'reviews/add',
          method:'POST',
          body:review
        }),
        invalidatesTags: ['reviewApi']

      }),
      
     
    }),
  })
  
