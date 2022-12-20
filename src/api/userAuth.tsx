import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'



export interface UserResponse {
    type: string,
    accessToken: string,
    refreshToken: string,
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    phoneNumber: string,
    role: string
}

export interface LoginRequest {
  email: string
  password: string
}
export interface RegistrationRequest {
  firstName:string,
  email: string
  password: string
}

export const authUser = createApi({
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
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'api/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation<UserResponse, RegistrationRequest>({
      query: (data) => ({
        url: 'api/auth/sign-up-incomplete',
        method: 'POST',
        body: data,
      }),
    }),

    fullRegister: builder.mutation<any, any>({
      query: (data) => ({
        url: 'api/v1/users/sign-up-complete',
        method: 'PUT',
        body: data,
      }),
    }),
    refreshTocken: builder.mutation<any, any>({
      
      query: (credentials) => ({
        url: 'api/auth/refresh-token',
        method: 'POST',
        body: credentials,
      }),
    }),
   
  }),
})

export const { useLoginMutation, useRegisterMutation } = authUser


