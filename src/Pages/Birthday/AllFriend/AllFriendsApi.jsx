// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allFriendsApi = createApi({
  reducerPath: "allFriendsApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3003/",
    // baseUrl: "https://birthday-count-server-green.vercel.app/",
    baseUrl: "https://birthdaycount-server-production.up.railway.app/",
  }),
  endpoints: (builder) => ({
    getFriends: builder.query({
      query: ({ email, searchText }) => {
        console.log("Email(RTK): ", email);
        console.log("Search text(RTK): ", searchText);
        return `bds?email=${email}&search=${searchText}`;
      },
    }),
  }),
});

export const { useGetFriendsQuery } = allFriendsApi;
