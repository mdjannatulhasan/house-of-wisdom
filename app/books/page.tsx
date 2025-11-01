'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import Hero from '@/components/all-books/Hero';
import BookList from '@/components/all-books/BookList';

function AllBooksContent() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      const searchTerm = searchParams.get('searchTerm') || '';
      const genre = searchParams.get('genre') || '';
      const year = searchParams.get('year') || '';
      
      try {
        const response = await fetch(`/api/books?searchTerm=${searchTerm}&genre=${genre}&year=${year}`);
        const data = await response.json();
        setBooks(data.books || []);
        setCount(data.count || 0);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [searchParams]);

  if (loading) {
    return <div className="container py-12">Loading...</div>;
  }

  return (
    <>
      <Hero />
      <BookList books={books} count={count} />
    </>
  );
}

export default function AllBooksPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="container py-12">Loading...</div>}>
        <AllBooksContent />
      </Suspense>
    </MainLayout>
  );
}
