import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "../types/ICategory";



export interface ICategoryPost {
  categoryName: string;
  addFields: [];
}

export const category = createApi({
  reducerPath: "category",
  tagTypes: ["category"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}categories/`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessTocken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategoryById: builder.query<ICategory[], any>({
      query: () => ({
        url: `get/category-fields`,
      }),
      providesTags: (result) => ["category"],
    }),
    addNewCategory: builder.mutation<string, ICategoryPost>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation<string, number>({
      query: (categoryId) => ({
        url: `delete/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const { useGetCategoryByIdQuery } = category;
