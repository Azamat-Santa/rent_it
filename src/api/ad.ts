import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../data/const'

export const adApi = createApi({
    reducerPath:'adApi',
    tagTypes: ['Ad'],
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BASE_URL}products/`,
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
      fetchRecommendations: builder.query<any,void>({
        query: () => ({
          url: 'get/recommendations',
         
        }),
      }),
      searchData: builder.query<any,any>({
        query: (text) => ({
          url: `get/search/${text}`,
         
        }),
        providesTags: result => ['Ad']
        
      }),
      fetchAllAds: builder.query<any,void>({
        query: () => ({
          url: 'get/main-page/0',
       
        }),
        providesTags: result => ['Ad']
      }),
      fetchOneAd: builder.query<any,any>({
        query: (productId) => ({
          url: `get/details/${productId}`,
       
        }),
        providesTags: result => ['Ad']
      }),
      fetchSimularAd: builder.query<any,any>({
        query: (categoryId) => ({
          url: `get/similar-by-category/${categoryId}`,
       
        }),
        providesTags: result => ['Ad']
      }),
      fetchMapId: builder.query<any,any>({
        query: (categoryId) => ({
          url: `get/map-products-by-category/${categoryId}`,
       
        }),
        providesTags: result => ['Ad']
      }),
      fetchMyAds: builder.query<any,void>({
        query: () => ({
          url: 'get/user-products',
       
        }),
        providesTags: result => ['Ad']
      }),
      deleteAd: builder.mutation<any,any>({
        query: (productId) => ({
          method:'DELETE',
          url: `delete/${productId}`,
         
        }),
      }),
      getMyFavorites: builder.query<any,any>({
        query: () => ({
          url: 'get/favorites',
        }),
        providesTags: result => ['Ad']
      }),
      postFavorites: builder.mutation<any,any>({
        query: (productId) => ({
          url: `add-to-favorites/${productId}`,
          method:'POST',
        }),
        invalidatesTags: ['Ad']
      }),
      deleteFavorites: builder.mutation<any,any>({
        query: (productId) => ({
          url: `delete-from-favorites/${productId}`,
          method:'DELETE',
        }),
        invalidatesTags: ['Ad']
      }),
      deActiveMyAd: builder.mutation<any,any>({
        query: (productId) => ({
          method:'PUT',
          url: `deactivate/${productId}`,
        }),
        invalidatesTags: ['Ad']
      }),
      activaMyAd: builder.mutation<any,any>({
        query: (productId) => ({
          method:'PUT',
          url: `activate/${productId}`,
        }),
        invalidatesTags: ['Ad']
      }),
      fetchByCategoryIdAds: builder.query({
        query: (categoryId) => ({
          url: `get/main-page-by-category/0/${categoryId}`,
        }),
        providesTags: result => ['Ad']
      }),
      addNewAdDto: builder.mutation<any,void>({
        query: (ad) => ({
          url: 'publish/details',
          method:'POST',
          accept: "*/*",
          body: ad
        }),
        invalidatesTags: ['Ad']
      }),
      
      addNewAdImage: builder.mutation<any,void>({
        query: (arg:any) => {
         const {formData,productId,imageOrderNumber} = arg
         return {
          url: `publish/image/${productId}/${imageOrderNumber}`,
          method:'POST',
          accept: "*/*",
          body: formData
        }
        },
        invalidatesTags: ['Ad']
      }),
     
    }),
  })
  
