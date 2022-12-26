import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IChat } from "../types/IChat";
import { IMessage } from "../types/IMessage";
import { IMessagePost } from "../types/IMessagePost";


export interface IAddChatRequest {
  sender_id: number | undefined;
  receiver_id: number | undefined;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["chatApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessTocken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    adChat: builder.mutation<IChat, IAddChatRequest >({
      query: (option) => {
        return {
          method: "POST",
          url: `api/v1/chats/add-chat`,
          body: option,
        };
      },
      invalidatesTags: ["chatApi"],
    }),
    sendMessage: builder.mutation<IMessage, IMessagePost>({
      query: (option) => {
        return {
          method: "POST",
          url: `api/v1/chat-messages/add-chat-message`,
          body: option,
        };
      },
      invalidatesTags: ["chatApi"],
    }),
    getChatId: builder.query<IChat, number>({
      query: (chatId) => {
        return {
          url: `api/v1/chats/${chatId}`,
        };
      },
      providesTags: (result) => ["chatApi"],
    }),
    getMessageId: builder.query<IMessage, number>({
      query: (chatId) => {
        return {
          url: `api/v1/chat-messages/${chatId}`,
        };
      },
      providesTags: (result) => ["chatApi"],
    }),
  }),
});
