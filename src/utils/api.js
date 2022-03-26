import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://61f8572d783c1d0017c446a1.mockapi.io/",
  }),
  reducerPath: "contactsApi",
  tagTypes: ["Contacts", "Users"],
  endpoints: (build) => ({
    getUserById: build.query({
      query: (userId) => `users/${userId}`,
      providesTags: ["Users"],
    }),
    getContacts: build.query({
      query: () => `users/`,
      providesTags: ["Contacts"],
    }),
    getUsers: build.query({
      query: () => `users/`,
      providesTags: ["Contacts"],
    }),
    getUserContacts: build.query({
      query: (userId) => `users/${userId}/contacts/`,
      providesTags: ["Contacts", "Users"],
    }),
    postContact: build.mutation({
      query: ([userId, contact]) => ({
        url: `users/${userId}/contacts/`,
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),
    postUser: build.mutation({
      query: (user) => ({
        url: `users/`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Contacts", "Users"],
    }),
    deleteContact: build.mutation({
      query: ([userId, id]) => ({
        url: `users/${userId}/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts", "Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserContactsQuery,
  useGetContactsQuery,
  usePostContactMutation,
  useDeleteContactMutation,
  usePostUserMutation,
} = api;
