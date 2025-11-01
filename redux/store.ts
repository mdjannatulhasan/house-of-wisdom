import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './features/book/bookSlice';
import userReducer from './features/user/userSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import chapterReducer from './features/chapter/chapterSlice';
import categoryReducer from './features/category/categorySlice';
import { api } from './api/apiSlice';

const store = configureStore({
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
