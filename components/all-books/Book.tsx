'use client';

import { useWishlist } from '@/lib/hooks/useWishlist';
import { useAppSelector } from '@/redux/hook';
import { GiHearts } from 'react-icons/gi';
import Link from 'next/link';
import Image from 'next/image';

interface IBook {
    title: string;
    cover_image?: string;
    genre?: string;
    publication_date?: string | Date;
    author?: string;
    code?: string | number;
    status?: string;
}

const Book = ({
    title,
    cover_image,
    genre,
    publication_date,
    author,
    code = '#',
    status,
}: IBook) => {
    const { handleWishlist, heart, setHeart } = useWishlist(code);
    const { role } = useAppSelector((state) => state.user);

    return (
        <div className="shadow p-4 rounded-md relative">
            <div>
                {cover_image && cover_image != '#' && (
                    <Link href={`/books/${code}`}>
                        <img
                            src={cover_image}
                            alt={`${title} book cover`}
                            className="lg:max-w-sm w-full rounded-md"
                        />
                    </Link>
                )}
            </div>
            <div
                className={`absolute top-6 right-6 ${
                    heart ? 'text-[#cf0c09]' : 'text-white'
                } bg-[#ffd2d1] rounded-md p-1 hover:cursor-pointer`}
                onClick={() => {
                    setHeart(!heart);
                    handleWishlist();
                }}
            >
                <GiHearts />
            </div>
            <div className="mt-4 flex flex-col gap-2 items-start">
                <p className="text-[#F77F00]">{genre}</p>

                <Link href={`/books/${code}`}>
                    <h3 className="font-semibold text-lg -mt-1 leading-snug">
                        {title}
                    </h3>
                </Link>
                <p className="font-medium">
                    {new Date(publication_date as string).toLocaleString()}
                </p>
                <p className="font-medium">{author}</p>
                {role === 'admin' && (
                    <p className="font-medium">Status: {status}</p>
                )}
            </div>
        </div>
    );
};

export default Book;
