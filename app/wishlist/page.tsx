'use client';

import SecTitle from '@/components/common/SecTitle';
import CurrentlyReading from '@/components/wishlist/CurrentlyReading';
import FinishedReading from '@/components/wishlist/FinishedReading';
import FutureRead from '@/components/wishlist/FutureRead';
import Hero from '@/components/wishlist/Hero';
import MainLayout from '@/components/layouts/MainLayout';
import { useGetBooksQuery } from '@/redux/features/book/bookApi';
import { useGetWishlistsQuery } from '@/redux/features/wishlist/wishlistApi';
import {
    setReadinglist,
    setWishlist,
} from '@/redux/features/wishlist/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect } from 'react';
import { BiPlus } from 'react-icons/bi';
import Link from 'next/link';

const Wishlist = () => {
    const { data } = useGetWishlistsQuery(undefined);
    const { data: books } = useGetBooksQuery(undefined);
    const dispatch = useAppDispatch();
    const { wishlist } = useAppSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(setWishlist(data));
        dispatch(setReadinglist(data));
    }, [data, dispatch]);

    return (
        <MainLayout>
            <Hero />
            <section className="pb-8 pt-12">
                <div className="container max-w-[800px] mx-auto">
                    <div className="mb-6">
                        <SecTitle>My Wishlist</SecTitle>
                    </div>
                    <div className="mt-6">
                        <ul>
                            {wishlist?.length ? (
                                wishlist.map((item, index) => (
                                    <li key={index} className="text-xl my-2">
                                        {index + 1}. {item.title}
                                    </li>
                                ))
                            ) : (
                                <div>
                                    No book in the list.{' '}
                                    <Link
                                        href="/books"
                                        className="text-blue-600 flex items-center gap-2"
                                    >
                                        Add one
                                        <BiPlus />
                                    </Link>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </section>
            <FutureRead books={books} />
            <CurrentlyReading books={books} />
            <FinishedReading books={books} />
        </MainLayout>
    );
};

export default Wishlist;

