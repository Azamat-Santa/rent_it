import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../data/const'

export const category = createApi({
    reducerPath:'category',
    tagTypes: ['category'],
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BASE_URL}categories/`,
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
      getCategoryById: builder.query<any,any>({
        query: (categoryId) => ({
          url: `get/category-fields`,
        }),
        providesTags: result => ['category']
      }),
      addNewCategory: builder.mutation<any,any>({
        query: (body) => ({
          url: 'create',
          method:'POST',
          body: body
        }),
        invalidatesTags: ['category']
      }),
      deleteCategory: builder.mutation<any,any>({
        query: (categoryId) => ({
          url: `delete/${categoryId}`,
          method:'DELETE',
        }),
        invalidatesTags: ['category']
      }),

    
    
     
    }),
  })

export const { useGetCategoryByIdQuery } = category

  
