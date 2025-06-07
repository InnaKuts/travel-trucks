import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./slices/campersSlice";
import filtersReducer from "./slices/filtersSlice";
import favoritesReducer from "./slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: import.meta.env.MODE !== "production",
});
