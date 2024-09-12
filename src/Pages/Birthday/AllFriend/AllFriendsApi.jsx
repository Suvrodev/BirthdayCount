// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allFriendsApi = createApi({
  reducerPath: "allFriendsApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:7000/",
    baseUrl: "https://birthday-count-server-green.vercel.app/",
  }),
  endpoints: (builder) => ({
    getFriends: builder.query({
      query: (email) => {
        return `bds?email=${email}`;
      },
    }),
  }),
});

export const { useGetFriendsQuery } = allFriendsApi;
