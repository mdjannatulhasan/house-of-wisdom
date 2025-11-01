import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './features/book/bookSlice';
import userReducer from './features/user/userSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import chapterReducer from './features/chapter/chapterSlice';
import categoryReducer from './features/category/categorySlice';
import { api } from './api/apiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      book: bookReducer,
      user: userReducer,
      wishlist: wishlistReducer,
      chapter: chapterReducer,
      categories: categoryReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

