// import { getCsrfToken } from '@/lib/csrftoken';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', // Use Next.js environment variable
    prepareHeaders: (headers) => {
        return headers;
    },
});
export const api = createApi({
    reducerPath: 'api',
    // baseQuery: fetchBaseQuery({
    //     baseUrl: 'https://book-catalog-server-smoky.vercel.app/api/v1',
    // }),
    baseQuery: baseQuery,
    tagTypes: ['books', 'book', 'reviews', 'wishlist', 'my-books'],
    endpoints: () => ({}),
});
