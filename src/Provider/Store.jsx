import { configureStore } from "@reduxjs/toolkit";
import { allFriendsApi } from "../Pages/Birthday/AllFriend/AllFriendsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [allFriendsApi.reducerPath]: allFriendsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allFriendsApi.middleware),
});

// setupListeners(store.dispatch);
export default store;
