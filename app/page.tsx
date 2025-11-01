import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getBooks() {
  try {
    const books = await prisma.book.findMany({
      take: 12,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Book Library
            </h1>
            <p className="text-xl mb-8">
              Discover, read, and share amazing books. Your digital library awaits.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/books"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Browse Books
              </Link>
              <Link
                href="/login"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition border border-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Books</h2>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
                >
                  <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Cover
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  {book.category && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {book.category.title}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No books available yet.</p>
              <Link
                href="/books/create"
                className="text-blue-600 hover:underline"
              >
                Be the first to add a book →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Books</h3>
              <p className="text-gray-600">
                Explore our extensive collection of books across various genres
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Read Online</h3>
              <p className="text-gray-600">
                Read books directly in your browser with our reader
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Discuss</h3>
              <p className="text-gray-600">
                Join the community and share your thoughts on books
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Book Library. All rights reserved.</p>
          <p className="mt-2 text-gray-400">
            Built with Next.js 15+ by{' '}
            <a
              href="https://smjhm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              Hasan
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
