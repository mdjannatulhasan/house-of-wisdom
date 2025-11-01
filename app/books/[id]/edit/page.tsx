'use client';

import BookForm from '@/components/edit-book/BookForm';
import Hero from '@/components/edit-book/Hero';
import MainLayout from '@/components/layouts/MainLayout';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditBook = () => {
    const params = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        // Fetch book data
        fetch(`/api/books/${params.id}`)
            .then(res => res.json())
            .then(data => setBook(data))
            .catch(err => console.error('Error fetching book:', err));
    }, [params.id]);

    return (
        <MainLayout>
            <Hero />
            {book && <BookForm book={book} />}
        </MainLayout>
    );
};

export default EditBook;

