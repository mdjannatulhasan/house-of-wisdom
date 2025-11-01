'use client';

import BookList from '@/components/my-books/BookList';
import Hero from '@/components/my-books/Hero';
import MainLayout from '@/components/layouts/MainLayout';
import { useGetWishlistsQuery } from '@/redux/features/wishlist/wishlistApi';
import { setWishlist } from '@/redux/features/wishlist/wishlistSlice';
import { useAppDispatch } from '@/redux/hook';
import { useEffect } from 'react';

const MyBooks = () => {
    const { data } = useGetWishlistsQuery(undefined);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setWishlist(data));
    }, [data, dispatch]);

    return (
        <MainLayout>
            <Hero />
            <BookList />
        </MainLayout>
    );
};

export default MyBooks;

