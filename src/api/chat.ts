import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../data/const'


export const chatApi = createApi({
    reducerPath:'chatApi',
    tagTypes: ['chatApi'],
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
      adChat: builder.mutation<any,any>({
        query: (option) => {
         return{
            method:'POST',
            url: `api/v1/chats/add-chat`,
            body: option
        }},
        invalidatesTags: ['chatApi']
      }),
      sendMessage: builder.mutation<any,any>({
        query: (option) => {
         return{
            method:'POST',
            url: `api/v1/chat-messages/add-chat-message`,
            body: option
        }},
        invalidatesTags: ['chatApi']
      }),

      getChatId: builder.query<any,any>({
        query: (chatId) => {
         return{
            url: `api/v1/chats/${chatId}`,
        }},
        providesTags: result => ['chatApi']
      }),

      getMessageId: builder.query<any,any>({
        query: (chatId) => {
         return{
            url: `api/v1/chat-messages/${chatId}`,
         }},
        providesTags: result => ['chatApi']
      }),

    }),
  })
  
