import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IComplaintPost {
  reason: string;
  userId: number;
}

export const complaintsApi = createApi({
  reducerPath: "complaintsApi",
  tagTypes: ["complaints"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessTocken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addComplaints: builder.mutation<string, IComplaintPost>({
      query: (option) => {
        return {
          method: "POST",
          url: `complaints/add`,
          body: option,
        };
      },
      invalidatesTags: ["complaints"],
    }),
  }),
});
