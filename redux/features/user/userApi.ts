// import { getCsrfToken } from '@/lib/csrftoken';
import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: ({ data }) => ({
                url: route('login'),
                method: 'POST',
                body: data,
            }),
        }),
        addUser: builder.mutation({
            query: ({ data }) => ({
                url: route('register'),
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginUserMutation, useAddUserMutation } = userApi;
