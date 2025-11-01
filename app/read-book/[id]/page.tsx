'use client';

import BookIndexes from '@/components/ReadBook/BookIndexes';
import MainLayout from '@/components/layouts/MainLayout';
import { setContent } from '@/redux/features/chapter/chapterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/homeType';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { prisma } from '@/lib/prisma';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Create a client component wrapper
const ReadBookClient = ({ book }: { book: IBook }) => {
    const dispatch = useAppDispatch();
    const { contents } = useAppSelector((state) => state.chapter);

    useEffect(() => {
        if (!contents || !contents?.length) {
            if (book?.chapters?.length) {
                const first = (book.chapters as any)[0];
                const html = first?.content || first?.bookContents?.[0]?.content || '';
                if (html) dispatch(setContent(html));
            }
        }
    }, [book, contents, dispatch]);

    return (
        <MainLayout>
            <div className="grid grid-cols-12 lg:px-7">
                <div className="lg:col-span-3">{book.title}</div>
                {book?.pdf_file ? (
                    <div className="lg:col-span-12 max-h-[700px] w-full max-w-[950px] mx-auto overflow-y-auto shadow p-2 mb-4">
                        <object
                            data={`/${book?.pdf_file}`}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                            className="h-[700px]"
                        >
                            <p>Your browser doesn't support PDFs. 
                               <a href={`/${book?.pdf_file}`}>Download the PDF</a>
                            </p>
                        </object>
                    </div>
                ) : (
                    <>
                        <div className="lg:col-span-6 max-h-[700px] overflow-y-auto shadow p-2 mb-4">
                            <div
                                className="tinymce-content"
                                dangerouslySetInnerHTML={{ __html: contents }}
                            ></div>
                        </div>
                        <div className="lg:col-span-3 bg-blue-50 p-3">
                            <BookIndexes book={book} />
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
};

// Server component wrapper to fetch data
export default function ReadBook() {
    // This will be a client component for now since we need Redux
    // In a future optimization, we can split server/client properly
    const params = useParams();
    const [book, setBook] = useState<IBook | null>(null);

    useEffect(() => {
        // Fetch book data
        fetch(`/api/books/${params.id}`)
            .then(res => res.json())
            .then(data => setBook(data))
            .catch(err => console.error('Error fetching book:', err));
    }, [params.id]);

    if (!book) {
        return (
            <MainLayout>
                <div className="container py-12">
                    <p>Loading...</p>
                </div>
            </MainLayout>
        );
    }

    return <ReadBookClient book={book} />;
}

