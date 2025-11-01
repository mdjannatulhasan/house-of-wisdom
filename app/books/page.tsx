import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getBooks() {
  try {
    const books = await prisma.book.findMany({
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

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Books</h1>
          <Link
            href="/dashboard/books/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Book
          </Link>
        </div>

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
              href="/dashboard/books/create"
              className="text-blue-600 hover:underline"
            >
              Be the first to add a book →
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

