import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAdDatails } from "../types/IAdDatails";
export interface IAd {
  productId: number;
  title: string;
  price: number;
  rating: string;
  reviewNumber: number;
  clickNumber: number;
  mainImageUrl: string;
  active: boolean;
  favorite: boolean;
}

export interface IAdRequestDatails {
  productId: number;
  title: string;
  description: string;
  price: number;
  bookDateFrom: string;
  bookDateTill: string;
  locationX: number;
  locationY: number;
  city: string;
  categoryId: number;
  fieldValue: any
}

export const adApi = createApi({
  reducerPath: "adApi",
  tagTypes: ["Ad"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}products/`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessTocken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchRecommendations: builder.query<IAd[], void>({
      query: () => ({
        url: "get/recommendations",
      }),
    }),
    searchData: builder.query<IAd[], string>({
      query: (text) => ({
        url: `get/search/${text}`,
      }),
      providesTags: (result) => ["Ad"],
    }),
    fetchAllAds: builder.query<IAd[], number>({
      query: (number) => ({
        url: `get/main-page/${number}`,
      }),
      providesTags: (result) => ["Ad"],
    }),
    fetchOneAd: builder.query<IAdDatails, string | undefined>({
      query: (productId) => ({
        url: `get/details/${productId}`,
      }),
      providesTags: (result) => ["Ad"],
    }),
    fetchSimularAd: builder.query<IAd[], number>({
      query: (categoryId) => ({
        url: `get/similar-by-category/${categoryId}`,
      }),
      providesTags: (result) => ["Ad"],
    }),
    fetchMapId: builder.query<any, string | undefined>({
      query: (categoryId) => ({
        url: `get/map-products-by-category/${categoryId}`,
      }),
      providesTags: (result) => ["Ad"],
    }),
    fetchMyAds: builder.query<IAd[], void>({
      query: () => ({
        url: "get/user-products",
      }),
      providesTags: (result) => ["Ad"],
    }),
    deleteAd: builder.mutation<string, number>({
      query: (productId) => ({
        method: "DELETE",
        url: `delete/${productId}`,
      }),
    }),
    getMyFavorites: builder.query<IAd[], any>({
      query: () => ({
        url: "get/favorites",
      }),
      providesTags: (result) => ["Ad"],
    }),
    postFavorites: builder.mutation<string, number>({
      query: (productId) => ({
        url: `add-to-favorites/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["Ad"],
    }),
    deleteFavorites: builder.mutation<string, number>({
      query: (productId) => ({
        url: `delete-from-favorites/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ad"],
    }),
    deActiveMyAd: builder.mutation<string, number>({
      query: (productId) => ({
        method: "PUT",
        url: `deactivate/${productId}`,
      }),
      invalidatesTags: ["Ad"],
    }),
    activaMyAd: builder.mutation<string, number>({
      query: (productId) => ({
        method: "PUT",
        url: `activate/${productId}`,
      }),
      invalidatesTags: ["Ad"],
    }),
    fetchByCategoryIdAds: builder.query({
      query: (categoryId) => ({
        url: `get/main-page-by-category/0/${categoryId}`,
      }),
      providesTags: (result) => ["Ad"],
    }),
    addNewAdDto: builder.mutation<IAdRequestDatails, IAdRequestDatails>({
      query: (ad) => ({
        url: "publish/details",
        method: "POST",
        accept: "*/*",
        body: ad,
      }),
      invalidatesTags: ["Ad"],
    }),

    addNewAdImage: builder.mutation<any, any>({
      query: (arg: any) => {
        const { formData, productId, imageOrderNumber } = arg;
        return {
          url: `publish/image/${productId}/${imageOrderNumber}`,
          method: "POST",
          accept: "*/*",
          body: formData,
        };
      },
      invalidatesTags: ["Ad"],
    }),
  }),
});
