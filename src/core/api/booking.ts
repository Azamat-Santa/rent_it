import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface IUserBookingRequest {
  bookingId: number;
  productId: number;
  clientId: number;
  clientName: string;
  profileRating: number;
  productTitle: string;
  mainImageUrl: string;
  bookDateFrom: string;
  bookDateTill: string;
  totalPrice: number;
}
export interface IUserBooking {
  bookingId: number;
  productId: number;
  productTitle: string;
  mainImageUrl: string;
  status: string;
  totalPrice: number;
  bookFrom: string;
  bookTill: string;
}
export interface IUserBookingPost {
  productId: string | undefined;
  dateFrom: string;
  dateTill: string;
}
export const bookingApi = createApi({
  reducerPath: "bookingApi",
  tagTypes: ["bookingApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}bookings/`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessTocken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBoookingAd: builder.query<any, any>({
      query: (option) => {
        const { productId, year, month } = option;
        return {
          url: `get/product-schedule/${productId}/${year}/${month}`,
        };
      },
      providesTags: (result) => ["bookingApi"],
    }),
    getBoookingConfirm: builder.query<IUserBookingRequest[], any>({
      query: () => {
        return {
          url: `get/requests`,
        };
      },
      providesTags: (result) => ["bookingApi"],
    }),
    getMyBoooking: builder.query<IUserBookingRequest[], any>({
      query: () => {
        return {
          url: `get/user-bookings`,
        };
      },
      providesTags: (result) => ["bookingApi"],
    }),
    postBoookingAd: builder.mutation<IUserBookingPost, IUserBookingPost>({
      query: (option) => ({
        url: "book-product",
        method: "POST",
        body: option,
      }),
      invalidatesTags: ["bookingApi"],
    }),
    putBoookingAccept: builder.mutation<string, number>({
      query: (bookingId) => ({
        url: `accept-booking-request/${bookingId}`,
        method: "PUT",
      }),
      invalidatesTags: ["bookingApi"],
    }),
  }),
});
