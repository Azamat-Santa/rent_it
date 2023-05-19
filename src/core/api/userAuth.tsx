import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store'
import { IPassport } from '../types/IPassport'
import { IRegisteredAddress } from '../types/IRegisteredAddress'
import { IResidenceAddress } from '../types/IResidenceAddress'
import { IUserComplete } from '../types/IUserComplete'
import { IUserInComplete } from '../types/IUserInComplete'



export interface IUserInCompleteResponse {
  id: number,
  firstName: string,
  lastName: string,
  middleName: string,
  phoneNumber: string,
  dateOfBirth: string,
  passportData: IPassport,
  registeredAddress: IRegisteredAddress,
  residenceAddress:IResidenceAddress,
  multipartFiles: []
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
export interface IRefreshTocken {
  refreshToken:string |null
} 

export const authUser = createApi({
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
    login: builder.mutation<IUserInComplete, LoginRequest>({
      query: (credentials) => ({
        url: 'api/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation<IUserComplete, RegistrationRequest>({
      query: (data) => ({
        url: 'api/auth/sign-up-incomplete',
        method: 'POST',
        body: data,
      }),
    }),

    fullRegister: builder.mutation<IUserComplete, FormData>({
      query: (data) => ({
        url: 'api/v1/users/sign-up-complete',
        method: 'PUT',
        body: data,
      }),
    }),
    refreshTocken: builder.mutation<IUserInComplete, IRefreshTocken>({
      query: (credentials) => ({
        url: 'api/auth/refresh-token',
        method: 'POST',
        body: credentials,
      }),
    }),
   
  }),
})

export const { useLoginMutation, useRegisterMutation } = authUser


