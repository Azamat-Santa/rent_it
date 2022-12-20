import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const complaintsApi = createApi({
    reducerPath:'complaintsApi',
    tagTypes: ['complaints'],
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
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
      addComplaints: builder.mutation<any,any>({
        query: (option) => {
         return{
            method:'POST',
            url: `complaints/add`,
            body: option
        }},
        invalidatesTags: ['complaints']
      }),
      
      getMessageId: builder.query<any,any>({
        query: (chatId) => {
         return{
            url: `api/v1/chat-messages/${chatId}`,
         }},
        providesTags: result => ['complaints']
      }),

    }),
  })
  
